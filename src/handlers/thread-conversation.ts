import { Message } from 'discord.js';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { prisma } from '~/container';
import { updateConversation } from '~/repositories/conversation';
import { chatCompletion } from './chat-completion';

export const handleThreadConversation = async (message: Message): Promise<void> => {
  const messages = await prisma.message.findMany({ where: { Conversation: { threadId: message.channelId } } });
  const channel = message.channel;
  const history: ChatCompletionRequestMessage[] = messages.map((message) => {
    return {
      role: message.role as ChatCompletionRequestMessageRoleEnum,
      content: message.content,
    };
  });
  const prompt = message.content;

  const response = await chatCompletion(prompt, history);
  await channel.send(response);

  updateConversation(channel.id, prompt, response);
};
