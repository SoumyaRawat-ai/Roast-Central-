'use server';
/**
 * @fileOverview Generates a voice roast from a text roast in a selected style.
 *
 * - generateVoiceRoastFlow - A function that generates the voice roast.
 * - GenerateVoiceRoastInput - The input type for the generateVoiceRoastFlow function.
 * - GenerateVoiceRoastOutput - The return type for the generateVoiceRoastFlow function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {generateVoiceRoast, VoiceStyle} from '@/services/eleven-labs';

const GenerateVoiceRoastInputSchema = z.object({
  text: z.string().describe('The text of the roast.'),
  voiceStyle: z.enum(['sarcastic guy', 'rude grandma', 'British villain']).describe('The style of voice to use.'),
});
export type GenerateVoiceRoastInput = z.infer<typeof GenerateVoiceRoastInputSchema>;

const GenerateVoiceRoastOutputSchema = z.object({
  audio: z.string().describe('The base64 encoded audio data of the voice roast.'),
});
export type GenerateVoiceRoastOutput = z.infer<typeof GenerateVoiceRoastOutputSchema>;

export async function generateVoiceRoastWrapper(
  input: GenerateVoiceRoastInput
): Promise<GenerateVoiceRoastOutput> {
  return generateVoiceRoastFlow(input);
}

const generateVoiceRoastFlow = ai.defineFlow<
  typeof GenerateVoiceRoastInputSchema,
  typeof GenerateVoiceRoastOutputSchema
>(
  {
    name: 'generateVoiceRoastFlow',
    inputSchema: GenerateVoiceRoastInputSchema,
    outputSchema: GenerateVoiceRoastOutputSchema,
  },
  async input => {
    const audioBuffer = await generateVoiceRoast(input.text, input.voiceStyle);
    const audioBase64 = audioBuffer.toString('base64');
    return {audio: audioBase64};
  }
);
