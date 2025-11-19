// Proactive Missing Umbrella Alert Flow
'use server';

/**
 * @fileOverview This file defines a Genkit flow that proactively suggests sending a missing umbrella alert to the user.
 *
 * The flow analyzes weather forecasts, location data, and user behavior to determine when to proactively suggest sending an umbrella missing alert to the user.
 *
 * @interface ProactiveMissingAlertInput - Defines the input schema for the proactiveMissingAlert flow.
 * @interface ProactiveMissingAlertOutput - Defines the output schema for the proactiveMissingAlert flow.
 * @function proactiveMissingAlert - The main function that initiates the proactive missing alert flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveMissingAlertInputSchema = z.object({
  weatherForecast: z.string().describe('The 7-day weather forecast data.'),
  umbrellaLocation: z.string().describe('The last known location of the umbrella.'),
  userBehavior: z.string().describe('The user behavior data related to umbrella usage.'),
});

export type ProactiveMissingAlertInput = z.infer<typeof ProactiveMissingAlertInputSchema>;

const ProactiveMissingAlertOutputSchema = z.object({
  shouldSendAlert: z.boolean().describe('A boolean indicating whether an alert should be sent to the user.'),
  reason: z.string().describe('The reason why the alert should be sent.'),
});

export type ProactiveMissingAlertOutput = z.infer<typeof ProactiveMissingAlertOutputSchema>;

export async function proactiveMissingAlert(input: ProactiveMissingAlertInput): Promise<ProactiveMissingAlertOutput> {
  return proactiveMissingAlertFlow(input);
}

const proactiveMissingAlertPrompt = ai.definePrompt({
  name: 'proactiveMissingAlertPrompt',
  input: {schema: ProactiveMissingAlertInputSchema},
  output: {schema: ProactiveMissingAlertOutputSchema},
  prompt: `You are an AI assistant designed to determine if a user may have lost their umbrella and should be prompted to send a missing umbrella alert.

  Analyze the following data to determine if the user should be prompted to send an alert:

  Weather Forecast: {{{weatherForecast}}}
  Umbrella Last Known Location: {{{umbrellaLocation}}}
  User Behavior: {{{userBehavior}}}

  Consider factors such as:
  - Is rain or inclement weather forecasted in the user's current location or usual travel areas?
  - Is the umbrella's last known location far from the user's current location or usual travel areas?
  - Does the user's past behavior indicate they typically use the umbrella in similar weather conditions?

  Based on your analysis, determine whether the user should be prompted to send a missing umbrella alert. If there is a reasonable chance the umbrella is missing, set shouldSendAlert to true, and provide a brief reason. Otherwise, set shouldSendAlert to false.

  Respond in JSON format.`,
});

const proactiveMissingAlertFlow = ai.defineFlow(
  {
    name: 'proactiveMissingAlertFlow',
    inputSchema: ProactiveMissingAlertInputSchema,
    outputSchema: ProactiveMissingAlertOutputSchema,
  },
  async input => {
    const {output} = await proactiveMissingAlertPrompt(input);
    return output!;
  }
);
