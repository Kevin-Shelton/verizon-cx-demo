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
import ExecutiveIntroductionImpact from "./ExecutiveIntroductionImpact";
import SourceTooltip from "../components/SourceTooltip";

export default function ExecutiveIntroduction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              Multilingual CX Transformation
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-red-100 mb-2">
              Capturing the $25B U.S. Spanish-Speaking Telecom Market
            </p>
            <p className="text-base sm:text-lg text-red-200 mb-2">
              $3.9B value unlock from existing customers + $15.3B net new market expansion
            </p>
            <p className="text-xs sm:text-sm text-red-200 mb-6 sm:mb-8 italic">
              Presented by Invictus
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 sm:py-4">
                <div className="text-2xl sm:text-3xl font-bold">$9.72B</div>
                <div className="text-xs sm:text-sm text-red-100">Hispanic Segment Revenue</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 sm:py-4">
                <div className="text-2xl sm:text-3xl font-bold">17.4M</div>
                <div className="text-xs sm:text-sm text-red-100">Hispanic Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-3 sm:py-4">
                <div className="text-2xl sm:text-3xl font-bold">1,100x</div>
                <div className="text-xs sm:text-sm text-red-100">Expected ROI</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* The Opportunity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-red-100 rounded-lg flex-shrink-0">
              <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-red-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">The Opportunity</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 border border-gray-200">
            {/* Total Opportunity Headline */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-blue-400">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">$25B</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">Total Addressable Market
                  <SourceTooltip 
                    source="U.S. Census Bureau (2023), Selig Center" 
                    detail="62M Hispanic consumers, $1.9T purchasing power, 11.9% telecom penetration" 
                  />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mb-4">U.S. Spanish-Speaking Telecom Market</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 text-xs sm:text-sm">
                  <div className="bg-white rounded-lg p-3 border border-gray-300">
                    <div className="text-lg sm:text-xl font-bold text-gray-700">$9.7B</div>
                    <div className="text-gray-600 text-xs">Current Position
                      <SourceTooltip 
                        source="Verizon Q4 2024 Earnings" 
                        detail="17.4M Hispanic customers generating $9.7B annually" 
                      />
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-400">
                    <div className="text-lg sm:text-xl font-bold text-green-700">$3.9B</div>
                    <div className="text-gray-600 text-xs">Value Unlock
                      <SourceTooltip 
                        source="Invictus Market Analysis" 
                        detail="$1.5B premium + $0.4B churn + $2.0B recovery from existing customers" 
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-400">
                    <div className="text-lg sm:text-xl font-bold text-blue-700">$15.3B</div>
                    <div className="text-gray-600 text-xs">Net New Market
                      <SourceTooltip 
                        source="Calculated: $25B TAM - $9.7B current" 
                        detail="Remaining market share to capture from competitors" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              The <strong className="text-blue-600">$25 billion U.S. Spanish-speaking telecom market</strong>
              <SourceTooltip 
                source="U.S. Census Bureau (2023), Selig Center" 
                detail="62M Hispanic consumers, $1.9T purchasing power, 11.9% telecom penetration" 
              /> represents a massive opportunity. Verizon currently holds <strong>$9.7 billion</strong>
              <SourceTooltip 
                source="Verizon Q4 2024 Earnings Report" 
                detail="17.4M Hispanic customers × $139.77 ARPA × 12 months" 
              /> (39% market share), 
              yet <strong className="text-red-600">68% would switch to competitors</strong>
              <SourceTooltip 
                source="Common Sense Advisory: Can't Read, Won't Buy (2020)" 
                detail="Survey of 8,709 consumers across 29 countries" 
              /> offering native language 
              support—putting <strong className="text-red-600">$6.6 billion at risk</strong>
              <SourceTooltip 
                source="Calculated: $9.7B × 68% switching risk" 
                detail="Revenue at risk from language-driven customer switching" 
              />. With market share 
              declining to 36%
              <SourceTooltip 
                source="U.S. Wireless Market Share Analysis (2023-2024)" 
                detail="Verizon market share trend in Hispanic segment" 
              />, dialect-specific multilingual CX could 
              unlock <strong className="text-green-600">$3.9 billion in additional value</strong>
              <SourceTooltip 
                source="Invictus Market Analysis" 
                detail="$1.5B premium pricing + $0.4B churn reduction + $2.0B market recovery" 
              /> from existing customers while positioning Verizon to capture the <strong className="text-blue-600">$15.3 billion remaining market</strong>
              <SourceTooltip 
                source="Calculated: $25B TAM - $9.7B current position" 
                detail="Net new market opportunity from competitors" 
              />.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-red-50 rounded-lg p-4 sm:p-6 border-l-4 border-red-600">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Revenue at Risk</h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                      <li>• $6.6B from potential customer switching
                        <SourceTooltip 
                          source="$9.7B × 68% switching risk" 
                          detail="Common Sense Advisory research on language-driven brand switching" 
                        />
                      </li>
                      <li>• $0.8B annual churn from language barriers
                        <SourceTooltip 
                          source="17.4M × 1.12% monthly churn × 29% language-driven × $139.77 ARPA × 12" 
                          detail="Accenture: Language Barriers in Customer Service (2021)" 
                        />
                      </li>
                      <li>• Market share decline: 39% → 36%
                        <SourceTooltip 
                          source="U.S. Wireless Market Share Analysis (2023-2024)" 
                          detail="3 percentage point decline in Hispanic segment over 18 months" 
                        />
                      </li>
                      <li>• 12M lost customers = $2.0B opportunity
                        <SourceTooltip 
                          source="3% market share × 400M addressable = 12M customers" 
                          detail="12M × $139.77 ARPA × 12 months = $2.0B annual revenue opportunity" 
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 sm:p-6 border-l-4 border-green-600">
                <div className="flex items-start gap-3">
                  <Target className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Existing Customer Value: $3.9B Annual</h3>
                    <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span>• Premium pricing opportunity (64% willing to pay more)
                          <SourceTooltip 
                            source="CSA Research: Can't Read, Won't Buy (2020)" 
                            detail="17.4M × 64% × $139.77 ARPA × 12 × 5% premium = $1.5B" 
                          />
                        </span>
                        <span className="font-semibold text-green-700">$1.5B</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span>• Churn reduction savings (29% reduction)
                          <SourceTooltip 
                            source="Accenture: Language Barriers in Customer Service (2021)" 
                            detail="$797M annual churn × 50% reduction = $0.4B" 
                          />
                        </span>
                        <span className="font-semibold text-green-700">$0.4B</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span>• Market share recovery (12M lost customers)
                          <SourceTooltip 
                            source="Market share analysis + ARPA calculation" 
                            detail="12M customers × $139.77 ARPA × 12 months = $2.0B" 
                          />
                        </span>
                        <span className="font-semibold text-green-700">$2.0B</span>
                      </div>
                      <div className="border-t-2 border-green-300 pt-2 mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="font-bold">Total from Existing Customers</span>
                        <span className="text-lg sm:text-xl font-bold text-green-700">$3.9B</span>
                      </div>
                    </div>
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
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
              <Rocket className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">The Solution</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 border border-gray-200">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
              Invictus delivers <strong>dialect-specific multilingual customer experience</strong> powered by OneMeta AI, enabling Verizon to serve Hispanic customers in their preferred language with cultural nuance and authenticity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border-l-4 border-blue-600">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Dialect-Specific Translation</h3>
                    <p className="text-xs sm:text-sm text-gray-700">Support for Mexican, Puerto Rican, Cuban, and other regional Spanish dialects with cultural context and local terminology.</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 sm:p-6 border-l-4 border-purple-600">
                <div className="flex items-start gap-3">
                  <Network className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Omnichannel Integration</h3>
                    <p className="text-xs sm:text-sm text-gray-700">Seamless integration across phone, chat, email, and social media with consistent multilingual support.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 sm:p-6 border-l-4 border-green-600">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Customer-Centric Design</h3>
                    <p className="text-xs sm:text-sm text-gray-700">Culturally relevant content, personalized experiences, and proactive support in preferred language.</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 sm:p-6 border-l-4 border-orange-600">
                <div className="flex items-start gap-3">
                  <Handshake className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">BPO Partnership</h3>
                    <p className="text-xs sm:text-sm text-gray-700">Nearshore contact center operations in Belize with native Spanish-speaking agents and cultural expertise.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Impact Section */}
        <ExecutiveIntroductionImpact />
      </div>
    </div>
  );
}

