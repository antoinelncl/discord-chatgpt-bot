import { PrismaClient } from '@prisma/client';
import { Client, REST } from 'discord.js';
import { Configuration, OpenAIApi } from 'openai';
import * as commands from '~/commands';
import { clientOptions } from '~/config/client-options';
import { EnvVarHelper } from '~/helpers/env-helper';
import { CommandsHelper } from './helpers/commands-helper';

// common
export const env = new EnvVarHelper(
  process.env.SENTRY_DSN,
  process.env.DISCORD_TOKEN,
  process.env.DISCORD_APPLICATION_ID,
  process.env.OPENAI_API_KEY,
);

// discord.js
export const rest = new REST({ version: '10' }).setToken(env.discordToken);
export const client = new Client(clientOptions);

// openai
const configuration = new Configuration({
  apiKey: env.openAiToken,
});
export const openai = new OpenAIApi(configuration);

// data
const prisma = new PrismaClient();
export const threads = prisma.conversation.findMany().then((conversations) => {
  return conversations.map((conversation) => {
    return conversation.threadId;
  });
});

// commands
const commandsArray = Object.entries(commands).map((command) => command[1]);
export const commandsHelper = new CommandsHelper(commandsArray);
