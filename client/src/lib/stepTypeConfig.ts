// Map step types to their display titles and descriptions
export const stepTypeConfig: Record<string, { title: string; description: string }> = {
  'website-translation': {
    title: 'Website Translation',
    description: 'Public and authenticated site translation with dialect support',
  },
  'email-viewer': {
    title: 'Email Viewer',
    description: 'Inbound and outbound email translation with dual-pane view',
  },
  'live-chat': {
    title: 'Live Chat',
    description: 'Real-time chat translation with sentiment analysis',
  },
  'ivr-voice': {
    title: 'IVR & Voice Experience',
    description: 'Real-time voice interaction with dialect awareness',
  },
  'document-translation': {
    title: 'Document Translation',
    description: 'Upload and translate documents with bilingual preview',
  },
  'field-services': {
    title: 'Field Services Experience',
    description: 'On-site service with cultural context',
  },
};

export function getStepConfig(stepType: string) {
  return stepTypeConfig[stepType] || { title: stepType, description: '' };
}

