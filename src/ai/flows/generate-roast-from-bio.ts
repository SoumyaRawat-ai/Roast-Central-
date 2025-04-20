'use server';
/**
 * @fileOverview Generates a roast based on a user-provided bio.
 *
 * - generateRoastFromBio - A function that generates a roast from a bio.
 * - GenerateRoastFromBioInput - The input type for the generateRoastFromBio function.
 * - GenerateRoastFromBioOutput - The return type for the generateRoastFromBio function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateRoastFromBioInputSchema = z.object({
  bio: z.string().describe('The bio of the user to roast.'),
});
export type GenerateRoastFromBioInput = z.infer<typeof GenerateRoastFromBioInputSchema>;

const GenerateRoastFromBioOutputSchema = z.object({
  roast: z.string().describe('The generated roast based on the bio.'),
});
export type GenerateRoastFromBioOutput = z.infer<typeof GenerateRoastFromBioOutputSchema>;

export async function generateRoastFromBio(input: GenerateRoastFromBioInput): Promise<GenerateRoastFromBioOutput> {
  return generateRoastFromBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRoastFromBioPrompt',
  input: {
    schema: z.object({
      bio: z.string().describe('The bio of the user to roast.'),
    }),
  },
  output: {
    schema: z.object({
      roast: z.string().describe('The generated roast based on the bio.'),
    }),
  },
  prompt: `You are a funny and edgy, but never cruel, AI roast generator.

  Generate a roast based on the following bio:

  {{bio}}`,
});

const generateRoastFromBioFlow = ai.defineFlow<
  typeof GenerateRoastFromBioInputSchema,
  typeof GenerateRoastFromBioOutputSchema
>(
  {
    name: 'generateRoastFromBioFlow',
    inputSchema: GenerateRoastFromBioInputSchema,
    outputSchema: GenerateRoastFromBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
