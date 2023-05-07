import { Events, Message, ThreadChannel } from 'discord.js';
import { client, prisma } from '~/container';
import { handleThreadConversation } from '~/handlers/thread-conversation';
import { deleteConversation } from '~/repositories/conversation';
import { Event } from '~/types/event';

export const messageCreate: Event = {
  name: Events.MessageCreate,
  once: false,
  execute: async (message: Message): Promise<void> => {
    const threadIds = await prisma.conversation.findMany().then((conversations) => {
      return conversations.map((conversation) => {
        return conversation.threadId;
      });
    });
    if (threadIds.some((threadId) => message.channelId === threadId) && message.author !== client.user) {
      const channel = message.channel as ThreadChannel;
      if (message.content === 'end') {
        channel.delete('end');
        deleteConversation(channel.id);
        return;
      }
      handleThreadConversation(message);
    }
  },
};
