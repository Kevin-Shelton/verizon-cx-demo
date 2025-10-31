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
      "email-viewer": "Carlos receives a customer service email from Verizon in Mexican Spanish. Verizon's dialect-specific system ensures authentic communication that respects his business needs and builds trust with his retail customers.",
      "website-translation": "Carlos accesses Verizon's website in Mexican Spanish. Verizon's dialect-aware translation captures regional preferences, making it easy for Carlos to understand service offerings and manage his business account.",
      "live-chat": "Carlos contacts Verizon support via live chat in Mexican Spanish. Verizon's real-time translation with cultural context helps Carlos quickly resolve issues and get the support his retail business needs.",
      "field-services": "Carlos meets with a Verizon sales representative at his retail store to discuss ordering new services. The Verizon rep communicates in Mexican Spanish, ensuring Carlos fully understands service options, pricing, and how Verizon can support his growing retail business.",
      "document-translation": "Carlos receives important Verizon service documents in Mexican Spanish. Verizon's culturally-accurate translation ensures Carlos fully understands contracts and service terms in his preferred dialect.",
    },
    maria: {
      "ivr-voice": "María calls Verizon's support line for device swap assistance. Verizon's IVR system recognizes Caribbean Spanish dialect, routing her quickly to the right team without language barriers.",
      "live-chat": "María contacts Verizon via live chat for technical support for her field team. Verizon's real-time translation with Caribbean Spanish dialect ensures quick problem resolution and keeps her team productive.",
      "website-translation": "María logs into her Verizon account to check promo eligibility for her field services team. Verizon's website in Caribbean Spanish ensures María understands all promotion details and service options clearly.",
      "field-services": "María schedules on-site technical support from Verizon for her field operations. Verizon technicians communicate in Caribbean Spanish, respecting local business practices and ensuring seamless service delivery.",
    },
    lucia: {
      "ivr-voice": "Lucía calls Verizon's fraud resolution team about her healthcare clinic's account. Verizon's IVR system recognizes Colombian Spanish dialect, connecting her quickly to specialized support for healthcare providers.",
    },
    diego: {
      "website-translation": "Diego accesses Verizon's website to order bulk devices for his construction crew. Verizon's website in US Spanish ensures Diego understands all technical specifications, pricing, and service options for his project needs.",
      "ivr-voice": "Diego calls Verizon to check on field worker connectivity solutions for his construction site. Verizon's IVR system recognizes US Spanish dialect, connecting him to the right technical team without language barriers.",
      "live-chat": "Diego contacts Verizon via live chat to manage his fleet of devices for his construction crew. Verizon's real-time translation with US Spanish dialect helps Diego coordinate efficiently with his team.",
      "field-services": "Diego schedules on-site technical support from Verizon at his construction site. Verizon technicians communicate in US Spanish, respecting job site safety protocols while ensuring his team stays connected.",
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
    { step_type: "email-viewer", url: "https://explore.ikoneworld.com/email-translate/" },
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

