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
  Mail,
  User,
  Headphones,
  Send,
} from "lucide-react";
import personasData from "../../../data/personas.json";
import journeyData from "../../../data/journey.json";
import personaJourneyMappings from "../../../data/personaJourneyMappings.json";

interface Message {
  sender: "customer" | "agent";
  text: string;
}

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  pillar: string;
  messages: {
    english: Message[];
    translated: Message[];
  };
  culturalNote: string;
  icon: any;
}

const pillarIcons: Record<string, any> = {
  web: Globe,
  chat: MessageSquare,
  documents: FileText,
  ivr: Phone,
  email: Mail,
  field: Home,
};

export default function PersonaJourney() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
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

  // Define journey steps for each persona with dual-pane messages
  const journeySteps: Record<string, JourneyStep[]> = {
    maria: [
      {
        id: "step1",
        title: "Receiving Service Request",
        description: "María receives a field service request from a customer via email",
        pillar: "email",
        messages: {
          english: [
            { sender: "customer", text: "Hello, I need help with my device swap. My current phone isn't working properly." },
            { sender: "agent", text: "Hello! I'd be happy to help you with your device swap. Can you provide your account number?" },
            { sender: "customer", text: "Yes, it's account #45678. When can someone come out?" },
            { sender: "agent", text: "Let me check availability. We can schedule a technician for tomorrow afternoon. Does 2 PM work for you?" },
          ],
          translated: [
            { sender: "customer", text: "Hola, necesito ayuda con el cambio de mi dispositivo. Mi teléfono actual no funciona bien." },
            { sender: "agent", text: "¡Hola! Con gusto le ayudaré con el cambio de dispositivo. ¿Puede proporcionar su número de cuenta?" },
            { sender: "customer", text: "Sí, es la cuenta #45678. ¿Cuándo puede venir alguien?" },
            { sender: "agent", text: "Déjeme verificar la disponibilidad. Podemos programar un técnico para mañana por la tarde. ¿Le viene bien a las 2 PM?" },
          ],
        },
        culturalNote: "🇵🇷 Puerto Rican Spanish Nuances: This translation demonstrates cultural awareness by using 'dispositivo' (device) instead of Spain's 'ordenador'. The formal 'usted' conjugation ('puede proporcionar') shows professional respect typical in Caribbean business culture. 'Con gusto' (with pleasure) is preferred over Mexico's 'me encantaría' as it conveys genuine willingness to help while maintaining professional boundaries. The phrase 'Le viene bien' (does it work for you) uses the indirect object pronoun 'le' which is standard in Puerto Rican formal speech, creating rapport while respecting social distance.",
        icon: Mail,
      },
      {
        id: "step2",
        title: "Checking Device Eligibility",
        description: "María checks the customer's device swap eligibility on the web portal",
        pillar: "web",
        messages: {
          english: [
            { sender: "agent", text: "Device Swap Eligibility Check" },
            { sender: "agent", text: "Account: #45678" },
            { sender: "agent", text: "Current Device: iPhone 12" },
            { sender: "agent", text: "Eligible for Upgrade: Yes" },
            { sender: "agent", text: "Trade-in Value: $200" },
            { sender: "agent", text: "Status: Approved ✓" },
          ],
          translated: [
            { sender: "agent", text: "Verificación de Elegibilidad para Cambio de Dispositivo" },
            { sender: "agent", text: "Cuenta: #45678" },
            { sender: "agent", text: "Dispositivo Actual: iPhone 12" },
            { sender: "agent", text: "Elegible para Actualización: Sí" },
            { sender: "agent", text: "Valor de Entrega: $200" },
            { sender: "agent", text: "Estado: Aprobado ✓" },
          ],
        },
        culturalNote: "🇵🇷 Vocabulary Precision: Caribbean Spanish demonstrates regional preference with 'cambio' (change/swap) over the more formal 'intercambio' (exchange) used in other dialects. The term 'Valor de Entrega' for trade-in value is culturally adapted—while a literal translation would be 'valor de intercambio', Puerto Rican customers better understand 'entrega' (delivery/hand-over) in this context. Notice 'Actualización' (upgrade) instead of 'mejora', which aligns with how tech terminology is naturally adopted in Caribbean markets. These choices reduce cognitive load and build trust through familiar language patterns.",
        icon: Globe,
      },
      {
        id: "step3",
        title: "Coordinating with Technician",
        description: "María coordinates with field technician via live chat",
        pillar: "chat",
        messages: {
          english: [
            { sender: "agent", text: "Hi team, customer ready for device swap at 2 PM tomorrow" },
            { sender: "customer", text: "Got it! Address is 123 Main St, San Juan. What device?" },
            { sender: "agent", text: "iPhone 12 to iPhone 14. Trade-in approved for $200" },
            { sender: "customer", text: "Perfect. I have the device in stock. See you tomorrow!" },
          ],
          translated: [
            { sender: "agent", text: "Hola equipo, cliente listo para cambio de dispositivo a las 2 PM mañana" },
            { sender: "customer", text: "¡Entendido! La dirección es 123 Main St, San Juan. ¿Qué dispositivo?" },
            { sender: "agent", text: "iPhone 12 a iPhone 14. Entrega aprobada por $200" },
            { sender: "customer", text: "Perfecto. Tengo el dispositivo en inventario. ¡Nos vemos mañana!" },
          ],
        },
        culturalNote: "🇵🇷 Professional Communication Style: The response '¡Entendido!' (Understood!) is distinctly Puerto Rican professional jargon—more common than Mexico's 'Entendido' or Colombia's 'Vale'. Time expressions use 'a las 2 PM' (at 2 PM) which is standard across Spanish but the preposition 'a' is never omitted in Caribbean speech. 'Nos vemos mañana' (see you tomorrow) uses the reflexive 'nos' creating a collaborative tone appropriate for team coordination. The exclamation marks reflect Caribbean communication style which tends to be warmer and more expressive than other Spanish-speaking regions, even in professional contexts.",
        icon: MessageSquare,
      },
      {
        id: "step4",
        title: "Confirming Promo Eligibility",
        description: "María reviews promotional offer documentation",
        pillar: "documents",
        messages: {
          english: [
            { sender: "agent", text: "PROMOTIONAL OFFER CONFIRMATION" },
            { sender: "agent", text: "Trade-in Credit: $200" },
            { sender: "agent", text: "Applied to Account: #45678" },
            { sender: "agent", text: "New Device: iPhone 14 Pro" },
            { sender: "agent", text: "Monthly Payment: $25/month (24 months)" },
            { sender: "agent", text: "Activation Fee: Waived" },
          ],
          translated: [
            { sender: "agent", text: "CONFIRMACIÓN DE OFERTA PROMOCIONAL" },
            { sender: "agent", text: "Crédito por Entrega: $200" },
            { sender: "agent", text: "Aplicado a la Cuenta: #45678" },
            { sender: "agent", text: "Nuevo Dispositivo: iPhone 14 Pro" },
            { sender: "agent", text: "Pago Mensual: $25/mes (24 meses)" },
            { sender: "agent", text: "Cargo de Activación: Exonerado" },
          ],
        },
        culturalNote: "'Entrega' is preferred for trade-in in Puerto Rican business Spanish. 'Exonerado' (waived) is more formal than 'gratis'.",
        icon: FileText,
      },
      {
        id: "step5",
        title: "Service Completion",
        description: "María sends service completion confirmation email",
        pillar: "email",
        messages: {
          english: [
            { sender: "agent", text: "Dear Customer," },
            { sender: "agent", text: "Your device swap has been completed successfully!" },
            { sender: "agent", text: "Your new iPhone 14 Pro is now activated and ready to use." },
            { sender: "agent", text: "Trade-in credit of $200 has been applied to your account." },
            { sender: "agent", text: "Thank you for choosing Verizon!" },
          ],
          translated: [
            { sender: "agent", text: "Estimado Cliente," },
            { sender: "agent", text: "¡Su cambio de dispositivo se ha completado exitosamente!" },
            { sender: "agent", text: "Su nuevo iPhone 14 Pro ya está activado y listo para usar." },
            { sender: "agent", text: "El crédito por entrega de $200 ha sido aplicado a su cuenta." },
            { sender: "agent", text: "¡Gracias por elegir Verizon!" },
          ],
        },
        culturalNote: "Puerto Rican Spanish prefers 'exitosamente' over 'con éxito'. 'Estimado' maintains professional formality.",
        icon: CheckCircle2,
      },
    ],
    carlos: [
      {
        id: "step1",
        title: "Initial Outreach Call",
        description: "Carlos receives a sales call about business phone plans",
        pillar: "ivr",
        messages: {
          english: [
            { sender: "agent", text: "Hello, this is Sarah from Verizon Business. Am I speaking with Carlos?" },
            { sender: "customer", text: "Yes, this is Carlos. How can I help you?" },
            { sender: "agent", text: "I'm calling about our new small business phone plans. Do you currently have business phone service?" },
            { sender: "customer", text: "Yes, but I'm looking for better rates. What do you offer?" },
            { sender: "agent", text: "We have a 5-line business plan for $150/month with unlimited talk, text, and 50GB data per line. Would you like to hear more?" },
            { sender: "customer", text: "That sounds interesting. Can you send me more information?" },
          ],
          translated: [
            { sender: "agent", text: "Hola, soy Sarah de Verizon Business. ¿Hablo con Carlos?" },
            { sender: "customer", text: "Sí, soy Carlos. ¿En qué puedo ayudarle?" },
            { sender: "agent", text: "Le llamo sobre nuestros nuevos planes telefónicos para pequeñas empresas. ¿Actualmente tiene servicio telefónico empresarial?" },
            { sender: "customer", text: "Sí, pero estoy buscando mejores tarifas. ¿Qué ofrecen?" },
            { sender: "agent", text: "Tenemos un plan empresarial de 5 líneas por $150/mes con llamadas, mensajes ilimitados y 50GB de datos por línea. ¿Le gustaría saber más?" },
            { sender: "customer", text: "Suena interesante. ¿Puede enviarme más información?" },
          ],
        },
        culturalNote: "🇲🇽 Mexican Spanish Business Formality: The use of 'pequeñas empresas' instead of 'PYMES' reflects customer-facing language preferences in Mexico. The formal 'usted' form ('puede enviarme') maintains professional distance while 'Le gustaría' (would you like) is more polite than 'Quiere'. Mexican business culture values this respectful formality in initial sales contacts.",
        icon: Phone,
      },
      {
        id: "step2",
        title: "Needs Analysis Discussion",
        description: "Sales agent conducts needs analysis via chat",
        pillar: "chat",
        messages: {
          english: [
            { sender: "agent", text: "Hi Carlos! Thanks for your interest. Let me ask a few questions to find the best plan for you." },
            { sender: "customer", text: "Sure, go ahead." },
            { sender: "agent", text: "How many employees need phone service?" },
            { sender: "customer", text: "I have 5 employees right now, but planning to hire 2 more soon." },
            { sender: "agent", text: "Great! Do they need international calling?" },
            { sender: "customer", text: "Yes, we call Mexico frequently for suppliers." },
            { sender: "agent", text: "Perfect. Our business plan includes unlimited calls to Mexico. Let me prepare a custom quote for 7 lines." },
          ],
          translated: [
            { sender: "agent", text: "¡Hola Carlos! Gracias por su interés. Permítame hacerle algunas preguntas para encontrar el mejor plan para usted." },
            { sender: "customer", text: "Claro, adelante." },
            { sender: "agent", text: "¿Cuántos empleados necesitan servicio telefónico?" },
            { sender: "customer", text: "Tengo 5 empleados ahora, pero planeo contratar 2 más pronto." },
            { sender: "agent", text: "¡Excelente! ¿Necesitan llamadas internacionales?" },
            { sender: "customer", text: "Sí, llamamos a México frecuentemente para proveedores." },
            { sender: "agent", text: "Perfecto. Nuestro plan empresarial incluye llamadas ilimitadas a México. Permítame preparar una cotización personalizada para 7 líneas." },
          ],
        },
        culturalNote: "🇲🇽 Mexican Business Terminology: 'Cotización' is the standard term for quote in Mexican business Spanish, preferred over 'presupuesto'. 'Proveedores' (suppliers) is universal but the context of Mexico-US business relationships is culturally relevant. 'Planeo contratar' uses the first-person singular which is more direct than the conditional 'planearía', reflecting Mexican business communication style.",
        icon: MessageSquare,
      },
      {
        id: "step3",
        title: "Receiving Quote via Email",
        description: "Carlos receives a customized quote for his business",
        pillar: "email",
        messages: {
          english: [
            { sender: "agent", text: "Dear Carlos," },
            { sender: "agent", text: "Thank you for your interest in Verizon Business!" },
            { sender: "agent", text: "Your Customized Quote for 5 Business Lines:" },
            { sender: "agent", text: "Monthly Service: $150/month" },
            { sender: "agent", text: "Activation (one-time): $0 (waived)" },
            { sender: "agent", text: "Number Porting: Included" },
            { sender: "agent", text: "This quote is valid for 30 days." },
          ],
          translated: [
            { sender: "agent", text: "Estimado Carlos," },
            { sender: "agent", text: "¡Gracias por su interés en Verizon Business!" },
            { sender: "agent", text: "Su Cotización Personalizada para 5 Líneas Empresariales:" },
            { sender: "agent", text: "Servicio Mensual: $150/mes" },
            { sender: "agent", text: "Activación (única vez): $0 (exonerado)" },
            { sender: "agent", text: "Portabilidad de Números: Incluida" },
            { sender: "agent", text: "Esta cotización es válida por 30 días." },
          ],
        },
        culturalNote: "Mexican Spanish prefers 'cotización' over 'presupuesto' for business quotes. 'Portabilidad' is the standard term for number porting.",
        icon: Mail,
      },
      {
        id: "step4",
        title: "Calling Sales Support",
        description: "Carlos calls to clarify pricing details via IVR",
        pillar: "ivr",
        messages: {
          english: [
            { sender: "agent", text: "Thank you for calling Verizon Business" },
            { sender: "agent", text: "Press 1 for Sales" },
            { sender: "agent", text: "Press 2 for Technical Support" },
            { sender: "agent", text: "Press 3 for Billing" },
            { sender: "agent", text: "Press 0 to speak with an operator" },
          ],
          translated: [
            { sender: "agent", text: "Gracias por llamar a Verizon Business" },
            { sender: "agent", text: "Presione 1 para Ventas" },
            { sender: "agent", text: "Presione 2 para Soporte Técnico" },
            { sender: "agent", text: "Presione 3 para Facturación" },
            { sender: "agent", text: "Presione 0 para hablar con un operador" },
          ],
        },
        culturalNote: "Mexican Spanish uses 'presione' (formal command) in IVR systems. 'Facturación' is standard for billing.",
        icon: Phone,
      },
      {
        id: "step5",
        title: "Reviewing Contract",
        description: "Carlos reviews the service agreement document",
        pillar: "documents",
        messages: {
          english: [
            { sender: "agent", text: "BUSINESS SERVICE AGREEMENT" },
            { sender: "agent", text: "Contract Term: 24 Months" },
            { sender: "agent", text: "Monthly Rate: $150 (5 lines)" },
            { sender: "agent", text: "Early Termination Fee: $175 per line" },
            { sender: "agent", text: "Auto-renewal: Yes, month-to-month after term" },
            { sender: "agent", text: "By signing, you agree to these terms" },
          ],
          translated: [
            { sender: "agent", text: "CONTRATO DE SERVICIO EMPRESARIAL" },
            { sender: "agent", text: "Plazo del Contrato: 24 Meses" },
            { sender: "agent", text: "Tarifa Mensual: $150 (5 líneas)" },
            { sender: "agent", text: "Cargo por Terminación Anticipada: $175 por línea" },
            { sender: "agent", text: "Renovación Automática: Sí, mes a mes después del plazo" },
            { sender: "agent", text: "Al firmar, usted acepta estos términos" },
          ],
        },
        culturalNote: "Mexican Spanish uses 'plazo' for 'term' in legal/business documents. 'Cargo' is preferred over 'multa' for fees.",
        icon: FileText,
      },
    ],
    lucia: [
      {
        id: "step1",
        title: "Receiving Fraud Alert",
        description: "Lucía receives an automated fraud alert email",
        pillar: "email",
        messages: {
          english: [
            { sender: "agent", text: "SECURITY ALERT" },
            { sender: "agent", text: "Unusual activity detected on account #12345" },
            { sender: "agent", text: "Multiple login attempts from unknown location" },
            { sender: "agent", text: "We've temporarily locked your account for protection" },
            { sender: "agent", text: "Please contact us immediately to verify your identity" },
          ],
          translated: [
            { sender: "agent", text: "ALERTA DE SEGURIDAD" },
            { sender: "agent", text: "Actividad inusual detectada en la cuenta #12345" },
            { sender: "agent", text: "Múltiples intentos de acceso desde ubicación desconocida" },
            { sender: "agent", text: "Hemos bloqueado temporalmente su cuenta para protección" },
            { sender: "agent", text: "Por favor contáctenos inmediatamente para verificar su identidad" },
          ],
        },
        culturalNote: "Colombian Spanish uses 'inusual' rather than 'extraña' for unusual in formal contexts. 'Bloquear' is standard for lock/block.",
        icon: Mail,
      },
      {
        id: "step2",
        title: "Opening Support Case",
        description: "Lucía opens a support case via web portal",
        pillar: "web",
        messages: {
          english: [
            { sender: "agent", text: "CREATE NEW SUPPORT CASE" },
            { sender: "agent", text: "Issue Type: Account Security" },
            { sender: "agent", text: "Priority: High" },
            { sender: "agent", text: "Description: Fraud alert - need to unlock account" },
            { sender: "agent", text: "Case #SEC-7890 has been created" },
            { sender: "agent", text: "Estimated response time: 15 minutes" },
          ],
          translated: [
            { sender: "agent", text: "CREAR NUEVO CASO DE SOPORTE" },
            { sender: "agent", text: "Tipo de Problema: Seguridad de Cuenta" },
            { sender: "agent", text: "Prioridad: Alta" },
            { sender: "agent", text: "Descripción: Alerta de fraude - necesito desbloquear cuenta" },
            { sender: "agent", text: "Se ha creado el caso #SEC-7890" },
            { sender: "agent", text: "Tiempo estimado de respuesta: 15 minutos" },
          ],
        },
        culturalNote: "Colombian Spanish prefers 'caso' over 'ticket' for support cases. 'Desbloquear' is the standard term for unlock.",
        icon: Globe,
      },
      {
        id: "step3",
        title: "Live Chat with Security Team",
        description: "Lucía chats with security team about the fraud alert",
        pillar: "chat",
        messages: {
          english: [
            { sender: "agent", text: "Hello Lucía, I'm here to help with your security concern" },
            { sender: "customer", text: "Thank you. I received a fraud alert and my account is locked" },
            { sender: "agent", text: "I understand. Let me verify your identity first. Can you confirm your date of birth?" },
            { sender: "customer", text: "March 15, 1985" },
            { sender: "agent", text: "Thank you. I've verified your identity and unlocked your account. Please change your password immediately." },
          ],
          translated: [
            { sender: "agent", text: "Hola Lucía, estoy aquí para ayudarle con su preocupación de seguridad" },
            { sender: "customer", text: "Gracias. Recibí una alerta de fraude y mi cuenta está bloqueada" },
            { sender: "agent", text: "Entiendo. Permítame verificar su identidad primero. ¿Puede confirmar su fecha de nacimiento?" },
            { sender: "customer", text: "15 de marzo de 1985" },
            { sender: "agent", text: "Gracias. He verificado su identidad y desbloqueado su cuenta. Por favor cambie su contraseña inmediatamente." },
          ],
        },
        culturalNote: "Colombian Spanish uses 'permítame' for 'let me' in formal customer service. Date format uses 'de' between day and month.",
        icon: MessageSquare,
      },
      {
        id: "step4",
        title: "Verifying Account Security",
        description: "Lucía verifies security questions via phone IVR",
        pillar: "ivr",
        messages: {
          english: [
            { sender: "agent", text: "Welcome to Verizon Security Verification" },
            { sender: "agent", text: "Please verify your identity" },
            { sender: "agent", text: "Enter your 4-digit PIN followed by the pound key" },
            { sender: "agent", text: "Thank you. Your identity has been verified" },
            { sender: "agent", text: "Connecting you to a security specialist" },
          ],
          translated: [
            { sender: "agent", text: "Bienvenido a la Verificación de Seguridad de Verizon" },
            { sender: "agent", text: "Por favor verifique su identidad" },
            { sender: "agent", text: "Ingrese su PIN de 4 dígitos seguido de la tecla numeral" },
            { sender: "agent", text: "Gracias. Su identidad ha sido verificada" },
            { sender: "agent", text: "Conectándole con un especialista en seguridad" },
          ],
        },
        culturalNote: "Colombian Spanish uses 'verifique' (subjunctive) after 'por favor' for polite requests. 'Tecla numeral' is standard for pound key.",
        icon: Phone,
      },
      {
        id: "step5",
        title: "Receiving Resolution Confirmation",
        description: "Lucía receives confirmation that the issue is resolved",
        pillar: "email",
        messages: {
          english: [
            { sender: "agent", text: "Dear Lucía," },
            { sender: "agent", text: "Your account has been secured and reactivated" },
            { sender: "agent", text: "Case #SEC-7890 has been resolved" },
            { sender: "agent", text: "We recommend enabling two-factor authentication" },
            { sender: "agent", text: "Thank you for your prompt response to this security matter" },
          ],
          translated: [
            { sender: "agent", text: "Estimada Lucía," },
            { sender: "agent", text: "Su cuenta ha sido asegurada y reactivada" },
            { sender: "agent", text: "El caso #SEC-7890 ha sido resuelto" },
            { sender: "agent", text: "Recomendamos activar la autenticación de dos factores" },
            { sender: "agent", text: "Gracias por su pronta respuesta a este asunto de seguridad" },
          ],
        },
        culturalNote: "Colombian Spanish prefers 'asegurada' over 'protegida' for secured. 'Pronta' is more formal than 'rápida' for prompt.",
        icon: CheckCircle2,
      },
    ],
    diego: [
      {
        id: "step1",
        title: "Bulk Device Order Request",
        description: "Diego submits a bulk device order for field workers",
        pillar: "web",
        messages: {
          english: [
            { sender: "agent", text: "BULK DEVICE ORDER" },
            { sender: "agent", text: "Order 50 devices for your team" },
            { sender: "agent", text: "Device: Samsung Galaxy S23" },
            { sender: "agent", text: "Quantity: 50 units" },
            { sender: "agent", text: "Estimated delivery: 5-7 business days" },
            { sender: "agent", text: "Total: $15,000 (bulk discount applied)" },
          ],
          translated: [
            { sender: "agent", text: "PEDIDO MASIVO DE DISPOSITIVOS" },
            { sender: "agent", text: "Ordenar 50 dispositivos para su equipo" },
            { sender: "agent", text: "Dispositivo: Samsung Galaxy S23" },
            { sender: "agent", text: "Cantidad: 50 unidades" },
            { sender: "agent", text: "Entrega estimada: 5-7 días hábiles" },
            { sender: "agent", text: "Total: $15,000 (descuento por volumen aplicado)" },
          ],
        },
        culturalNote: "US Spanish uses 'ordenar' (to order) rather than 'pedir' in business contexts. 'Pedido masivo' is standard for bulk order.",
        icon: Globe,
      },
      {
        id: "step2",
        title: "Reviewing Fleet Management Options",
        description: "Diego reviews fleet management features in documentation",
        pillar: "documents",
        messages: {
          english: [
            { sender: "agent", text: "FLEET MANAGEMENT DASHBOARD" },
            { sender: "agent", text: "Track all devices in real-time" },
            { sender: "agent", text: "Monitor data usage across fleet" },
            { sender: "agent", text: "Remote device management" },
            { sender: "agent", text: "Usage reports and analytics" },
            { sender: "agent", text: "Bulk configuration and updates" },
          ],
          translated: [
            { sender: "agent", text: "PANEL DE GESTIÓN DE FLOTA" },
            { sender: "agent", text: "Rastrear todos los dispositivos en tiempo real" },
            { sender: "agent", text: "Monitorear uso de datos en toda la flota" },
            { sender: "agent", text: "Gestión remota de dispositivos" },
            { sender: "agent", text: "Reportes de uso y analíticas" },
            { sender: "agent", text: "Configuración y actualizaciones masivas" },
          ],
        },
        culturalNote: "US Spanish uses 'rastrear' for 'track' in technical contexts. 'Analíticas' is the standard term for analytics.",
        icon: FileText,
      },
      {
        id: "step3",
        title: "Coordinating with Field Workers",
        description: "Diego sends instructions to field workers via group chat",
        pillar: "chat",
        messages: {
          english: [
            { sender: "agent", text: "Team update: New devices arriving next week" },
            { sender: "customer", text: "Great! When exactly?" },
            { sender: "agent", text: "Tuesday, March 21st. Each of you will get a Samsung Galaxy S23" },
            { sender: "customer", text: "Do we need to return our old phones?" },
            { sender: "agent", text: "Yes, please bring them to the office on Tuesday for trade-in credit" },
          ],
          translated: [
            { sender: "agent", text: "Actualización del equipo: Nuevos dispositivos llegarán la próxima semana" },
            { sender: "customer", text: "¡Excelente! ¿Cuándo exactamente?" },
            { sender: "agent", text: "Martes, 21 de marzo. Cada uno recibirá un Samsung Galaxy S23" },
            { sender: "customer", text: "¿Necesitamos devolver nuestros teléfonos viejos?" },
            { sender: "agent", text: "Sí, por favor tráiganlos a la oficina el martes para crédito por entrega" },
          ],
        },
        culturalNote: "US Spanish maintains formal business communication but uses 'tráiganlos' (informal plural command) for team settings.",
        icon: MessageSquare,
      },
      {
        id: "step4",
        title: "Setting Up Device Provisioning",
        description: "Diego calls support to set up automated device provisioning",
        pillar: "ivr",
        messages: {
          english: [
            { sender: "agent", text: "Welcome to Verizon Enterprise Support" },
            { sender: "agent", text: "Press 1 for Fleet Management" },
            { sender: "agent", text: "Press 2 for Device Provisioning" },
            { sender: "agent", text: "Press 3 for Technical Support" },
            { sender: "agent", text: "Connecting you to Device Provisioning..." },
          ],
          translated: [
            { sender: "agent", text: "Bienvenido al Soporte Empresarial de Verizon" },
            { sender: "agent", text: "Presione 1 para Gestión de Flota" },
            { sender: "agent", text: "Presione 2 para Aprovisionamiento de Dispositivos" },
            { sender: "agent", text: "Presione 3 para Soporte Técnico" },
            { sender: "agent", text: "Conectándole con Aprovisionamiento de Dispositivos..." },
          ],
        },
        culturalNote: "US Spanish uses 'aprovisionamiento' for provisioning in technical contexts. Maintains formal 'presione' in IVR.",
        icon: Phone,
      },
      {
        id: "step5",
        title: "Confirming Deployment Complete",
        description: "Diego receives confirmation email that all devices are deployed",
        pillar: "email",
        messages: {
          english: [
            { sender: "agent", text: "Dear Diego," },
            { sender: "agent", text: "Your fleet deployment is complete!" },
            { sender: "agent", text: "50 devices have been activated and configured" },
            { sender: "agent", text: "All field workers now have access to the fleet management app" },
            { sender: "agent", text: "Thank you for choosing Verizon Enterprise Solutions" },
          ],
          translated: [
            { sender: "agent", text: "Estimado Diego," },
            { sender: "agent", text: "¡Su despliegue de flota está completo!" },
            { sender: "agent", text: "50 dispositivos han sido activados y configurados" },
            { sender: "agent", text: "Todos los trabajadores de campo ahora tienen acceso a la app de gestión de flota" },
            { sender: "agent", text: "Gracias por elegir Verizon Enterprise Solutions" },
          ],
        },
        culturalNote: "US Spanish uses 'despliegue' for deployment in enterprise contexts. 'Trabajadores de campo' is standard for field workers.",
        icon: CheckCircle2,
      },
    ],
  };

  const steps = journeySteps[personaId] || [];
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const PillarIcon = step?.icon || FileText;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/personas")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Personas
          </Button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">{persona.avatar}</span>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-foreground">
                  {persona.name}'s Journey
                </h1>
                <p className="text-muted-foreground">
                  {persona.dialectLabel} • {persona.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* R2B Journey Map */}
        <Card className="mb-8 bg-white shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-red-600" />
              Ready-to-Buy Journey Map
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Highlighted stages show where {persona.name}'s customer interactions occur
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-3">
              {/* Journey Stages */}
              <div className="flex items-center gap-4 overflow-x-auto pb-2">
                {journeyData.stages.map((stage, index) => {
                  const mapping = personaJourneyMappings[personaId as keyof typeof personaJourneyMappings];
                  const isActive = mapping?.activeStages?.includes(stage.id) || 
                                   (stage.id === 'support' && mapping?.activeStages?.includes('service'));
                  
                  return (
                    <div key={stage.id} className="flex items-center flex-shrink-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative ${
                          isActive
                            ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg border-2 border-red-500'
                            : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                        } rounded-lg p-4 w-[180px] transition-all duration-300 hover:scale-105`}
                      >
                        <div className="text-center">
                          <div className={`text-xs font-semibold mb-1 ${
                            isActive ? 'text-red-100' : 'text-gray-500'
                          }`}>
                            Stage {index + 1}
                          </div>
                          <div className={`text-sm font-bold leading-tight ${
                            isActive ? 'text-white' : 'text-gray-400'
                          }`}>
                            {stage.name}
                          </div>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                            >
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                      {index < journeyData.stages.length - 1 && (
                        <ArrowRight className={`h-5 w-5 flex-shrink-0 mx-1 ${
                          isActive ? 'text-red-600' : 'text-gray-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-red-600 to-red-700 rounded border-2 border-red-500"></div>
                  <span>Active for {persona.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded border-2 border-gray-200"></div>
                  <span>Not applicable</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step && (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step Header */}
              <Card className="mb-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <PillarIcon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-1">
                        {step.title}
                      </CardTitle>
                      <p className="text-red-100">{step.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {step.pillar}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Dual Pane Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Customer View (Translated) */}
                <Card className="border-2 border-green-200 bg-green-50/30">
                  <CardHeader className="bg-green-100 border-b border-green-200">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-green-700" />
                      <CardTitle className="text-lg text-green-900">
                        Customer View ({persona.dialect})
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 min-h-[400px]">
                    {step.messages.translated.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex ${
                          msg.sender === "customer"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-3 ${
                            msg.sender === "customer"
                              ? "bg-green-600 text-white"
                              : "bg-white border border-green-200 text-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Agent View (English) */}
                <Card className="border-2 border-blue-200 bg-blue-50/30">
                  <CardHeader className="bg-blue-100 border-b border-blue-200">
                    <div className="flex items-center gap-2">
                      <Headphones className="h-5 w-5 text-blue-700" />
                      <CardTitle className="text-lg text-blue-900">
                        Agent View (English)
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 min-h-[400px]">
                    {step.messages.english.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex ${
                          msg.sender === "customer"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-3 ${
                            msg.sender === "customer"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-blue-200 text-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Cultural Insight */}
              <Card className="mb-6 bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg mt-0.5">
                      <MessageSquare className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">
                        Cultural Insight
                      </h3>
                      <p className="text-blue-800 text-sm">
                        {step.culturalNote}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

