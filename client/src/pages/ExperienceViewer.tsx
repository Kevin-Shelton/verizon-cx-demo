import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import ExperienceCarousel from "@/components/ExperienceCarousel";

// Persona data
const personasData: Record<string, { name: string; role: string }> = {
  carlos: { name: "Carlos", role: "SMB Retail Owner - Mexican Spanish" },
  maria: { name: "Maria", role: "Field Services Manager - Caribbean Spanish (Puerto Rico)" },
  lucia: { name: "Lucia", role: "Healthcare Clinic Administrator - Latin American Spanish (Colombia)" },
  diego: { name: "Diego", role: "Construction Project Manager - US Spanish" },
};

export interface ExperienceStep {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "email" | "ivr" | "field-services" | "email-viewer" | "ivr-voice" | "website-translation" | "live-chat" | "document-translation";
  narrative?: string;
}

// Step type configuration
const stepTypeConfig: Record<string, { title: string; description: string }> = {
  "email": {
    title: "Email Experience",
    description: "Dialect-specific email communication",
  },
  "email-viewer": {
    title: "Email Experience",
    description: "Dialect-specific email communication",
  },
  "ivr": {
    title: "IVR Voice",
    description: "Interactive voice response with dialect awareness",
  },
  "ivr-voice": {
    title: "IVR Voice",
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
    { step_type: "live-chat", url: "https://demo-infield.ikoneworld.net/demo-start" },
    { step_type: "field-services", url: "https://demo-chat.ikoneworld.net/select-language" },
    { step_type: "document-translation", url: "https://explore.ikoneworld.com/document-translate/" },
  ],
  maria: [
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
    { step_type: "live-chat", url: "https://demo-infield.ikoneworld.net/demo-start" },
    { step_type: "website-translation", url: "https://explore.ikoneworld.com/site-translate/index.php/https/www.verizon.com/business/" },
    { step_type: "field-services", url: "https://demo-chat.ikoneworld.net/select-language" },
  ],
  lucia: [
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
  ],
  diego: [
    { step_type: "website-translation", url: "https://explore.ikoneworld.com/site-translate/index.php/https/www.verizon.com/business/" },
    { step_type: "ivr-voice", url: "https://qa-web.ikunnect.com/auth/login" },
    { step_type: "live-chat", url: "https://demo-infield.ikoneworld.net/demo-start" },
    { step_type: "field-services", url: "https://demo-chat.ikoneworld.net/select-language" },
  ],
};

// Persona narratives
const narratives: Record<string, Record<number, string>> = {
  carlos: {
    0: "Carlos receives a customer service email from Verizon in Mexican Spanish. Verizon's dialect-specific system ensures authentic communication that respects his business needs and builds trust with his retail customers.",
    1: "Carlos accesses Verizon's website in Mexican Spanish. Verizon's dialect-aware translation captures regional preferences, making it easy for Carlos to understand service offerings and manage his business account.",
    2: "Carlos contacts Verizon support via live chat in Mexican Spanish. Verizon's real-time translation with cultural context helps Carlos quickly resolve issues and get the support his retail business needs.",
    3: "Carlos meets with a Verizon sales representative at his retail store to discuss ordering new services. The Verizon rep communicates in Mexican Spanish, ensuring Carlos fully understands service options, pricing, and how Verizon can support his growing retail business.",
    4: "Carlos needs to translate important business documents from Verizon. Verizon's document translation service provides accurate Mexican Spanish translations, ensuring Carlos can share critical information with his team and customers.",
  },
  maria: {
    0: "Maria calls Verizon to request device swap assistance for her field team. Verizon's IVR system recognizes Caribbean Spanish dialect, connecting her to the right support team without language barriers.",
    1: "Maria contacts Verizon via live chat to discuss technical support for her field services team. Verizon's real-time translation with Caribbean Spanish dialect helps Maria coordinate efficiently with her team.",
    2: "Maria accesses Verizon's website to check promo eligibility for her field services. Verizon's dialect-aware translation captures Caribbean Spanish preferences, making it easy for Maria to understand available promotions.",
    3: "Maria schedules on-site technical support from Verizon for her field team. Verizon technicians communicate in Caribbean Spanish, ensuring Maria's team stays connected and productive.",
  },
  lucia: {
    0: "Lucia calls Verizon to report fraud alerts and get account security support. Verizon's IVR system recognizes Latin American Spanish dialect, connecting her to the right security team without language barriers.",
  },
  diego: {
    0: "Diego accesses Verizon's website to order bulk devices for his construction crew. Verizon's dialect-aware translation captures US Spanish preferences, making it easy for Diego to understand device options and pricing.",
    1: "Diego calls Verizon to ensure field worker connectivity for his construction site. Verizon's IVR system recognizes US Spanish dialect, connecting him to the right technical team without language barriers.",
    2: "Diego contacts Verizon via live chat to manage his fleet of devices for his construction crew. Verizon's real-time translation with US Spanish dialect helps Diego coordinate efficiently with his team.",
    3: "Diego schedules on-site technical support from Verizon at his construction site. Verizon technicians communicate in US Spanish, respecting job site safety protocols while ensuring his team stays connected.",
  },
};

export default function ExperienceViewer() {
  const [, params] = useRoute("/experience-viewer/:personaId");
  const personaId = params?.personaId as string;
  const [steps, setSteps] = useState<ExperienceStep[]>([]);
  const [personaData, setPersonaData] = useState<any>(null);

  useEffect(() => {
    if (!personaId) return;

    const persona = { name: personaId, role: "" };

    const personaInfo = personasData[personaId.toLowerCase()];
    if (personaInfo) {
      setPersonaData(personaInfo);
    }

    // Get experiences for this persona from hardcoded data
    const experiences = hardcodedExperiences[personaId.toLowerCase()] || [];

    // Map experiences to steps
    const mappedSteps: ExperienceStep[] = experiences.map((exp, index) => {
      const config = stepTypeConfig[exp.step_type];
      const narrative = narratives[personaId.toLowerCase()]?.[index] || "";

      return {
        id: `${personaId}-${index}`,
        title: config.title,
        description: config.description,
        url: exp.url,
        type: exp.step_type,
        narrative,
      };
    });

    setSteps(mappedSteps);
  }, [personaId]);

  if (!personaData || steps.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <ExperienceCarousel
      personaName={personaData.name}
      personaDescription={personaData.role}
      steps={steps}
    />
  );
}

