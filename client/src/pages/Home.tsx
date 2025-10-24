import { ArrowRight, CheckCircle2, Globe, MessageSquare, PhoneCall, Zap, Target, Shield, Map, Briefcase, BookOpen, TrendingUp, Sparkles } from "lucide-react";
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
              Verizon Multilingual
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Customer Experience Demo
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Experience how dialect-specific Spanish translation transforms customer engagement across the entire R2B journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/journey">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl">
                  Explore Customer Journey
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
              <span className="text-3xl font-bold text-green-700">Comprehensive Coverage</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multilingual Translation Across the R2B Journey
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              From outbound prospecting to post-sales support, our culturally-aware translation solution covers the entire customer lifecycle with dialect-specific Spanish for Mexican, Caribbean (Puerto Rican), Colombian, and US Hispanic markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore the Demo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Navigate through executive insights and interactive customer experience demonstrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              { 
                icon: Briefcase, 
                title: "Executive Summary", 
                desc: "Market opportunity, competitive analysis, and strategic recommendations for Verizon's multilingual CX initiative", 
                href: "/executive-intro", 
                gradient: "from-purple-500 to-purple-600",
                category: "Executive Insights"
              },
              { 
                icon: BookOpen, 
                title: "Research Sources", 
                desc: "Comprehensive research methodology and data sources including Verizon, AT&T, and T-Mobile analysis", 
                href: "/research-sources", 
                gradient: "from-blue-500 to-blue-600",
                category: "Executive Insights"
              },
              { 
                icon: Map, 
                title: "Customer Journey", 
                desc: "Interactive R2B journey map with personas, touchpoints, and full coverage activities across all stages", 
                href: "/journey", 
                gradient: "from-green-500 to-green-600",
                category: "Demo Experience"
              },
              { 
                icon: Sparkles, 
                title: "Experience Modules", 
                desc: "Live demonstrations of multilingual experiences across web, chat, email, IVR, and documents", 
                href: "/experiences", 
                gradient: "from-orange-500 to-orange-600",
                category: "Demo Experience"
              },
              { 
                icon: MessageSquare, 
                title: "Feedback", 
                desc: "Share your thoughts and insights about the multilingual customer experience demonstration", 
                href: "/feedback", 
                gradient: "from-teal-500 to-teal-600",
                category: "Demo Experience"
              },
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <Card className="p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-blue-400 bg-white group h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{item.category}</span>
                    </div>
                    <div className={`bg-gradient-to-br ${item.gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Personas Preview */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Customer Personas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four distinct personas representing different Spanish dialects and business needs across the US market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Carlos", role: "SMB Retail Owner", location: "Los Angeles, CA", dialect: "Mexican Spanish", emoji: "👨‍💼", color: "blue" },
              { name: "María", role: "Field Services Manager", location: "Miami, FL", dialect: "Caribbean Spanish", color: "purple", emoji: "👩‍💼" },
              { name: "Lucía", role: "Healthcare Administrator", location: "Queens, NY", dialect: "Colombian Spanish", color: "green", emoji: "👩‍⚕️" },
              { name: "Diego", role: "Construction Manager", location: "US Southwest", dialect: "US Spanish", color: "orange", emoji: "👷" },
            ].map((persona, index) => (
              <motion.div
                key={persona.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-6 border-2 border-${persona.color}-200 bg-gradient-to-br from-${persona.color}-50 to-white hover:shadow-xl transition-all`}>
                  <div className="text-center">
                    <div className="text-5xl mb-3">{persona.emoji}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{persona.name}</h3>
                    <p className="text-sm font-medium text-gray-600 mb-2">{persona.role}</p>
                    <p className="text-xs text-gray-500 mb-3">{persona.location}</p>
                    <div className={`inline-block px-3 py-1 bg-${persona.color}-100 text-${persona.color}-700 text-xs font-semibold rounded-full`}>
                      {persona.dialect}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/journey">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                View Full Journey Map
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Dialect-Specific Translation */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Dialect-Specific Translation Matters
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
                desc: "Mexican Spanish differs from Puerto Rican and Colombian Spanish. We match dialect to customer origin for authentic communication that resonates with cultural context.",
                gradient: "from-blue-500 to-purple-500"
              },
              {
                icon: Zap,
                title: "Real-Time Translation",
                desc: "Instant translation across web, chat, email, IVR, and documents with context-aware accuracy across all customer touchpoints.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Competitive Advantage",
                desc: "No major telecom offers dialect-specific translation. First-mover advantage creates significant market differentiation and customer loyalty.",
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
              Ready to Explore the Full Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Dive into the interactive demo to see how dialect-specific translation transforms every touchpoint of the customer journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/journey">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl">
                  Start Journey Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/experiences">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  Try Live Experiences
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

