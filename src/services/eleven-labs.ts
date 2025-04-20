import fetch from 'node-fetch';

export type VoiceStyle = 'sarcastic guy' | 'rude grandma' | 'British villain';

const voiceIdMap: Record<VoiceStyle, string> = {
  'sarcastic guy': 'FZC2l6qA7BWbzoY1zhl4',
  'rude grandma': 'fJaRSfOmFxJrD50BzGrg',
  'British villain': 'Rhzjb4PRr6OmMtZUARyN',
};

export async function generateVoiceRoast(text: string, voiceStyle: VoiceStyle): Promise<Buffer> {
  const apiKey = process.env.YOUR_ELEVEN_LABS_API_KEY;
  if (!apiKey) throw new Error('ElevenLabs API key is missing.');

  const voiceId = voiceIdMap[voiceStyle];
  if (!voiceId || voiceId.startsWith('PLACEHOLDER_')) {
    throw new Error(`Voice ID for '${voiceStyle}' is not configured.`);
  }

  const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`ElevenLabs API error ${response.status}: ${errorBody}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(`Error generating roast voice:`, error);
    throw error;
  }
}
