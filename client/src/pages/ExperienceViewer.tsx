import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import ExperienceCarousel, { ExperienceStep } from "@/components/ExperienceCarousel";

// Persona metadata
const personaMetadata: Record<string, { name: string; description: string }> = {
  carlos: { name: "Carlos", description: "SMB Retail Owner - Mexican Spanish" },
  maria: { name: "María", description: "Field Services Manager - Caribbean Spanish (Puerto Rico)" },
  lucia: { name: "Lucía", description: "Healthcare Clinic Administrator - Latin American Spanish (Colombia)" },
  diego: { name: "Diego", description: "Construction Project Manager - US Spanish" },
};

// Narratives aligned with persona key needs
const getNarrativeForStep = (personaId: string, stepType: string, stepIndex: number): string => {
  const narratives: Record<string, Record<string, string>> = {
    carlos: {
      "email-viewer": "Carlos receives a customer service email in Mexican Spanish. Watch how dialect-specific translation ensures his retail business gets authentic, culturally-aware communication that builds trust with his customers.",
      "website-translation": "Carlos needs to translate his website for Spanish-speaking customers. See how dialect-specific translation captures regional preferences and improves conversion rates.",
      "live-chat": "Real-time chat support in Mexican Spanish helps Carlos respond quickly to customer inquiries. Experience how cultural context improves customer satisfaction.",
      "field-services": "Carlos's retail store needs on-site technical support. Watch how technicians communicate in his dialect, respecting business formality while solving problems efficiently.",
      "document-translation": "Important business documents are translated with cultural accuracy. Carlos can confidently share contracts and agreements with Spanish-speaking partners.",
    },
    maria: {
      "ivr-voice": "María calls for device swap assistance. Experience how IVR systems with Caribbean Spanish dialect recognition make it easy to get technical support without language barriers.",
      "live-chat": "María uses live chat to get technical support for her field team. See how real-time translation with cultural context speeds up problem resolution.",
      "website-translation": "María checks promo eligibility on a translated website. Watch how dialect-specific translation ensures she understands all the details clearly.",
      "field-services": "María's field service team needs on-site support. Experience how technicians communicate in Caribbean Spanish, respecting local customs and business practices.",
    },
    lucia: {
      "ivr-voice": "Lucía calls to resolve fraud alerts on her healthcare clinic's account. Experience how IVR with Colombian Spanish dialect recognition helps her quickly reach the right support team.",
    },
    diego: {
      "website-translation": "Diego needs to order bulk devices for his construction crew. See how dialect-specific translation ensures he understands all technical specifications and pricing clearly.",
      "ivr-voice": "Diego calls to check on field worker connectivity solutions. Experience how IVR with US Spanish dialect recognition connects him with the right technical team.",
      "live-chat": "Diego uses live chat to manage his fleet of devices. Watch how real-time translation with cultural context helps him coordinate with his team efficiently.",
      "field-services": "Diego's construction site needs on-site technical support. Experience how technicians communicate in US Spanish, respecting job site safety protocols and business needs.",
    },
  };

  return narratives[personaId]?.[stepType] || "";
};

// Step type to title/description mapping
const stepTypeConfig: Record<string, { title: string; description: string }> = {
  "email-viewer": {
    title: "Email Experience",
    description: "Dialect-specific email communication",
  },
  "ivr-voice": {
    title: "IVR & Voice Experience",
    description: "Real-time voice interaction with dialect awareness",
  },
  "field-services": {
    title: "Field Services Experience",
    description: "On-site service with cultural context",
  },
  "website-translation": {
    title: "Website Translation",
    description: "Public and authenticated site translation with dialect support",
  },
  "live-chat": {
    title: "Live Chat",
    description: "Real-time chat translation with sentiment analysis",
  },
  "document-translation": {
    title: "Document Translation",
    description: "Upload and translate documents with bilingual preview",
  },
};

// Hardcoded persona experiences - from persona_experiences table
const hardcodedExperiences: Record<string, Array<{ step_type: "email" | "ivr" | "field-services" | "email-viewer" | "ivr-voice" | "website-translation" | "live-chat" | "document-translation"; url: string }>> = {
  carlos: [
    { step_type: "email-viewer", url: "/experiences/email/carlos" },
    { step_type: "website-translation", url: "https://explore.ikoneworld.com/site-translate/index.php/https/www.verizon.com/business/" },
    { step_type: "live-chat", url: "https://explore.ikoneworld.com/live-chat/" },
    { step_type: "field-services", url: "https://explore.ikoneworld.com/field-service/" },
    { step_type: "document-translation", url: "https://explore.ikoneworld.com/document-translate/" },
  ],
  maria: [
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
    { step_type: "live-chat", url: "https://explore.ikoneworld.com/live-chat/" },
    { step_type: "website-translation", url: "https://explore.ikoneworld.com/site-translate/index.php/https/www.verizon.com/business/" },
    { step_type: "field-services", url: "https://explore.ikoneworld.com/field-service/" },
  ],
  lucia: [
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
  ],
  diego: [
    { step_type: "website-translation", url: "https://explore.ikoneworld.com/site-translate/index.php/https/www.verizon.com/business/" },
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
    { step_type: "live-chat", url: "https://explore.ikoneworld.com/live-chat/" },
    { step_type: "field-services", url: "https://explore.ikoneworld.com/field-service/" },
  ],
};

export default function ExperienceViewer() {
  const [, params] = useRoute("/experience-viewer/:personaId");
  const personaId = params?.personaId as string;
  const [steps, setSteps] = useState<ExperienceStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personaId) {
      setLoading(false);
      return;
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      const experiences = hardcodedExperiences[personaId];
      if (experiences) {
        const transformedSteps: ExperienceStep[] = experiences.map((exp, index) => {
          const config = stepTypeConfig[exp.step_type] || {
            title: exp.step_type,
            description: "",
          };
          const narrative = getNarrativeForStep(personaId, exp.step_type, index);
          return {
            id: `step-${index}`,
            title: config.title,
            description: config.description,
            url: exp.url,
            type: exp.step_type as "email" | "ivr" | "field-services" | "email-viewer" | "ivr-voice" | "website-translation" | "live-chat" | "document-translation",
            narrative,
          };
        });
        setSteps(transformedSteps);
        setLoading(false);
      } else {
        setError("No experiences found for this persona");
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [personaId]);

  if (!personaId) {
    return <div className="text-center py-12">Persona not found</div>;
  }

  const persona = personaMetadata[personaId];
  if (!persona) {
    return <div className="text-center py-12">Unknown persona: {personaId}</div>;
  }

  if (loading) {
    return <div className="text-center py-12">Loading experience sequence...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">Error: {error}</div>;
  }

  if (steps.length === 0 && !loading) {
    return <div className="text-center py-12">No experiences found for this persona</div>;
  }

  if (!steps || steps.length === 0) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <ExperienceCarousel
      personaName={persona.name}
      personaDescription={persona.description}
      steps={steps}
    />
  );
}

