/**
 * Mock translation adapter for offline demos
 * In production, this would connect to Verbum API
 */

export interface TranslateOptions {
  text: string;
  from: string;
  to: string;
  dialect?: string;
}

// Mock translations for common phrases
const mockTranslations: Record<string, Record<string, string>> = {
  "es-MX": {
    "Hello, how can I help you?": "Hola, ¿cómo puedo ayudarte?",
    "I need to port my number": "Necesito portar mi número",
    "What are your business hours?": "¿Cuál es su horario de atención?",
    "Thank you for your help": "Gracias por su ayuda",
    "I have a question about my bill": "Tengo una pregunta sobre mi factura",
    "Can you help me with device setup?": "¿Puede ayudarme con la configuración del dispositivo?",
  },
  "es-PR": {
    "Hello, how can I help you?": "Hola, ¿cómo te puedo ayudar?",
    "I need a device swap": "Necesito cambiar mi equipo",
    "Am I eligible for the promotion?": "¿Soy elegible para la promoción?",
    "Thank you for your help": "Gracias por tu ayuda",
  },
  "es-CO": {
    "Hello, how can I help you?": "Hola, ¿en qué le puedo ayudar?",
    "I have a fraud alert": "Tengo una alerta de fraude",
    "I need to open a support case": "Necesito abrir un caso de soporte",
    "Thank you for your help": "Muchas gracias por su ayuda",
  },
  "es-US": {
    "Hello, how can I help you?": "Hola, ¿cómo le puedo ayudar?",
    "I need bulk device provisioning": "Necesito aprovisionamiento de dispositivos en masa",
    "How do I manage my fleet?": "¿Cómo administro mi flota?",
    "Thank you for your help": "Gracias por su ayuda",
  },
};

/**
 * Simulate translation with deterministic results
 */
export async function translate(options: TranslateOptions): Promise<string> {
  const { text, from, to, dialect } = options;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // If translating to English, reverse lookup
  if (to === "en" && from.startsWith("es")) {
    const dialectTranslations = mockTranslations[dialect || from] || {};
    const entry = Object.entries(dialectTranslations).find(
      ([_, spanish]) => spanish === text
    );
    if (entry) return entry[0];
  }

  // If translating to Spanish
  if (to.startsWith("es") && from === "en") {
    const dialectTranslations = mockTranslations[dialect || to] || {};
    return dialectTranslations[text] || `[${dialect || to}] ${text}`;
  }

  // Fallback
  return `[Translated: ${to}] ${text}`;
}

/**
 * Detect language of text
 */
export async function detectLanguage(text: string): Promise<string> {
  // Simple heuristic for demo
  const spanishPatterns = /¿|¡|ñ|á|é|í|ó|ú/i;
  return spanishPatterns.test(text) ? "es" : "en";
}

/**
 * Batch translate multiple texts
 */
export async function translateBatch(
  texts: string[],
  from: string,
  to: string,
  dialect?: string
): Promise<string[]> {
  return Promise.all(
    texts.map((text) => translate({ text, from, to, dialect }))
  );
}

