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
        type: "email",
      },
      {
        id: "ivr",
        title: "IVR & Voice Experience",
        description: "Real-time voice interaction with dialect awareness",
        url: "https://qa-web.ikunnect.com/auth/login",
        type: "ivr",
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
        type: "email",
      },
      {
        id: "ivr",
        title: "IVR & Voice Experience",
        description: "Real-time voice interaction with dialect awareness",
        url: "https://qa-web.ikunnect.com/auth/login",
        type: "ivr",
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
  juan: {
    name: "Juan",
    description: "Spanish-speaking customer with unique regional preferences",
    steps: [
      {
        id: "email",
        title: "Email Experience",
        description: "Dialect-specific email communication",
        url: "/experiences/email",
        type: "email",
      },
      {
        id: "ivr",
        title: "IVR & Voice Experience",
        description: "Real-time voice interaction with dialect awareness",
        url: "https://qa-web.ikunnect.com/auth/login",
        type: "ivr",
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
  amara: {
    name: "Amara",
    description: "Multilingual customer with diverse communication needs",
    steps: [
      {
        id: "email",
        title: "Email Experience",
        description: "Dialect-specific email communication",
        url: "/experiences/email",
        type: "email",
      },
      {
        id: "ivr",
        title: "IVR & Voice Experience",
        description: "Real-time voice interaction with dialect awareness",
        url: "https://qa-web.ikunnect.com/auth/login",
        type: "ivr",
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
  const [match, params] = useRoute("/experience-viewer/:personaId");

  if (!match) {
    return null;
  }

  const personaId = (params?.personaId as string)?.toLowerCase();
  const experience = personaExperiences[personaId];

  if (!experience) {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Persona Not Found</h1>
          <p className="text-gray-300 mb-6">The requested persona experience could not be found.</p>
          <button
            onClick={() => (window.location.href = "/personas")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Return to Personas
          </button>
        </div>
      </div>
    );
  }

  return (
    <ExperienceCarousel
      personaName={experience.name}
      personaDescription={experience.description}
      steps={experience.steps}
    />
  );
}

