import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Home,
  CheckCircle2,
  Globe,
  MessageSquare,
  FileText,
  Phone,
} from "lucide-react";
import personasData from "../../../data/personas.json";

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  pillar: string;
  originalText: string;
  translatedText: string;
  culturalNote: string;
  icon: any;
}

const pillarIcons: Record<string, any> = {
  web: Globe,
  chat: MessageSquare,
  documents: FileText,
  ivr: Phone,
  email: FileText,
  field: Home,
};

export default function PersonaJourney() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [personaId, setPersonaId] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("persona");
    if (id) {
      setPersonaId(id);
    }
  }, []);

  const persona = personasData.personas.find((p) => p.id === personaId);

  if (!persona) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Persona not found</p>
            <Button onClick={() => setLocation("/personas")}>
              Back to Personas
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Define journey steps for each persona
  const journeySteps: Record<string, JourneyStep[]> = {
    maria: [
      {
        id: "step1",
        title: "Receiving Service Request",
        description: "María receives a field service request from a customer",
        pillar: "email",
        originalText: "I need help with my device swap",
        translatedText: "Necesito ayuda con el cambio de mi dispositivo",
        culturalNote:
          "Puerto Rican Spanish uses 'dispositivo' for device. The formal 'usted' form shows respect.",
        icon: FileText,
      },
      {
        id: "step2",
        title: "Checking Device Eligibility",
        description: "María checks the customer's device swap eligibility",
        pillar: "web",
        originalText: "Device Swap Eligibility: Approved",
        translatedText: "Elegibilidad para Cambio de Dispositivo: Aprobado",
        culturalNote:
          "Caribbean Spanish prefers 'cambio' over 'intercambio' for swap.",
        icon: Globe,
      },
      {
        id: "step3",
        title: "Coordinating with Technician",
        description: "María coordinates with field technician via live chat",
        pillar: "chat",
        originalText: "The customer is ready for the device swap at 2 PM",
        translatedText:
          "El cliente está listo para el cambio de dispositivo a las 2 PM",
        culturalNote:
          "Puerto Rican Spanish uses 24-hour time format less frequently than European Spanish.",
        icon: MessageSquare,
      },
      {
        id: "step4",
        title: "Confirming Promo Eligibility",
        description: "María confirms promotional offer eligibility",
        pillar: "documents",
        originalText: "Trade-in Credit: $200 applied to your account",
        translatedText:
          "Crédito por Entrega: $200 aplicados a su cuenta",
        culturalNote:
          "'Entrega' is more natural than 'trade-in' in Puerto Rican business context.",
        icon: FileText,
      },
      {
        id: "step5",
        title: "Service Completion",
        description: "María completes the service and sends confirmation",
        pillar: "email",
        originalText: "Your device swap has been completed successfully",
        translatedText:
          "Su cambio de dispositivo se ha completado exitosamente",
        culturalNote:
          "Puerto Rican Spanish prefers 'exitosamente' over 'con éxito' for successfully.",
        icon: CheckCircle2,
      },
    ],
    carlos: [
      {
        id: "step1",
        title: "Exploring Business Plans",
        description: "Carlos browses business phone plans on the website",
        pillar: "web",
        originalText: "Small Business Phone Plans",
        translatedText: "Planes Telefónicos para Pequeñas Empresas",
        culturalNote:
          "Mexican Spanish uses 'pequeñas empresas' rather than 'PYMES' in customer-facing content.",
        icon: Globe,
      },
      {
        id: "step2",
        title: "Contacting Sales via Chat",
        description: "Carlos initiates a chat to ask about porting numbers",
        pillar: "chat",
        originalText: "Can I keep my existing phone numbers?",
        translatedText: "¿Puedo conservar mis números telefónicos actuales?",
        culturalNote:
          "Mexican Spanish uses 'conservar' for 'keep' in business contexts.",
        icon: MessageSquare,
      },
      {
        id: "step3",
        title: "Receiving Quote via Email",
        description: "Carlos receives a customized quote for his business",
        pillar: "email",
        originalText: "Your customized quote for 5 business lines",
        translatedText: "Su cotización personalizada para 5 líneas empresariales",
        culturalNote:
          "Mexican Spanish prefers 'cotización' over 'presupuesto' for business quotes.",
        icon: FileText,
      },
      {
        id: "step4",
        title: "Calling Sales Support",
        description: "Carlos calls to clarify pricing details",
        pillar: "ivr",
        originalText: "Press 1 for Sales, Press 2 for Support",
        translatedText:
          "Presione 1 para Ventas, Presione 2 para Soporte",
        culturalNote:
          "Mexican Spanish uses 'presione' (formal command) in IVR systems.",
        icon: Phone,
      },
      {
        id: "step5",
        title: "Reviewing Contract",
        description: "Carlos reviews the service agreement document",
        pillar: "documents",
        originalText: "Business Service Agreement - 24 Month Term",
        translatedText: "Contrato de Servicio Empresarial - Plazo de 24 Meses",
        culturalNote:
          "Mexican Spanish uses 'plazo' for 'term' in legal/business documents.",
        icon: FileText,
      },
    ],
    lucia: [
      {
        id: "step1",
        title: "Receiving Fraud Alert",
        description: "Lucía receives an automated fraud alert email",
        pillar: "email",
        originalText: "Unusual activity detected on account #12345",
        translatedText: "Actividad inusual detectada en la cuenta #12345",
        culturalNote:
          "Colombian Spanish uses 'inusual' rather than 'extraña' for unusual in formal contexts.",
        icon: FileText,
      },
      {
        id: "step2",
        title: "Opening Support Case",
        description: "Lucía opens a support case via web portal",
        pillar: "web",
        originalText: "Create New Support Case",
        translatedText: "Crear Nuevo Caso de Soporte",
        culturalNote:
          "Colombian Spanish prefers 'caso' over 'ticket' for support cases.",
        icon: Globe,
      },
      {
        id: "step3",
        title: "Live Chat with Security Team",
        description: "Lucía chats with security team about the fraud alert",
        pillar: "chat",
        originalText: "We've temporarily locked the account for your protection",
        translatedText:
          "Hemos bloqueado temporalmente la cuenta para su protección",
        culturalNote:
          "Colombian Spanish uses 'bloquear' for 'lock' in security contexts.",
        icon: MessageSquare,
      },
      {
        id: "step4",
        title: "Verifying Account Security",
        description: "Lucía verifies security questions via phone",
        pillar: "ivr",
        originalText: "Please verify your identity",
        translatedText: "Por favor verifique su identidad",
        culturalNote:
          "Colombian Spanish uses 'verifique' (subjunctive) after 'por favor' for polite requests.",
        icon: Phone,
      },
      {
        id: "step5",
        title: "Receiving Resolution Confirmation",
        description: "Lucía receives confirmation that the issue is resolved",
        pillar: "email",
        originalText: "Your account has been secured and reactivated",
        translatedText: "Su cuenta ha sido asegurada y reactivada",
        culturalNote:
          "Colombian Spanish prefers 'asegurada' over 'protegida' for secured.",
        icon: CheckCircle2,
      },
    ],
    diego: [
      {
        id: "step1",
        title: "Bulk Device Order Request",
        description: "Diego submits a bulk device order for field workers",
        pillar: "web",
        originalText: "Order 50 devices for your team",
        translatedText: "Ordenar 50 dispositivos para su equipo",
        culturalNote:
          "US Spanish uses 'ordenar' (to order) rather than 'pedir' in business contexts.",
        icon: Globe,
      },
      {
        id: "step2",
        title: "Reviewing Fleet Management Options",
        description: "Diego reviews fleet management features",
        pillar: "documents",
        originalText: "Fleet Management Dashboard - Track all devices",
        translatedText:
          "Panel de Gestión de Flota - Rastrear todos los dispositivos",
        culturalNote:
          "US Spanish uses 'rastrear' for 'track' in technical contexts.",
        icon: FileText,
      },
      {
        id: "step3",
        title: "Coordinating with Field Workers",
        description: "Diego sends instructions to field workers via chat",
        pillar: "chat",
        originalText: "Your new device will arrive tomorrow",
        translatedText: "Su nuevo dispositivo llegará mañana",
        culturalNote:
          "US Spanish maintains formal 'su' in business communications.",
        icon: MessageSquare,
      },
      {
        id: "step4",
        title: "Setting Up Device Provisioning",
        description: "Diego configures automated device provisioning",
        pillar: "web",
        originalText: "Automatic device provisioning enabled",
        translatedText: "Aprovisionamiento automático de dispositivos habilitado",
        culturalNote:
          "US Spanish uses technical term 'aprovisionamiento' for provisioning.",
        icon: Globe,
      },
      {
        id: "step5",
        title: "Confirming Deployment",
        description: "Diego receives confirmation of successful deployment",
        pillar: "email",
        originalText: "All 50 devices have been activated successfully",
        translatedText: "Los 50 dispositivos han sido activados exitosamente",
        culturalNote:
          "US Spanish uses 'activados' (activated) consistently across communications.",
        icon: CheckCircle2,
      },
    ],
  };

  const steps = journeySteps[personaId] || [];
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowTranslation(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowTranslation(false);
    }
  };

  const Icon = currentStepData?.icon || CheckCircle2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setLocation("/personas")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Personas
            </Button>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">{persona.name}'s Journey</h1>
              <p className="text-sm text-muted-foreground">
                {persona.dialect} • {persona.role}
              </p>
            </div>
            <div className="w-32" />
          </div>
        </div>
      </div>

      <div className="container py-8 max-w-4xl">
        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Journey Step */}
        <AnimatePresence mode="wait">
          {currentStepData && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-background">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">
                        {currentStepData.title}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {currentStepData.description}
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        {currentStepData.pillar}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-6">
                  {/* Original Text */}
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">English (Original)</span>
                    </h3>
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        <p className="text-lg">{currentStepData.originalText}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Translation Toggle */}
                  <div className="flex justify-center">
                    <Button
                      onClick={() => setShowTranslation(!showTranslation)}
                      variant={showTranslation ? "default" : "outline"}
                      size="lg"
                      className="gap-2"
                    >
                      <Globe className="h-5 w-5" />
                      {showTranslation ? "Hide Translation" : "Show Translation"}
                    </Button>
                  </div>

                  {/* Translated Text */}
                  <AnimatePresence>
                    {showTranslation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {persona.dialect}
                            </span>
                          </h3>
                          <Card className="bg-green-50 border-green-200">
                            <CardContent className="p-4">
                              <p className="text-lg font-medium">
                                {currentStepData.translatedText}
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Cultural Note */}
                        <Card className="bg-blue-50 border-blue-200">
                          <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-blue-600" />
                              Cultural Insight
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {currentStepData.culturalNote}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={() => setLocation("/personas")}
              size="lg"
              className="gap-2"
            >
              Complete Journey
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="gap-2">
              Next Step
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

