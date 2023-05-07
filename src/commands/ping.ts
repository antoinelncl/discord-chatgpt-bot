import { SlashCommandBuilder } from 'discord.js';
import { helloSettings as settings } from '~/config/command-settings';
import { errorHelper } from '~/helpers/error-helper';
import { Command } from '~/types/command';

export const ping: Command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('get eustache current ping').setDMPermission(true),
  run: async (interaction): Promise<void> => {
    if (!interaction.isChatInputCommand()) return;
    try {
      const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
      interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    } catch (err) {
      errorHelper(settings.errorContext, err);
    }
  },
};
