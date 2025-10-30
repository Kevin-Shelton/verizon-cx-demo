import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import ExperienceCarousel, { ExperienceStep } from "@/components/ExperienceCarousel";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Persona metadata
const personaMetadata: Record<string, { name: string; description: string }> = {
  carlos: { name: "Carlos", description: "Spanish-speaking customer seeking multilingual support" },
  maria: { name: "Maria", description: "Portuguese-speaking customer with specific regional dialect" },
  lucia: { name: "Juan", description: "Central American Spanish speaker with unique dialect needs" },
  diego: { name: "Amara", description: "South American Spanish speaker with regional preferences" },
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

export default function ExperienceViewer() {
  const [, params] = useRoute("/experience-viewer/:personaId");
  const personaId = params?.personaId as string;
  const [steps, setSteps] = useState<ExperienceStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonaExperiences = async () => {
      if (!personaId) return;

      try {
        const { data, error: supabaseError } = await supabase
          .from("persona_experiences")
          .select("*")
          .eq("persona_id", personaId)
          .order("step_order", { ascending: true });

        if (supabaseError) {
          setError(supabaseError.message);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const transformedSteps: ExperienceStep[] = data.map((exp: any, index: number) => {
            const config = stepTypeConfig[exp.step_type] || {
              title: exp.step_type,
              description: "",
            };
            return {
              id: `step-${index}`,
              title: config.title,
              description: config.description,
              url: exp.url,
              type: exp.step_type,
            };
          });
          setSteps(transformedSteps);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonaExperiences();
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

  if (steps.length === 0) {
    return <div className="text-center py-12">No experiences found for this persona</div>;
  }

  return (
    <ExperienceCarousel
      personaName={persona.name}
      personaDescription={persona.description}
      steps={steps}
    />
  );
}

