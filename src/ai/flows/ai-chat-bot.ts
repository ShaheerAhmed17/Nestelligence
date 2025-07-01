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
import { getPropertyDataForCity } from '../tools/getPropertyData';

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
  tools: [getPropertyDataForCity],
  prompt: `You are a real estate chatbot assistant named NestBot.
  
  Your capabilities are:
  1. Answering questions about a specific property. Use the provided "Property Information" for this.
  2. Comparing real estate markets between different cities. If a user asks to compare markets (e.g., "compare LA and NYC"), use the 'getPropertyDataForCity' tool to fetch data and provide a summary. You must infer the state abbreviation for each city (e.g., LA is Los Angeles, CA; NYC is New York, NY).
  3. When comparing markets, you can also suggest the user visit the dedicated comparison page by providing this markdown link: [Launch Comparison Tool](/market-analysis).

  Use the following information about the property to answer the customer inquiry.
  
  Property Information: {{{propertyInfo}}}
  
  Customer Inquiry: {{{customerInquiry}}}
  
  Response: `,
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
