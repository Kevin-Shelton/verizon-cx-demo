import { Mail, MessageSquare, CheckCircle2, Clock } from "lucide-react";

interface EmailViewerComponentProps {
  personaName: string;
}

export default function EmailViewerComponent({
  personaName,
}: EmailViewerComponentProps) {
  // Persona-specific email content
  const emailContent: Record<string, { subject: string; customerMessage: string; agentResponse: string }> = {
    carlos: {
      subject: "Pregunta sobre mi factura",
      customerMessage:
        "Hola, tengo una pregunta sobre mi última factura. ¿Pueden explicarme en detalle cómo se calculan los cargos?",
      agentResponse:
        "¡Claro, Carlos! Entiendo que necesitas claridad sobre tu factura. Te voy a desglosar cada cargo para que entiendas exactamente qué estás pagando. Nuestro sistema de facturación es transparente y queremos que tengas toda la información.",
    },
    maria: {
      subject: "Servicio técnico para mi negocio",
      customerMessage:
        "Buenos días, necesito asistencia técnica para mi sistema. ¿Cuándo pueden enviar a un técnico?",
      agentResponse:
        "¡Hola María! Entendemos la importancia de tu negocio. Vamos a priorizar tu caso y enviaremos a nuestro mejor técnico en las próximas 2 horas. Te confirmaremos la hora exacta en 30 minutos.",
    },
    lucia: {
      subject: "Consulta sobre planes de servicio",
      customerMessage:
        "Necesito información sobre planes que se adapten mejor a mi clínica. ¿Cuáles son las opciones disponibles?",
      agentResponse:
        "¡Hola Lucía! Para una clínica como la tuya, tenemos opciones especializadas. Déjame mostrarte nuestros planes empresariales que incluyen soporte prioritario y características diseñadas para el sector salud.",
    },
    diego: {
      subject: "Conectividad para mi sitio de construcción",
      customerMessage:
        "Necesito una solución de conectividad confiable para mi sitio de construcción. ¿Qué opciones tienen?",
      agentResponse:
        "¡Hola Diego! Para construcción, necesitas algo robusto. Tenemos soluciones móviles con cobertura garantizada en sitios remotos. Te voy a conectar con nuestro especialista en soluciones empresariales.",
    },
  };

  const content = emailContent[personaName.toLowerCase()] || emailContent.carlos;

  return (
    <div className="p-8 overflow-y-auto max-h-[calc(100vh-400px)] bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Email Interface */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Email Conversation
          </h2>
          
          {/* Customer Email */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">From: customer@example.com</p>
              <p className="text-sm font-semibold text-gray-700 mb-3">Subject: {content.subject}</p>
              <p className="text-gray-700 leading-relaxed">{content.customerMessage}</p>
            </div>

            {/* Agent Response */}
            <div className="bg-blue-50 p-4 rounded border border-blue-200 ml-8">
              <p className="text-sm font-semibold text-blue-700 mb-2">Agent Response (Dialect-Optimized):</p>
              <p className="text-gray-700 leading-relaxed">{content.agentResponse}</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Authentic Communication</h3>
                <p className="text-sm text-gray-600">
                  Responses feel natural and culturally appropriate
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Faster Resolution</h3>
                <p className="text-sm text-gray-600">
                  Clear communication reduces back-and-forth
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Higher Satisfaction</h3>
                <p className="text-sm text-gray-600">
                  Customers feel understood and valued
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            Email Journey
          </h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Customer Sends Email", desc: "Customer reaches out with a question or issue" },
              { step: 2, title: "Dialect Detection", desc: "System identifies customer's dialect and cultural context" },
              { step: 3, title: "Intelligent Response", desc: "AI generates culturally appropriate response" },
              { step: 4, title: "Delivery", desc: "Customer receives authentic, relevant response" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  {item.step < 4 && <div className="w-1 h-12 bg-blue-200 mt-2" />}
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

