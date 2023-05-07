import { SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption, TextChannel } from 'discord.js';
import { askSettings as settings } from '~/config/command-settings/ask-settings';
import { chatCompletion } from '~/handlers/chat-completion';
import { errorHelper } from '~/helpers/error-helper';
import { createConversation } from '~/repositories/conversation';
import { Command } from '~/types/command';

export const ask: Command = {
  data: new SlashCommandBuilder()
    .setName(settings.name)
    .setDescription(settings.description)
    .addStringOption(
      new SlashCommandStringOption()
        .setName(settings.options ? settings.options.prompt.name : '')
        .setDescription(settings.options ? settings.options.prompt.description : '')
        .setRequired(settings.options ? settings.options.prompt.required : true),
    )
    .addBooleanOption(
      new SlashCommandBooleanOption()
        .setName('thread')
        .setDescription('should open a thread discussion')
        .setRequired(false),
    )
    .setDMPermission(settings.isDmCommand),
  run: async (interaction): Promise<void> => {
    if (!interaction.isChatInputCommand()) return;

    const channel = interaction.channel as TextChannel;
    const authorId = interaction.member ? interaction.member.user.id : '';

    interaction.deferReply();

    try {
      const prompt = interaction.options.getString('prompt');

      if (prompt) {
        const response = await chatCompletion(prompt);
        if (interaction.options.getBoolean('thread')) {
          const thread = await channel?.threads.create({
            name: prompt,
          });

          await thread.send(`${response}`);
          await interaction.editReply('Thread created');

          createConversation(authorId, thread.id, prompt, response);
        } else {
          interaction.editReply(`${response}`);
        }
      } else {
        await interaction.editReply("Couldn't find prompt");
        throw Error(`Couldn't find prompt or channel: ${prompt} ${channel}`);
      }
    } catch (err) {
      errorHelper(settings.errorContext, err);
    }
  },
};
