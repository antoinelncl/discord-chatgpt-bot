import { ChatCompletionRequestMessage } from 'openai';
import { openai } from '~/container';
import { errorHelper } from '~/helpers/error-helper';

export const chatCompletion = async (
  prompt: string,
  history: Array<ChatCompletionRequestMessage> = [],
): Promise<string> => {
  const messages: Array<ChatCompletionRequestMessage> = history;
  const latestMessage: ChatCompletionRequestMessage = { role: 'user', content: prompt };
  messages.push(latestMessage);

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    if (!completion.data.choices[0].message) {
      throw new Error('No response from OpenAI.');
    }

    const completionText: ChatCompletionRequestMessage = {
      role: 'assistant',
      content: completion.data.choices[0].message.content,
    };

    history.push(latestMessage, completionText);
    return completionText.content;
  } catch (error) {
    errorHelper('chatCompletion', error);
  }

  return 'Something went wrong.';
};
