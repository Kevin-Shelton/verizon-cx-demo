import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Shield } from "lucide-react";

export default function Privacy() {
  const [language, setLanguage] = useState<"en" | "es">("en");

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: October 18, 2025",
      intro:
        "Verizon is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information in this demo portal.",
      sections: [
        {
          title: "1. Information We Collect",
          content:
            "This demo portal may collect the following types of information: (a) Feedback submissions including your name, email, and comments; (b) Transcript data from simulated interactions; (c) Usage analytics to improve the demo experience; (d) Technical information such as browser type, device information, and IP address.",
        },
        {
          title: "2. How We Use Your Information",
          content:
            "Information collected through this demo portal is used to: (a) Demonstrate multilingual customer experience capabilities; (b) Improve our translation and localization services; (c) Analyze user engagement with demo features; (d) Respond to feedback and inquiries; (e) Enhance the overall demo experience.",
        },
        {
          title: "3. Language and Cultural Data",
          content:
            "This demo showcases dialect-specific translations for Spanish-speaking customers. We collect data on translation quality, cultural relevance, and user preferences to improve our multilingual services. All persona data is simulated and does not represent real customers.",
        },
        {
          title: "4. Data Sharing",
          content:
            "We do not sell your personal information. Demo data may be shared with: (a) Verizon affiliates for product development; (b) Service providers who assist in demo operations; (c) Legal authorities when required by law.",
        },
        {
          title: "5. Data Security",
          content:
            "We implement industry-standard security measures to protect your information. However, this is a demonstration environment and should not be used to submit sensitive personal or financial information.",
        },
        {
          title: "6. Your Rights",
          content:
            "You have the right to: (a) Access your submitted data; (b) Request deletion of your information; (c) Opt-out of data collection; (d) Update or correct your information. Contact us to exercise these rights.",
        },
        {
          title: "7. Cookies and Tracking",
          content:
            "This demo portal uses cookies and similar technologies to enhance user experience, analyze usage patterns, and maintain session state. You can control cookie preferences through your browser settings.",
        },
        {
          title: "8. Children's Privacy",
          content:
            "This demo portal is not intended for children under 13 years of age. We do not knowingly collect personal information from children.",
        },
      ],
    },
    es: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: 18 de octubre de 2025",
      intro:
        "Verizon se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos la información en este portal de demostración.",
      sections: [
        {
          title: "1. Información que Recopilamos",
          content:
            "Este portal de demostración puede recopilar los siguientes tipos de información: (a) Envíos de comentarios que incluyen su nombre, correo electrónico y comentarios; (b) Datos de transcripción de interacciones simuladas; (c) Análisis de uso para mejorar la experiencia de demostración; (d) Información técnica como tipo de navegador, información del dispositivo y dirección IP.",
        },
        {
          title: "2. Cómo Usamos su Información",
          content:
            "La información recopilada a través de este portal de demostración se utiliza para: (a) Demostrar capacidades de experiencia del cliente multilingüe; (b) Mejorar nuestros servicios de traducción y localización; (c) Analizar la participación del usuario con las funciones de demostración; (d) Responder a comentarios y consultas; (e) Mejorar la experiencia general de demostración.",
        },
        {
          title: "3. Datos de Idioma y Cultura",
          content:
            "Esta demostración muestra traducciones específicas por dialecto para clientes de habla hispana. Recopilamos datos sobre la calidad de la traducción, la relevancia cultural y las preferencias del usuario para mejorar nuestros servicios multilingües. Todos los datos de personas son simulados y no representan clientes reales.",
        },
        {
          title: "4. Compartir Datos",
          content:
            "No vendemos su información personal. Los datos de demostración pueden compartirse con: (a) Afiliados de Verizon para el desarrollo de productos; (b) Proveedores de servicios que ayudan en las operaciones de demostración; (c) Autoridades legales cuando lo exija la ley.",
        },
        {
          title: "5. Seguridad de Datos",
          content:
            "Implementamos medidas de seguridad estándar de la industria para proteger su información. Sin embargo, este es un entorno de demostración y no debe usarse para enviar información personal o financiera confidencial.",
        },
        {
          title: "6. Sus Derechos",
          content:
            "Usted tiene derecho a: (a) Acceder a sus datos enviados; (b) Solicitar la eliminación de su información; (c) Optar por no participar en la recopilación de datos; (d) Actualizar o corregir su información. Contáctenos para ejercer estos derechos.",
        },
        {
          title: "7. Cookies y Seguimiento",
          content:
            "Este portal de demostración utiliza cookies y tecnologías similares para mejorar la experiencia del usuario, analizar patrones de uso y mantener el estado de la sesión. Puede controlar las preferencias de cookies a través de la configuración de su navegador.",
        },
        {
          title: "8. Privacidad de los Niños",
          content:
            "Este portal de demostración no está destinado a niños menores de 13 años. No recopilamos intencionalmente información personal de niños.",
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
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-[#E60000]" />
            <h1 className="text-4xl font-bold">{currentContent.title}</h1>
          </div>
          <p className="text-sm text-gray-500 mb-6">{currentContent.lastUpdated}</p>
          <p className="text-gray-700 leading-relaxed mb-8">{currentContent.intro}</p>

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
                ? "For privacy-related questions or to exercise your rights, please contact privacy@verizon.com"
                : "Para preguntas relacionadas con la privacidad o para ejercer sus derechos, comuníquese con privacy@verizon.com"}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

