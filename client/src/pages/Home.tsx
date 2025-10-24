import { ArrowRight, CheckCircle2, Globe, MessageSquare, PhoneCall, Zap, Target, Shield, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Culturally Aware
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Multilingual CX
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Experience how dialect-specific Spanish translation transforms customer engagement across every touchpoint
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/journey">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl">
                  View Coverage Map
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/experiences">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  Explore Experiences
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Statement */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-full px-8 py-4 mb-6 shadow-lg">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <span className="text-3xl font-bold text-green-700">90% Coverage</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Translation Across the Customer Journey
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              From outbound prospecting to post-sales support, our culturally-aware translation solution covers 90% of customer interactions with dialect-specific Spanish for Mexican, Puerto Rican, Colombian, and US Hispanic markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Modules */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Multilingual Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See real-time translation in action across every customer touchpoint
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Globe, title: "Web", desc: "Bilingual website with dynamic content translation", href: "/experiences/web", gradient: "from-blue-500 to-blue-600" },
              { icon: MessageSquare, title: "Email", desc: "Automated email translation with cultural nuances", href: "/experiences/email", gradient: "from-purple-500 to-purple-600" },
              { icon: MessageSquare, title: "Chat", desc: "Real-time dual-pane chat translation", href: "/experiences/chat", gradient: "from-green-500 to-green-600" },
              { icon: PhoneCall, title: "IVR", desc: "Voice-enabled multilingual phone system", href: "/experiences/ivr", gradient: "from-orange-500 to-orange-600" },
              { icon: Globe, title: "Documents", desc: "Translated contracts and legal documents", href: "/experiences/documents", gradient: "from-red-500 to-red-600" },
              { icon: Globe, title: "Field Services", desc: "Mobile translation for field technicians", href: "/experiences/field", gradient: "from-teal-500 to-teal-600" },
            ].map((module, index) => (
              <motion.div
                key={module.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={module.href}>
                  <Card className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-blue-400 bg-white group h-full">
                    <div className={`bg-gradient-to-br ${module.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <module.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-gray-600">{module.desc}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invictus Wins */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Dialect-Specific Translation Wins
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generic Spanish translation misses cultural nuances. Dialect-specific translation creates authentic connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: "Cultural Precision",
                desc: "Mexican Spanish differs from Puerto Rican Spanish. We match dialect to customer origin for authentic communication.",
                gradient: "from-blue-500 to-purple-500"
              },
              {
                icon: Zap,
                title: "Real-Time Translation",
                desc: "Instant translation across web, chat, email, and voice channels with context-aware accuracy.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Competitive Moat",
                desc: "No major telecom offers dialect-specific translation. First-mover advantage creates 12-18 month lead.",
                gradient: "from-pink-500 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="p-8 border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl bg-gradient-to-br from-white to-gray-50 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Explore our demo to see how dialect-specific translation creates authentic connections with Hispanic customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/translation-demo">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl">
                  Try Translation Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/executive-intro">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  View Executive Summary
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

