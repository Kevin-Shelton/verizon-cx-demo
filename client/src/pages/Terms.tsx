import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

export default function Terms() {
  const [language, setLanguage] = useState<"en" | "es">("en");

  const content = {
    en: {
      title: "Terms and Conditions",
      lastUpdated: "Last Updated: October 18, 2025",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content:
            "By accessing and using this Verizon Multilingual Customer Experience Demo Portal, you accept and agree to be bound by the terms and provision of this agreement. This demo portal is provided for demonstration purposes only and does not constitute a binding service agreement.",
        },
        {
          title: "2. Demo Purpose",
          content:
            "This portal demonstrates Verizon's multilingual customer experience capabilities across various touchpoints including web, email, chat, IVR, documents, and field services. All personas, scenarios, and interactions are simulated for demonstration purposes.",
        },
        {
          title: "3. Language Translation Services",
          content:
            "The translation services demonstrated in this portal showcase dialect-specific Spanish translations (Mexican Spanish ES-MX, Puerto Rican Spanish ES-PR, Colombian Spanish ES-CO, and US Spanish ES-US). Translations are culturally adapted to respect regional linguistic variations and business contexts.",
        },
        {
          title: "4. Data Collection",
          content:
            "Feedback and transcript data submitted through this demo portal may be collected for product improvement purposes. No personally identifiable information is required or stored beyond what you voluntarily provide.",
        },
        {
          title: "5. Intellectual Property",
          content:
            "All content, trademarks, and data on this demo portal are the property of Verizon Communications Inc. and its affiliates. The Verizon name and logo are registered trademarks.",
        },
        {
          title: "6. Limitation of Liability",
          content:
            "This demo portal is provided 'as is' without warranties of any kind. Verizon shall not be liable for any damages arising from the use of this demonstration platform.",
        },
        {
          title: "7. Modifications",
          content:
            "Verizon reserves the right to modify these terms at any time. Continued use of the demo portal constitutes acceptance of modified terms.",
        },
      ],
    },
    es: {
      title: "Términos y Condiciones",
      lastUpdated: "Última actualización: 18 de octubre de 2025",
      sections: [
        {
          title: "1. Aceptación de los Términos",
          content:
            "Al acceder y utilizar este Portal de Demostración de Experiencia del Cliente Multilingüe de Verizon, usted acepta y se compromete a cumplir con los términos y disposiciones de este acuerdo. Este portal de demostración se proporciona únicamente con fines demostrativos y no constituye un acuerdo de servicio vinculante.",
        },
        {
          title: "2. Propósito de la Demostración",
          content:
            "Este portal demuestra las capacidades de experiencia del cliente multilingüe de Verizon a través de varios puntos de contacto, incluyendo web, correo electrónico, chat, IVR, documentos y servicios de campo. Todas las personas, escenarios e interacciones son simulados con fines demostrativos.",
        },
        {
          title: "3. Servicios de Traducción de Idiomas",
          content:
            "Los servicios de traducción demostrados en este portal muestran traducciones de español específicas por dialecto (español mexicano ES-MX, español puertorriqueño ES-PR, español colombiano ES-CO y español estadounidense ES-US). Las traducciones están adaptadas culturalmente para respetar las variaciones lingüísticas regionales y los contextos empresariales.",
        },
        {
          title: "4. Recopilación de Datos",
          content:
            "Los datos de comentarios y transcripciones enviados a través de este portal de demostración pueden recopilarse con fines de mejora del producto. No se requiere ni se almacena información de identificación personal más allá de lo que usted proporcione voluntariamente.",
        },
        {
          title: "5. Propiedad Intelectual",
          content:
            "Todo el contenido, marcas comerciales y datos en este portal de demostración son propiedad de Verizon Communications Inc. y sus afiliados. El nombre y el logotipo de Verizon son marcas registradas.",
        },
        {
          title: "6. Limitación de Responsabilidad",
          content:
            "Este portal de demostración se proporciona 'tal cual' sin garantías de ningún tipo. Verizon no será responsable de ningún daño que surja del uso de esta plataforma de demostración.",
        },
        {
          title: "7. Modificaciones",
          content:
            "Verizon se reserva el derecho de modificar estos términos en cualquier momento. El uso continuado del portal de demostración constituye la aceptación de los términos modificados.",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/verizon-logo.png"
              alt="Verizon"
              className="h-8 brightness-0 invert"
            />
            <span className="text-sm opacity-70">Demo Portal</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Globe className="w-4 h-4 mr-2" />
            {language === "en" ? "Español" : "English"}
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container py-12 max-w-4xl">
        <Card className="p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-2">{currentContent.title}</h1>
          <p className="text-sm text-gray-500 mb-8">{currentContent.lastUpdated}</p>

          <div className="space-y-8">
            {currentContent.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-gray-600">
              {language === "en"
                ? "For questions about these terms, please contact our support team."
                : "Si tiene preguntas sobre estos términos, comuníquese con nuestro equipo de soporte."}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

