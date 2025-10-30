import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import ExperienceCarousel, { ExperienceStep } from "@/components/ExperienceCarousel";
import { stepTypeConfig } from "@/lib/stepTypeConfig";
import { trpc } from "@/lib/trpc";

// Persona metadata
const personaMetadata: Record<string, { name: string; description: string }> = {
  carlos: {
    name: "Carlos",
    description: "Spanish-speaking customer seeking multilingual support",
  },
  maria: {
    name: "Maria",
    description: "Portuguese-speaking customer with specific regional dialect",
  },
  lucia: {
    name: "Juan",
    description: "Central American Spanish speaker with unique dialect needs",
  },
  diego: {
    name: "Amara",
    description: "South American Spanish speaker with regional preferences",
  },
};

export default function ExperienceViewer() {
  const [, params] = useRoute("/experience-viewer/:personaId");
  const personaId = params?.personaId as string;
  const [steps, setSteps] = useState<ExperienceStep[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch persona experiences from database
  const { data: experiences } = trpc.experiences.getPersonaExperiences.useQuery(personaId, {
    enabled: !!personaId,
  });

  useEffect(() => {
    if (experiences && experiences.length > 0) {
      // Transform database rows to ExperienceStep format
      const transformedSteps: ExperienceStep[] = experiences.map((exp: any, index: number) => {
        const config = stepTypeConfig[exp.step_type] || { title: exp.step_type, description: "" };
        return {
          id: `step-${index}`,
          title: config.title,
          description: config.description,
          url: exp.url,
          type: exp.step_type,
        };
      });
      setSteps(transformedSteps);
      setLoading(false);
    }
  }, [experiences]);

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

