import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Target,
  Sparkles,
  Calendar,
  ArrowRight
} from "lucide-react";

interface InsightProps {
  title: string;
  value: string;
  subtitle: string;
  detail: string;
  color: string;
  icon: React.ReactNode;
  insights: {
    basis: string;
    calculation: string;
    source: string;
  };
}

function ImpactCard({ title, value, subtitle, detail, color, icon, insights }: InsightProps) {
  const [showInsights, setShowInsights] = useState(false);

  const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
    green: {
      bg: "from-green-50 to-green-100",
      text: "text-green-600",
      border: "border-green-600",
      iconBg: "bg-green-100"
    },
    blue: {
      bg: "from-blue-50 to-blue-100",
      text: "text-blue-600",
      border: "border-blue-600",
      iconBg: "bg-blue-100"
    },
    purple: {
      bg: "from-purple-50 to-purple-100",
      text: "text-purple-600",
      border: "border-purple-600",
      iconBg: "bg-purple-100"
    },
    orange: {
      bg: "from-orange-50 to-orange-100",
      text: "text-orange-600",
      border: "border-orange-600",
      iconBg: "bg-orange-100"
    }
  };
  const colorClasses = colorMap[color] || colorMap.green;

  return (
    <div className="relative">
      <div className={`text-center p-6 bg-gradient-to-br ${colorClasses.bg} rounded-lg border-2 border-transparent hover:${colorClasses.border} transition-all`}>
        <div className="flex justify-center mb-3">{icon}</div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600 mt-1">{subtitle}</div>
        <div className={`text-xs ${colorClasses.text} mt-2 font-semibold`}>{detail}</div>
        
        <button
          onClick={() => setShowInsights(!showInsights)}
          className={`mt-3 flex items-center gap-1 mx-auto text-xs ${colorClasses.text} hover:underline`}
        >
          <Info className="w-3 h-3" />
          {showInsights ? "Hide" : "Show"} Insights
          {showInsights ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      <AnimatePresence>
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-2 bg-white rounded-lg border-2 ${colorClasses.border} p-4 text-left text-sm`}
          >
            <div className="space-y-3">
              <div>
                <div className={`font-semibold ${colorClasses.text} mb-1`}>Basis</div>
                <div className="text-gray-700">{insights.basis}</div>
              </div>
              <div>
                <div className={`font-semibold ${colorClasses.text} mb-1`}>Calculation</div>
                <div className="text-gray-700 font-mono text-xs bg-gray-50 p-2 rounded">{insights.calculation}</div>
              </div>
              <div>
                <div className={`font-semibold ${colorClasses.text} mb-1`}>Source</div>
                <div className="text-gray-600 text-xs italic">{insights.source}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExecutiveIntroductionImpact() {
  const [showMarketStory, setShowMarketStory] = useState(false);
  const [show3YearPlan, setShow3YearPlan] = useState(false);

  const impactMetrics: InsightProps[] = [
    {
      title: "Total Opportunity",
      value: "$3.9B",
      subtitle: "Annual Value Potential",
      detail: "Full market capture",
      color: "green",
      icon: <DollarSign className="w-12 h-12 text-green-600" />,
      insights: {
        basis: "Combined value of premium pricing ($1.5B), churn reduction ($0.4B), and market share recovery ($2.0B) across Verizon's 17.4M Hispanic customer base.",
        calculation: "$1.5B + $0.4B + $2.0B = $3.9B annual value",
        source: "Verizon Q4 2024 Earnings Report + U.S. Hispanic Market Analysis"
      }
    },
    {
      title: "Year 1 Projection",
      value: "$0.9B",
      subtitle: "Moderate Capture",
      detail: "23% of total opportunity",
      color: "blue",
      icon: <Calendar className="w-12 h-12 text-blue-600" />,
      insights: {
        basis: "8-week pilot (Q1) scaling to 35% customer coverage by year-end. Assumes 18% conversion improvement and 8% churn reduction in covered segments.",
        calculation: "$3.9B × 35% coverage × 66% effectiveness = $0.9B Year 1",
        source: "Invictus Implementation Roadmap & Industry Benchmarks"
      }
    },
    {
      title: "Year 2 Projection",
      value: "$2.1B",
      subtitle: "Broad Deployment",
      detail: "54% of total opportunity",
      color: "purple",
      icon: <TrendingUp className="w-12 h-12 text-purple-600" />,
      insights: {
        basis: "Full deployment across all channels (Website, IVR, Chat, Email, Field). 80% customer coverage with optimized dialect-specific translation and proven conversion patterns.",
        calculation: "$3.9B × 80% coverage × 67% effectiveness = $2.1B Year 2",
        source: "Scaled Implementation Model based on Pilot Results"
      }
    },
    {
      title: "Year 3 Projection",
      value: "$3.5B",
      subtitle: "Full Implementation",
      detail: "90% of total opportunity",
      color: "orange",
      icon: <CheckCircle className="w-12 h-12 text-orange-600" />,
      insights: {
        basis: "Mature implementation with AI-driven personalization, 95% customer coverage, and expanded to new market segments. Includes network effects and brand reputation lift.",
        calculation: "$3.9B × 95% coverage × 94% effectiveness = $3.5B Year 3",
        source: "Long-term Value Projection with Market Expansion"
      }
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-lg">
          <Sparkles className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">The Impact</h2>
        <span className="text-sm text-gray-500">3-Year Moderate Projection</span>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        {/* Main Impact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactMetrics.map((metric, index) => (
            <ImpactCard key={index} {...metric} />
          ))}
        </div>

        {/* 3-Year Roadmap */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-600 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                3-Year Value Capture Roadmap
              </h3>
              <div className="flex items-center gap-4 text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Year 1: $0.9B (23%)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Year 2: $2.1B (54%)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Year 3: $3.5B (90%)</span>
                </div>
              </div>
              
              <button
                onClick={() => setShow3YearPlan(!show3YearPlan)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                {show3YearPlan ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {show3YearPlan ? "Hide" : "Show"} Detailed Roadmap & Assumptions
              </button>
            </div>
          </div>

          <AnimatePresence>
            {show3YearPlan && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4 text-gray-700"
              >
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Year 1: Pilot + Initial Scale ($0.9B)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold mb-1">Timeline</div>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Q1: 8-week pilot (5% coverage)</li>
                        <li>• Q2: Scale to 15% coverage</li>
                        <li>• Q3: Expand to 25% coverage</li>
                        <li>• Q4: Reach 35% coverage</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Key Metrics</div>
                      <ul className="space-y-1 text-gray-600">
                        <li>• 18% conversion improvement</li>
                        <li>• 8% churn reduction</li>
                        <li>• 64% effectiveness rate</li>
                        <li>• ROI: 3,000x ($0.9B / $300K)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    Year 2: Broad Deployment ($2.1B)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold mb-1">Deployment</div>
                      <ul className="space-y-1 text-gray-600">
                        <li>• All channels: Web, IVR, Chat, Email, Field</li>
                        <li>• 80% customer coverage</li>
                        <li>• 4 Spanish dialects optimized</li>
                        <li>• AI personalization enabled</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Performance</div>
                      <ul className="space-y-1 text-gray-600">
                        <li>• 25% conversion improvement</li>
                        <li>• 15% churn reduction</li>
                        <li>• 67% effectiveness rate</li>
                        <li>• Premium pricing: +3% ARPU</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    Year 3: Full Implementation ($3.5B)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold mb-1">Maturity</div>
                      <ul className="space-y-1 text-gray-600">
                        <li>• 95% customer coverage</li>
                        <li>• Proactive multilingual engagement</li>
                        <li>• Expanded to 150+ languages</li>
                        <li>• Market leadership established</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Results</div>
                      <ul className="space-y-1 text-gray-600">
                        <li>• 32% conversion improvement</li>
                        <li>• 20% churn reduction</li>
                        <li>• 94% effectiveness rate</li>
                        <li>• Brand reputation: +15 NPS</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-xs text-gray-600">
                    <strong>Methodology:</strong> Projections based on phased rollout model with conservative effectiveness rates. 
                    Coverage = % of 17.4M Hispanic customers reached. Effectiveness = actual value capture vs. theoretical maximum. 
                    Assumes no major market disruptions and continued investment in optimization.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Market Story Section */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 border-l-4 border-red-600">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-600" />
                The $25B Net New Market Opportunity
              </h3>
              <p className="text-gray-700 mb-3">
                Beyond Verizon's existing Hispanic customer base lies a <strong>$25 billion total addressable market</strong> in 
                the U.S. Spanish-speaking segment. This represents <strong>62 million Hispanic consumers</strong> with 
                <strong> $1.9 trillion in purchasing power</strong>, growing 70% faster than the general market.
              </p>
              
              <button
                onClick={() => setShowMarketStory(!showMarketStory)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm"
              >
                {showMarketStory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showMarketStory ? "Hide" : "Show"} Market Story & Data Sources
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showMarketStory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4 text-gray-700"
              >
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">📊 Market Size & Growth</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>62M Hispanic consumers</strong> in the U.S. (19% of population)</li>
                    <li>• <strong>$1.9T purchasing power</strong>, growing 70% faster than general market</li>
                    <li>• <strong>$25B telecom TAM</strong> based on 11.9% market penetration</li>
                    <li className="text-xs italic text-gray-600">Source: U.S. Census Bureau (2023), Selig Center for Economic Growth</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">🎯 Competitive Positioning</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>68% would switch</strong> to competitors offering native language support</li>
                    <li>• <strong>72% satisfaction increase</strong> with culturally-aware service</li>
                    <li>• <strong>First-mover advantage</strong>: No major telecom offers real-time dialect-specific translation</li>
                    <li className="text-xs italic text-gray-600">Source: Common Sense Advisory, Accenture Language Services Study</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-2">💡 Strategic Narrative</h4>
                  <p className="text-sm leading-relaxed">
                    Verizon's current 17.4M Hispanic customers represent just <strong>28% penetration</strong> of the addressable market. 
                    By becoming the <strong>first major telecom with dialect-specific multilingual CX</strong>, Verizon can:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm ml-4">
                    <li>1. <strong>Protect</strong> $6.6B at risk from competitors</li>
                    <li>2. <strong>Capture</strong> $3.9B in value from existing customers over 3 years</li>
                    <li>3. <strong>Expand</strong> into the remaining $25B TAM with differentiated positioning</li>
                    <li>4. <strong>Lead</strong> the industry in culturally-aware customer experience</li>
                  </ul>
                  <p className="text-xs italic text-gray-600 mt-3">
                    This isn't just translation—it's market leadership through cultural intelligence.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

