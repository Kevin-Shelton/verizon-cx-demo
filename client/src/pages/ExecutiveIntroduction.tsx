import { motion } from "framer-motion";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Rocket,
  Shield,
  Network,
  Heart,
  Handshake
} from "lucide-react";

export default function ExecutiveIntroduction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4">
              Multilingual CX Transformation
            </h1>
            <p className="text-2xl text-red-100 mb-8">
              Unlocking $3.87B in Annual Value Through Dialect-Specific Customer Engagement
            </p>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">$9.72B</div>
                <div className="text-sm text-red-100">Hispanic Segment Revenue</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">17.4M</div>
                <div className="text-sm text-red-100">Hispanic Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">1,100x</div>
                <div className="text-sm text-red-100">Expected ROI</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* The Opportunity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">The Opportunity</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Verizon's <strong>17.4 million Hispanic customers</strong> generate <strong>$9.72 billion annually</strong>, 
              yet <strong className="text-red-600">68% would switch to competitors</strong> offering native language 
              support—putting <strong className="text-red-600">$6.61 billion at risk</strong>. With market share 
              declining from 39% to 36%, multilingual differentiation could recapture lost ground while 
              unlocking <strong className="text-green-600">$3.87 billion in annual value</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Revenue at Risk</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• $6.61B from potential customer switching</li>
                      <li>• $797M annual churn from language barriers</li>
                      <li>• Market share decline: 39% → 36%</li>
                      <li>• 12M lost customers = $2.01B opportunity</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Growth Potential</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• $1.46B premium pricing opportunity</li>
                      <li>• $398.5M churn reduction savings</li>
                      <li>• $2.01B market share recovery</li>
                      <li>• $25B TAM in Spanish-speaking market</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* The Solution */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Rocket className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">The Solution</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <strong>Invictus Language Engine</strong> delivers real-time, dialect-specific translation across 
              web, IVR, and mobile channels through a unified API-first architecture. Seamless integration with 
              existing Verizon systems (AEM, Avaya, mobile apps) enables native-language experiences that drive 
              loyalty, reduce churn, and command premium pricing.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="text-blue-600 mb-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Website Translation</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Real-time page translation</li>
                  <li>✓ Compliant ordering flows</li>
                  <li>✓ Akamai edge caching</li>
                  <li>✓ Improved conversion rates</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="text-purple-600 mb-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">IVR Translation</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Dynamic prompt translation</li>
                  <li>✓ STT→TTS capability</li>
                  <li>✓ Pre-cached content</li>
                  <li>✓ Higher first-call resolution</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <div className="text-green-600 mb-3">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mobile App</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Bi-directional conversation</li>
                  <li>✓ Geo-prioritized languages</li>
                  <li>✓ Background operation</li>
                  <li>✓ Enhanced customer engagement</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* The Impact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">The Impact</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">$275M</div>
                <div className="text-sm text-gray-600 mt-1">Annual Return</div>
                <div className="text-xs text-green-600 mt-2">1,100x ROI</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">$125M</div>
                <div className="text-sm text-gray-600 mt-1">From Retention</div>
                <div className="text-xs text-blue-600 mt-2">5% churn reduction</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">$85M</div>
                <div className="text-sm text-gray-600 mt-1">Language Premium</div>
                <div className="text-xs text-purple-600 mt-2">Incremental ARPU</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <CheckCircle className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">$50M</div>
                <div className="text-sm text-gray-600 mt-1">Support Savings</div>
                <div className="text-xs text-orange-600 mt-2">25% cost reduction</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border-l-4 border-red-600">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-600" />
                Market Leadership Position
              </h3>
              <p className="text-gray-700">
                First major telecom with real-time multilingual engagement at scale, positioning Verizon 
                to capture the $25B Spanish-speaking market and establish competitive differentiation 
                through seamless language support across all customer touchpoints.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Strategic Alignment */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Strategic Alignment</h2>
            <span className="text-sm text-gray-500">Verizon's Four Pillars</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Network className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">The Network</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Seamless integration with existing infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>API-first architecture, software-defined networking compatible</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Edge caching for optimal performance (p95 ≤ 200ms)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Cybersecurity</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>End-to-end encryption for all translations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Compliant with Verizon security standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Proactive monitoring and data protection controls</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Your People</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Empowers employees to serve diverse customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Minimal training requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Improves agent productivity and satisfaction</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Handshake className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Your Partners</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Reliable partner with proven expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Comprehensive ecosystem integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Shared commitment to customer satisfaction</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border-l-4 border-purple-600">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-purple-600" />
              Core Values Alignment
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <strong>Customer First:</strong> Enabling "customers first" philosophy through accessible multilingual experiences
              </div>
              <div>
                <strong>Mission-Driven:</strong> Supporting commitment to connecting diverse communities
              </div>
              <div>
                <strong>Operational Excellence:</strong> Delivering reliable, high-performance solutions
              </div>
              <div>
                <strong>Innovation:</strong> Leading the market with cutting-edge language technology
              </div>
            </div>
          </div>
        </motion.section>

        {/* The Approach */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Rocket className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">The Approach</h2>
            <span className="text-sm text-gray-500">8-Week Phased Pilot</span>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="text-sm font-semibold text-blue-600 mb-2">PHASE 0 • WEEKS 1-2</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Foundation</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Load testing to 10x volume</li>
                  <li>• Integration validation</li>
                  <li>• Baseline metrics</li>
                  <li>• Security & compliance</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="text-sm font-semibold text-purple-600 mb-2">PHASE 1 • WEEKS 3-6</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Limited Deployment</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 5% traffic deployment</li>
                  <li>• Real-time monitoring</li>
                  <li>• CSAT sampling</li>
                  <li>• Iterative optimization</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <div className="text-sm font-semibold text-green-600 mb-2">PHASE 2 • WEEKS 7-8</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Full Pilot</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Complete scope activation</li>
                  <li>• Business impact validation</li>
                  <li>• Scalability assessment</li>
                  <li>• Go/No-Go decision</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                <h3 className="font-semibold text-gray-900 mb-3">Risk Mitigation</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Phased rollout with controlled exposure</li>
                  <li>✓ Immediate rollback capability</li>
                  <li>✓ Continuous monitoring with alerts</li>
                  <li>✓ Cross-functional response team</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                <h3 className="font-semibold text-gray-900 mb-3">Partnership Support</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Weekly executive reviews</li>
                  <li>✓ Dedicated support team</li>
                  <li>✓ Knowledge transfer program</li>
                  <li>✓ Long-term optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* The Ask */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">The Ask</h2>
            <p className="text-xl text-red-100 mb-6">
              Approve pilot investment to position Verizon as the <strong>telecom leader in multilingual 
              customer engagement</strong>, aligning with "customers first" philosophy and enabling seamless 
              solutions for your diverse customer base.
            </p>

            <div className="grid md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-red-100 mb-1">1. Approve Budget</div>
                <div className="font-semibold">TBD Investment</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-red-100 mb-1">2. Executive Sponsor</div>
                <div className="font-semibold">Cross-functional</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-red-100 mb-1">3. KPI Alignment</div>
                <div className="font-semibold">Success Metrics</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-red-100 mb-1">4. Scope Confirm</div>
                <div className="font-semibold">Web/IVR/Mobile</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-red-100 mb-1">5. Timeline</div>
                <div className="font-semibold">8-Week Pilot</div>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="/roi-calculator"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Calculate Your ROI
              </a>
              <a
                href="/journey-heatmap"
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-400 transition-colors"
              >
                View Customer Impact
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

