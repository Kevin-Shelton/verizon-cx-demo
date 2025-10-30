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
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
    { step_type: "field-services", url: "https://explore.ikoneworld.com/field-service/" },
  ],
  maria: [
    { step_type: "email-viewer", url: "/experiences/email/maria" },
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
    { step_type: "field-services", url: "https://explore.ikoneworld.com/field-service/" },
  ],
  lucia: [
    { step_type: "email-viewer", url: "/experiences/email/lucia" },
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
    { step_type: "field-services", url: "https://explore.ikoneworld.com/field-service/" },
  ],
  diego: [
    { step_type: "email-viewer", url: "/experiences/email/diego" },
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
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
          return {
            id: `step-${index}`,
            title: config.title,
            description: config.description,
            url: exp.url,
            type: exp.step_type as "email" | "ivr" | "field-services" | "email-viewer" | "ivr-voice" | "website-translation" | "live-chat" | "document-translation",
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

