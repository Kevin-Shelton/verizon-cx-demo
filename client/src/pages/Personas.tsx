import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Users, Globe, MessageCircle, ArrowRight } from "lucide-react";
import personasData from "../../../data/personas.json";

export default function Personas() {
  const { selectedPersona, setSelectedPersona } = useAppStore();
  const [, setLocation] = useLocation();

  const handleSelectPersona = (persona: typeof personasData.personas[0]) => {
    setSelectedPersona(persona as any);
    setLocation(`/persona-journey?persona=${persona.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Customer Personas</h1>
          </div>
          <p className="text-2xl text-blue-100 max-w-3xl">
            Experience the multilingual journey through the eyes of Spanish-speaking customers across different dialects and use cases
          </p>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Dialects Covered</div>
              </div>
              <div className="text-3xl font-bold">4</div>
              <div className="text-sm text-blue-200 mt-1">Mexican, Caribbean, Central American, South American</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-5 h-5 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Journey Touchpoints</div>
              </div>
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm text-blue-200 mt-1">Email, Web, Chat, IVR, Documents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Customer Segments</div>
              </div>
              <div className="text-3xl font-bold">4</div>
              <div className="text-sm text-blue-200 mt-1">Business owner, family, student, professional</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Why Personas Matter for Multilingual CX
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Each persona represents a distinct segment of the U.S. Hispanic market with unique linguistic preferences, cultural expectations, and communication needs. By experiencing their journeys, you'll see how dialect-specific translation drives trust, reduces friction, and improves conversion rates.
          </p>
          <p className="text-gray-600">
            Select a persona below to explore their end-to-end customer journey with authentic, culturally-aware translations across all touchpoints.
          </p>
        </div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {personasData.personas.map((persona, index) => {
            const isSelected = selectedPersona?.id === persona.id;

            // Define color schemes for each persona
            const colorSchemes = {
              maria: { border: 'border-purple-300', bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
              carlos: { border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
              lucia: { border: 'border-green-300', bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
              diego: { border: 'border-orange-300', bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' }
            };

            const colors = colorSchemes[persona.id as keyof typeof colorSchemes];

            return (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full transition-all cursor-pointer hover:shadow-xl ${
                    isSelected
                      ? `ring-2 ring-blue-600 shadow-lg ${colors.border} border-2`
                      : `${colors.border} border-2 hover:shadow-md`
                  }`}
                  onClick={() => handleSelectPersona(persona)}
                >
                  <CardHeader className={colors.bg}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{persona.avatar}</div>
                        <div>
                          <CardTitle className="text-2xl text-gray-900">{persona.name}</CardTitle>
                          <CardDescription className="text-base text-gray-600 mt-1">
                            {persona.role}
                          </CardDescription>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-7 w-7 text-blue-600" />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-5">
                    {/* Dialect Badge */}
                    <div>
                      <Badge className={`text-sm font-semibold ${colors.badge}`}>
                        {persona.dialectLabel}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">{persona.description}</p>

                    {/* Needs */}
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                        Key Needs:
                      </p>
                      <ul className="space-y-2">
                        {persona.needs.map((need, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-700 flex items-start gap-3"
                          >
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 ${colors.text} flex-shrink-0`} />
                            <span>{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <Button
                      className={`w-full mt-4 ${isSelected ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={isSelected ? "default" : "outline"}
                    >
                      {isSelected ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Selected - View Journey
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      ) : (
                        "Select Persona"
                      )}
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
            className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Experience {selectedPersona.name}'s Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Follow their complete customer experience with dialect-specific translations across email, web, chat, IVR, and documents.
            </p>
            <Button
              size="lg"
              onClick={() => setLocation(`/persona-journey?persona=${selectedPersona.id}`)}
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
            >
              Start {selectedPersona.name}'s Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {/* Educational Footer */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-md border-l-4 border-green-500">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            What You'll Experience in Each Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Dual-Pane View</h4>
              <p className="text-gray-600 text-sm">
                See both the customer's translated experience and the agent's English view side-by-side at every touchpoint.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cultural Insights</h4>
              <p className="text-gray-600 text-sm">
                Learn why specific dialect choices matter and how they build trust with different Hispanic segments.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Multi-Channel Coverage</h4>
              <p className="text-gray-600 text-sm">
                Experience consistent, high-quality translation across email, web, chat, IVR, documents, and field services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Real Conversations</h4>
              <p className="text-gray-600 text-sm">
                Follow authentic back-and-forth interactions that demonstrate how dialect-specific translation improves outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

