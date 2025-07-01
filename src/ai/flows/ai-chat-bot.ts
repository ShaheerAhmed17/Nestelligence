// src/ai/flows/ai-chat-bot.ts
'use server';

/**
 * @fileOverview An AI chatbot for handling property listing inquiries.
 *
 * - aiChatBot - A function that processes customer inquiries about property listings.
 * - AiChatBotInput - The input type for the aiChatBot function.
 * - AiChatBotOutput - The return type for the aiChatBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiChatBotInputSchema = z.object({
  propertyInfo: z.string().describe('Information about the property listing.'),
  customerInquiry: z.string().describe('The customer inquiry about the property.'),
});
export type AiChatBotInput = z.infer<typeof AiChatBotInputSchema>;

const AiChatBotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the customer inquiry.'),
});
export type AiChatBotOutput = z.infer<typeof AiChatBotOutputSchema>;

export async function aiChatBot(input: AiChatBotInput): Promise<AiChatBotOutput> {
  return aiChatBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatBotPrompt',
  input: {schema: AiChatBotInputSchema},
  output: {schema: AiChatBotOutputSchema},
  prompt: `You are a real estate chatbot assistant. Use the following information about the property to answer the customer inquiry.\n\nProperty Information: {{{propertyInfo}}}\n\nCustomer Inquiry: {{{customerInquiry}}}\n\nResponse: `,
});

const aiChatBotFlow = ai.defineFlow(
  {
    name: 'aiChatBotFlow',
    inputSchema: AiChatBotInputSchema,
    outputSchema: AiChatBotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
