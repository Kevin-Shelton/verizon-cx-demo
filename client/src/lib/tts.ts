/**
 * Mock Text-to-Speech adapter for offline demos
 * In production, this would connect to Verbum TTS API
 */

export interface TTSOptions {
  text: string;
  language: string;
  dialect?: string;
  voice?: "male" | "female";
}

/**
 * Generate speech from text (mock implementation)
 * Returns a mock audio URL
 */
export async function textToSpeech(options: TTSOptions): Promise<string> {
  const { text, language, dialect } = options;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real implementation, this would call the TTS API
  // For now, return a placeholder
  console.log(`[TTS Mock] Generating speech for: "${text}" in ${dialect || language}`);

  // Return a data URL or mock audio file path
  return `/fixtures/ivr/sample-${language}.mp3`;
}

/**
 * Get available voices for a language
 */
export async function getVoices(language: string): Promise<Array<{
  id: string;
  name: string;
  gender: "male" | "female";
  dialect: string;
}>> {
  // Mock voice list
  const voices = {
    es: [
      { id: "es-MX-male-1", name: "Carlos", gender: "male" as const, dialect: "es-MX" },
      { id: "es-MX-female-1", name: "María", gender: "female" as const, dialect: "es-MX" },
      { id: "es-PR-female-1", name: "Carmen", gender: "female" as const, dialect: "es-PR" },
      { id: "es-CO-female-1", name: "Lucía", gender: "female" as const, dialect: "es-CO" },
      { id: "es-US-male-1", name: "Diego", gender: "male" as const, dialect: "es-US" },
    ],
    en: [
      { id: "en-US-male-1", name: "John", gender: "male" as const, dialect: "en-US" },
      { id: "en-US-female-1", name: "Sarah", gender: "female" as const, dialect: "en-US" },
    ],
  };

  return voices[language as keyof typeof voices] || [];
}

/**
 * Play audio using Howler.js
 */
export function playAudio(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // This would use Howler.js in actual implementation
    console.log(`[Audio] Playing: ${url}`);
    
    // Simulate playback
    setTimeout(() => {
      console.log(`[Audio] Finished playing: ${url}`);
      resolve();
    }, 2000);
  });
}

