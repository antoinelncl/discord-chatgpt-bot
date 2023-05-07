import { SlashCommandBuilder, SlashCommandStringOption, TextChannel } from 'discord.js';
import { chatCompletion } from '~/handlers/chat-completion';
import { Command } from '~/types/command';

export const factCheck: Command = {
  data: new SlashCommandBuilder()
    .setName('fact-check')
    .setDescription('Fact check a specific message')
    .addStringOption(
      new SlashCommandStringOption()
        .setName('message-id')
        .setDescription('Id of the message you want to fact check')
        .setRequired(true),
    )
    .setDMPermission(false),
  run: async (interaction): Promise<void> => {
    if (!interaction.isChatInputCommand()) return;

    interaction.deferReply();

    const messageId = interaction.options.getString('message-id');
    const channel = interaction.channel as TextChannel;

    const message = await channel.messages.fetch(messageId ? messageId : '');
    const prompt = `Le fait relaté dans le message suivant est-il vrai ? ${message.content}`;

    const response = await chatCompletion(prompt);

    interaction.editReply(`${response}`);
  },
};
