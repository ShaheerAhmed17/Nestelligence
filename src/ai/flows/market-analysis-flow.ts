'use server';
/**
 * @fileOverview An AI agent for comparing real estate markets.
 *
 * - compareMarkets - A function that handles market comparison inquiries.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getPropertyDataForCity } from '../tools/getPropertyData';

// The input for the main flow will be the user's natural language query
const MarketAnalysisInputSchema = z.object({
  query: z.string().describe("The user's query about real estate market comparison."),
});
export type MarketAnalysisInput = z.infer<typeof MarketAnalysisInputSchema>;


// The output will be a natural language summary
const MarketAnalysisOutputSchema = z.object({
  summary: z.string().describe('A summary of the market comparison based on the user query.'),
});
export type MarketAnalysisOutput = z.infer<typeof MarketAnalysisOutputSchema>;


// Define the prompt that uses the tool
const marketAnalysisPrompt = ai.definePrompt({
    name: 'marketAnalysisPrompt',
    input: { schema: MarketAnalysisInputSchema },
    output: { schema: MarketAnalysisOutputSchema },
    tools: [getPropertyDataForCity],
    prompt: `You are a real estate market analyst. Your goal is to answer user questions comparing different real estate markets.
    
    Use the 'getPropertyDataForCity' tool to fetch data for the cities mentioned in the user's query. You can call the tool multiple times for different cities.
    
    Once you have the data, provide a concise, helpful summary that directly answers the user's question. Compare the key metrics like average price and property count.
    
    Also, if the user seems interested in visual charts, you can point them to the Market Analysis page by providing this markdown link: [Launch Comparison Tool](/market-analysis).

    User Query: {{{query}}}
    `,
});

// Define the flow
const marketAnalysisFlow = ai.defineFlow(
  {
    name: 'marketAnalysisFlow',
    inputSchema: MarketAnalysisInputSchema,
    outputSchema: MarketAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await marketAnalysisPrompt(input);
    return output!;
  }
);

// Export a wrapper function
export async function compareMarkets(input: MarketAnalysisInput): Promise<MarketAnalysisOutput> {
  return marketAnalysisFlow(input);
}
