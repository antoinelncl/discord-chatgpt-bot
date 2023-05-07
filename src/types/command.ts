import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  run: (interaction: CommandInteraction<CacheType>) => Promise<void>;
}

export interface CommandSettings {
  name: string;
  description: string;
  options?: Record<string, CommandOption>;
  subCommands?: Record<string, SubCommand>;
  isDmCommand: boolean;
  defaultMemberPermission?: bigint;
  errorContext: string;
}

export type CommandOption = {
  name: string;
  description: string;
  required: boolean;
};

export type SubCommand = {
  name: string;
  description: string;
  options?: Record<string, CommandOption>;
};
