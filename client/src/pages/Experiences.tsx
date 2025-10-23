import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MessageSquare, FileText, Phone, Mail, MapPin, ArrowRight, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Experiences() {
  const experiences = [
    {
      icon: Globe,
      title: "Website Translation",
      description: "Public and authenticated site translation with dialect support",
      href: "/experiences/web",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverBg: "hover:bg-blue-100",
    },
    {
      icon: Mail,
      title: "Email Viewer",
      description: "Inbound and outbound email translation with dual-pane view",
      href: "/experiences/email",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverBg: "hover:bg-purple-100",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Real-time chat translation with sentiment analysis",
      href: "/experiences/chat",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverBg: "hover:bg-green-100",
    },
    {
      icon: Phone,
      title: "IVR & Voice",
      description: "Speech-to-speech translation for phone interactions",
      href: "/experiences/ivr",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      hoverBg: "hover:bg-orange-100",
    },
    {
      icon: FileText,
      title: "Document Translation",
      description: "Upload and translate documents with bilingual preview",
      href: "/experiences/documents",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      hoverBg: "hover:bg-red-100",
    },
    {
      icon: MapPin,
      title: "Field Services",
      description: "In-store and field mobile translation support",
      href: "/experiences/field",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      hoverBg: "hover:bg-teal-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Layers className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Experience Modules</h1>
          </div>
          <p className="text-2xl text-blue-100 max-w-3xl mb-8">
            Explore how multilingual translation works across every customer touchpoint
          </p>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Layers className="w-6 h-6 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Experience Modules</div>
              </div>
              <div className="text-5xl font-bold">6</div>
              <div className="text-sm text-blue-200 mt-1">Interactive demonstrations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Channels Covered</div>
              </div>
              <div className="text-5xl font-bold">100%</div>
              <div className="text-sm text-blue-200 mt-1">Complete omnichannel coverage</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-6 h-6 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Real-Time Translation</div>
              </div>
              <div className="text-5xl font-bold">Yes</div>
              <div className="text-sm text-blue-200 mt-1">Instant dialect-specific translation</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Interactive Multilingual Demonstrations
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Each module showcases how dialect-specific translation works in a specific customer touchpoint. Experience the difference between generic translation and culturally-aware, dialect-specific communication that builds trust and drives conversion.
          </p>
          <p className="text-gray-600">
            Select any module below to explore interactive demonstrations with real examples, dual-pane views, and cultural insights.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={experience.href}>
                  <Card className={`h-full hover:shadow-xl transition-all cursor-pointer group border-2 ${experience.borderColor} ${experience.hoverBg}`}>
                    <CardHeader className={experience.bgColor}>
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`p-4 rounded-lg ${experience.bgColor} ${experience.color} group-hover:scale-110 transition-transform`}>
                          <Icon className="h-10 w-10" />
                        </div>
                        <CardTitle className="text-2xl text-gray-900">{experience.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <CardDescription className="text-base text-gray-700 mb-6 leading-relaxed">
                        {experience.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                        <span>Explore Module</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Educational Footer */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-md border-l-4 border-green-500">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            What to Expect in Each Module
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Interactive Demonstrations</h4>
              <p className="text-gray-600 text-sm">
                Each module includes hands-on demonstrations where you can experience the translation in action.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Dual-Pane Views</h4>
              <p className="text-gray-600 text-sm">
                See both the customer's translated experience and the agent's English view side-by-side.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Dialect-Specific Examples</h4>
              <p className="text-gray-600 text-sm">
                Compare how different Spanish dialects (Mexican, Caribbean, etc.) are handled appropriately.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cultural Insights</h4>
              <p className="text-gray-600 text-sm">
                Learn why specific translation choices matter and how they impact customer trust and conversion.
              </p>
            </div>
          </div>
        </div>

        {/* Channel Coverage Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Complete Omnichannel Coverage
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {experiences.map((exp) => {
              const Icon = exp.icon;
              return (
                <div key={exp.title} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <Icon className={`h-6 w-6 ${exp.color}`} />
                  <span className="font-medium text-gray-900">{exp.title.replace(' Translation', '').replace(' Viewer', '')}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

