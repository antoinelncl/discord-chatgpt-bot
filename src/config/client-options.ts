import { BitFieldResolvable, ClientOptions, GatewayIntentBits, GatewayIntentsString } from 'discord.js';

const intentOptions: BitFieldResolvable<GatewayIntentsString, number> = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
];

export const clientOptions: ClientOptions = { intents: intentOptions };
