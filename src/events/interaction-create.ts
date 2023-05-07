import { Events, Interaction } from 'discord.js';
import { handleSlashCommand } from '~/handlers/slash-command';
import { Event } from '~/types/event';

export const interactionCreate: Event = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction: Interaction): Promise<void> => {
    if (interaction.isChatInputCommand()) {
      await handleSlashCommand(interaction);
    }
  },
};
