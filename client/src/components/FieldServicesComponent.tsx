import { Wrench, MapPin, Clock, CheckCircle2, Users } from "lucide-react";

interface FieldServicesComponentProps {
  personaName: string;
}

export default function FieldServicesComponent({
  personaName,
}: FieldServicesComponentProps) {
  // Persona-specific field service scenarios
  const scenarios: Record<string, { location: string; issue: string; resolution: string; culturalNote: string }> = {
    carlos: {
      location: "Carlos's Retail Store - Mexico City",
      issue: "Internet connectivity down during peak business hours",
      resolution: "Technician arrives within 2 hours and restores connection with dialect-aware communication",
      culturalNote: "Agent uses respectful, formal Spanish appropriate for business owner context",
    },
    maria: {
      location: "Maria's Service Center - San Juan, Puerto Rico",
      issue: "Equipment installation for expanded service capacity",
      resolution: "Field team coordinates with Maria using Caribbean Spanish dialect for seamless collaboration",
      culturalNote: "Communication reflects Caribbean cultural norms and local business practices",
    },
    lucia: {
      location: "Lucia's Healthcare Clinic - Bogotá, Colombia",
      issue: "Critical system upgrade for patient data management",
      resolution: "Specialized healthcare technician installs with Colombian Spanish cultural awareness",
      culturalNote: "Respectful communication acknowledges healthcare sector importance and patient privacy concerns",
    },
    diego: {
      location: "Diego's Construction Site - Texas, USA",
      issue: "Mobile connectivity setup for remote job site",
      resolution: "Field technician deploys robust solution with US Spanish dialect support",
      culturalNote: "Direct, practical communication style suited for construction industry needs",
    },
  };

  const scenario = scenarios[personaName.toLowerCase()] || scenarios.carlos;

  return (
    <div className="p-8 overflow-y-auto max-h-[calc(100vh-400px)] bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Service Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-green-600" />
            Field Service Experience
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">{scenario.location}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Service Request:</p>
              <p className="text-gray-700">{scenario.issue}</p>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <p className="text-sm font-semibold text-green-700 mb-2">Dialect-Aware Resolution:</p>
              <p className="text-gray-700">{scenario.resolution}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <p className="text-sm font-semibold text-blue-700 mb-2">Cultural Insight:</p>
              <p className="text-gray-700">{scenario.culturalNote}</p>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Seamless Coordination</h3>
                <p className="text-sm text-gray-600">
                  Field technicians communicate in customer's dialect for smooth service delivery
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Cultural Respect</h3>
                <p className="text-sm text-gray-600">
                  Service approach respects local customs and business practices
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
                  Clear communication reduces misunderstandings and service time
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
                  Customers feel respected and understood by service teams
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Clock className="h-6 w-6 text-green-600" />
            Service Journey
          </h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Service Request", desc: "Customer initiates service request via phone or portal" },
              { step: 2, title: "Dialect Identification", desc: "System identifies customer dialect and service requirements" },
              { step: 3, title: "Technician Assignment", desc: "Technician briefed on dialect and cultural context" },
              { step: 4, title: "On-Site Service", desc: "Technician delivers service with culturally aware communication" },
              { step: 5, title: "Follow-Up", desc: "Dialect-appropriate follow-up ensures satisfaction" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  {item.step < 5 && <div className="w-1 h-12 bg-green-200 mt-2" />}
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Coordination */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Team Coordination
          </h2>
          <p className="text-gray-700 mb-4">
            Our field service teams are trained in dialect-specific communication and cultural awareness. This ensures that every interaction reflects respect for the customer's background and communication preferences.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ Technicians briefed on customer dialect and cultural context</li>
            <li>✓ Real-time translation support available if needed</li>
            <li>✓ Cultural sensitivity training for all field staff</li>
            <li>✓ Follow-up communication in customer's preferred dialect</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

