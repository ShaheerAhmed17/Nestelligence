// automated-lead-nurturing.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for automated lead nurturing using AI-driven insights.
 *
 * The flow takes lead information and generates personalized email and text messages for follow-up.
 * It exports the `automatedLeadNurturing` function, the `AutomatedLeadNurturingInput` type, and the `AutomatedLeadNurturingOutput` type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const AutomatedLeadNurturingInputSchema = z.object({
  leadName: z.string().describe('The name of the lead.'),
  leadEmail: z.string().email().describe('The email address of the lead.'),
  leadPhone: z.string().describe('The phone number of the lead.'),
  propertyOfInterest: z
    .string()
    .describe('The property the lead is interested in.'),
  lastInteraction: z
    .string()
    .describe('Details about the last interaction with the lead.'),
});
export type AutomatedLeadNurturingInput = z.infer<typeof AutomatedLeadNurturingInputSchema>;

// Define the output schema
const AutomatedLeadNurturingOutputSchema = z.object({
  emailMessage: z.string().describe('The personalized email message to send.'),
  textMessage: z.string().describe('The personalized text message to send.'),
});
export type AutomatedLeadNurturingOutput = z.infer<typeof AutomatedLeadNurturingOutputSchema>;

// Define the main function
export async function automatedLeadNurturing(
  input: AutomatedLeadNurturingInput
): Promise<AutomatedLeadNurturingOutput> {
  return automatedLeadNurturingFlow(input);
}

// Define the prompt
const automatedLeadNurturingPrompt = ai.definePrompt({
  name: 'automatedLeadNurturingPrompt',
  input: {schema: AutomatedLeadNurturingInputSchema},
  output: {schema: AutomatedLeadNurturingOutputSchema},
  prompt: `You are an AI assistant specialized in crafting personalized follow-up messages for real estate leads.

  Based on the lead's information and their last interaction, create a personalized email and text message to nurture the lead.

  Lead Name: {{{leadName}}}
  Lead Email: {{{leadEmail}}}
  Lead Phone: {{{leadPhone}}}
  Property of Interest: {{{propertyOfInterest}}}
  Last Interaction: {{{lastInteraction}}}

  Email Message:
  Text Message: `,
});

// Define the flow
const automatedLeadNurturingFlow = ai.defineFlow(
  {
    name: 'automatedLeadNurturingFlow',
    inputSchema: AutomatedLeadNurturingInputSchema,
    outputSchema: AutomatedLeadNurturingOutputSchema,
  },
  async input => {
    const {output} = await automatedLeadNurturingPrompt(input);
    return output!;
  }
);
