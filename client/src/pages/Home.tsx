import { ArrowRight, CheckCircle2, Globe, MessageSquare, PhoneCall, XCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-image.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Culturally Aware
              <span className="block text-[#E60000]">Multilingual CX</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Experience how dialect-specific Spanish translation transforms customer engagement across every touchpoint
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/personas">
                <Button size="lg" className="bg-[#E60000] hover:bg-[#CC0000] text-white text-lg px-8 py-6">
                  Explore Personas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/journey">
                <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-6">
                  View Coverage Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Statement */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-6 py-3 mb-6">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <span className="text-2xl font-bold text-green-700">90% Coverage</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Translation Across the R2B Journey
            </h2>
            <p className="text-lg text-gray-600">
              From outbound prospecting to post-sales support, our culturally-aware translation solution covers 90% of customer interactions with dialect-specific Spanish for Mexican, Puerto Rican, Colombian, and US Hispanic markets.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Modules */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multilingual Experiences
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See real-time translation in action across every customer touchpoint
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Globe, title: "Web", desc: "Bilingual website with dynamic content translation", href: "/experiences/web", color: "bg-blue-500" },
              { icon: MessageSquare, title: "Email", desc: "Automated email translation with cultural nuances", href: "/experiences/email", color: "bg-purple-500" },
              { icon: MessageSquare, title: "Chat", desc: "Real-time dual-pane chat translation", href: "/experiences/chat", color: "bg-green-500" },
              { icon: PhoneCall, title: "IVR", desc: "Voice-enabled multilingual phone system", href: "/experiences/ivr", color: "bg-orange-500" },
              { icon: Globe, title: "Documents", desc: "Translated contracts and legal documents", href: "/experiences/documents", color: "bg-red-500" },
              { icon: Globe, title: "Field Services", desc: "Mobile translation for field technicians", href: "/experiences/field", color: "bg-teal-500" },
            ].map((module) => (
              <Link key={module.href} href={module.href}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-[#E60000] bg-white group">
                  <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600">{module.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invictus Wins */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Invictus Wins
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding dialectical differences makes the difference between winning or losing business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Invictus - Culturally Aware */}
            <Card className="p-8 border-2 border-green-500 bg-green-50">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Invictus: Culturally Aware</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Dialect-specific translations (ES-MX, ES-PR, ES-CO, ES-US)",
                  "Cultural context and regional preferences",
                  "Formal/informal register awareness",
                  "Local terminology and expressions",
                  "Example: 'la computadora' (MX) vs 'el ordenador' (ES)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <p className="text-sm font-semibold text-green-700 mb-2">Result:</p>
                <p className="text-gray-700">Builds trust, increases conversion, reduces churn</p>
              </div>
            </Card>

            {/* Competitors - Generic Approach */}
            <Card className="p-8 border-2 border-red-500 bg-red-50">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="h-8 w-8 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">Competitors: "Spanish is Spanish"</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "One-size-fits-all Spanish translation",
                  "No cultural or regional adaptation",
                  "Generic formal tone regardless of context",
                  "Misses local terminology nuances",
                  "Uses Spain Spanish for Latin American customers",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white rounded-lg border border-red-200">
                <p className="text-sm font-semibold text-red-700 mb-2">Result:</p>
                <p className="text-gray-700">Feels impersonal, lower engagement, lost opportunities</p>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg">
              <p className="text-lg font-semibold">
                Understanding dialectical differences makes the difference between an opportunity being won or lost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Multilingual CX?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Explore our persona-based journeys to see how dialect-specific translation drives better customer outcomes
            </p>
            <Link href="/personas">
              <Button size="lg" className="bg-[#E60000] hover:bg-[#CC0000] text-white text-lg px-8 py-6">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

