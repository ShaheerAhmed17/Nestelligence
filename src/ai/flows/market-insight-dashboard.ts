'use server';

/**
 * @fileOverview AI-powered market insights dashboard flow.
 *
 * - generateMarketInsight - A function that generates market insights based on user query.
 * - MarketInsightInput - The input type for the generateMarketInsight function.
 * - MarketInsightOutput - The return type for the generateMarketInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketInsightInputSchema = z.object({
  query: z.string().describe('The query to generate market insights for.'),
});
export type MarketInsightInput = z.infer<typeof MarketInsightInputSchema>;

const MarketInsightOutputSchema = z.object({
  insights: z.string().describe('The generated market insights.'),
});
export type MarketInsightOutput = z.infer<typeof MarketInsightOutputSchema>;

export async function generateMarketInsight(input: MarketInsightInput): Promise<MarketInsightOutput> {
  return marketInsightDashboardFlow(input);
}

const marketInsightDashboardPrompt = ai.definePrompt({
  name: 'marketInsightDashboardPrompt',
  input: {schema: MarketInsightInputSchema},
  output: {schema: MarketInsightOutputSchema},
  prompt: `You are an AI assistant designed to provide real estate market insights.
  Generate real-time property trends and forecasts based on the following query to assist in making informed decisions.

  Query: {{{query}}}
  Insights:`, // Keep the 'Insights:' to let the LLM fill in
});

const marketInsightDashboardFlow = ai.defineFlow(
  {
    name: 'marketInsightDashboardFlow',
    inputSchema: MarketInsightInputSchema,
    outputSchema: MarketInsightOutputSchema,
  },
  async input => {
    const {output} = await marketInsightDashboardPrompt(input);
    return output!;
  }
);
