import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import personasData from "../../../data/personas.json";

export default function Personas() {
  const { selectedPersona, setSelectedPersona } = useAppStore();
  const [, setLocation] = useLocation();

  const handleSelectPersona = (persona: typeof personasData.personas[0]) => {
    setSelectedPersona(persona as any);
    setLocation(`/persona-journey?persona=${persona.id}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Choose Your Persona
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience the multilingual journey through the eyes of Spanish-speaking customers
        </p>
      </div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {personasData.personas.map((persona, index) => {
          const isSelected = selectedPersona?.id === persona.id;

          return (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => handleSelectPersona(persona)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{persona.avatar}</div>
                      <div>
                        <CardTitle className="text-2xl">{persona.name}</CardTitle>
                        <CardDescription className="text-base">
                          {persona.role}
                        </CardDescription>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Dialect Badge */}
                  <div>
                    <Badge variant="secondary" className="text-sm">
                      {persona.dialectLabel}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground">{persona.description}</p>

                  {/* Needs */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">
                      Key Needs:
                    </p>
                    <ul className="space-y-1">
                      {persona.needs.map((need, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-0.5">•</span>
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full"
                    variant={isSelected ? "default" : "outline"}
                  >
                    {isSelected ? "Selected - View Journey" : "Select Persona"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button */}
      {selectedPersona && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => setLocation(`/persona-journey?persona=${selectedPersona.id}`)}
            className="gap-2"
          >
            Start {selectedPersona.name}'s Journey
          </Button>
        </motion.div>
      )}
    </div>
  );
}

