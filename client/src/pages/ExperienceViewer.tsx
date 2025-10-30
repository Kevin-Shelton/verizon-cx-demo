import { useRoute } from "wouter";
import ExperienceCarousel, { ExperienceStep } from "@/components/ExperienceCarousel";

// Persona experience sequences
const personaExperiences: Record<string, { name: string; description: string; steps: ExperienceStep[] }> = {
  carlos: {
    name: "Carlos",
    description: "Spanish-speaking customer seeking multilingual support",
    steps: [
      {
        id: "email",
        title: "Email Experience",
        description: "Dialect-specific email communication",
        url: "/experiences/email",
        type: "email-viewer",
      },
      {
        id: "ivr",
        title: "IVR & Voice Experience",
        description: "Real-time voice interaction with dialect awareness",
        url: "https://qa-web.ikunnect.com/auth/login",
        type: "ivr-voice",
      },
      {
        id: "field",
        title: "Field Services Experience",
        description: "On-site service with cultural context",
        url: "/experiences/field-services",
        type: "field-services",
      },
    ],
  },
  maria: {
    name: "Maria",
    description: "Portuguese-speaking customer with specific regional dialect",
    steps: [
      {
        id: "email",
        title: "Email Experience",
        description: "Dialect-specific email communication",
        url: "/experiences/email",
        type: "email-viewer",
      },
      {
        id: "ivr",
        title: "IVR & Voice Experience",
        description: "Real-time voice interaction with dialect awareness",
        url: "https://qa-web.ikunnect.com/auth/login",
        type: "ivr-voice",
      },
      {
        id: "field",
        title: "Field Services Experience",
        description: "On-site service with cultural context",
        url: "/experiences/field-services",
        type: "field-services",
      },
    ],
  },
  lucia: {
    name: "Juan",
    description: "Central American Spanish speaker with unique dialect needs",
    steps: [
      {
        id: "email",
        title: "Email Experience",
        description: "Dialect-specific email communication",
        url: "/experiences/email",
        type: "email-viewer",
      },
      {
        id: "ivr",
        title: "IVR & Voice Experience",
        description: "Real-time voice interaction with dialect awareness",
        url: "https://qa-web.ikunnect.com/auth/login",
        type: "ivr-voice",
      },
      {
        id: "field",
        title: "Field Services Experience",
        description: "On-site service with cultural context",
        url: "/experiences/field-services",
        type: "field-services",
      },
    ],
  },
  diego: {
    name: "Amara",
    description: "South American Spanish speaker with regional preferences",
    steps: [
      {
        id: "email",
        title: "Email Experience",
        description: "Dialect-specific email communication",
        url: "/experiences/email",
        type: "email-viewer",
      },
      {
        id: "ivr",
        title: "IVR & Voice Experience",
        description: "Real-time voice interaction with dialect awareness",
        url: "https://qa-web.ikunnect.com/auth/login",
        type: "ivr-voice",
      },
      {
        id: "field",
        title: "Field Services Experience",
        description: "On-site service with cultural context",
        url: "/experiences/field-services",
        type: "field-services",
      },
    ],
  },
};

export default function ExperienceViewer() {
  const [, params] = useRoute("/experience-viewer/:personaId");
  const personaId = params?.personaId as string;

  if (!personaId) {
    return <div className="text-center py-12">Persona not found</div>;
  }

  const persona = personaExperiences[personaId];
  if (!persona) {
    return <div className="text-center py-12">Unknown persona: {personaId}</div>;
  }

  return (
    <ExperienceCarousel
      personaName={persona.name}
      personaDescription={persona.description}
      steps={persona.steps}
    />
  );
}

