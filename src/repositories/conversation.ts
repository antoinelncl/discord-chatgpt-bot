import { prisma } from '~/container';

export const createConversation = async (
  authorId: string,
  threadId: string,
  prompt: string,
  response: string,
): Promise<void> => {
  await prisma.conversation.create({
    data: {
      authorId: authorId,
      threadId: threadId,
      messages: {
        create: [
          {
            content: prompt,
            role: 'user',
          },
          {
            content: response,
            role: 'assistant',
          },
        ],
      },
    },
  });
};

export const updateConversation = async (threadId: string, prompt: string, response: string): Promise<void> => {
  await prisma.conversation.update({
    where: { threadId: threadId },
    data: {
      messages: {
        create: [
          {
            content: prompt,
            role: 'user',
          },
          {
            content: response,
            role: 'assistant',
          },
        ],
      },
    },
  });
};

export const deleteConversation = async (threadId: string): Promise<void> => {
  await prisma.conversation.deleteMany({
    where: { threadId: threadId },
  });
};
