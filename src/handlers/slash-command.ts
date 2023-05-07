import { ChatInputCommandInteraction } from 'discord.js';
import * as commands from '~/commands';
import { errorHelper } from '~/helpers/error-helper';

export const handleSlashCommand = async (interaction: ChatInputCommandInteraction): Promise<void> => {
  try {
    const command = Object.entries(commands)
      .map((command) => command[1])
      .find((command) => command.data.name === interaction.commandName);

    if (!command) {
      interaction.followUp({ content: 'Command not found' });
      throw new Error('Command not found');
    }
    await command.run(interaction);
  } catch (err) {
    errorHelper(`${interaction.commandName}Command`, err);
  }
};
