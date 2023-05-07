import { PermissionFlagsBits } from 'discord.js';
import { CommandOption, CommandSettings } from '~/types/command';

const askOptions: Record<string, CommandOption> = {
  prompt: {
    name: 'prompt',
    description: 'The prompt or question you want to ask Eustache.',
    required: true,
  },
};

export const askSettings: CommandSettings = {
  name: 'ask',
  description: 'Ask anything to Eustache and he will answer. You can then discuss with him in thread.',
  defaultMemberPermission: PermissionFlagsBits.Administrator,
  options: askOptions,
  isDmCommand: false,
  errorContext: 'askSlashCommand',
};
