import { SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption, TextChannel } from 'discord.js';
import { askSettings as settings } from '~/config/command-settings/ask-settings';
import { chatCompletion } from '~/handlers/chat-completion';
import { errorHelper } from '~/helpers/error-helper';
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
  run: async function (interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const channel = interaction.channel as TextChannel;
    interaction.deferReply();
    try {
      const prompt = interaction.options.getString('prompt');
      if (prompt) {
        if (interaction.options.getBoolean('thread')) {
          const thread = await channel?.threads.create({
            name: prompt,
          });
          await thread.send(`${await chatCompletion(prompt)}`);
          await interaction.editReply('Thread created');
        } else {
          interaction.editReply(`${await chatCompletion(prompt)}`);
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
