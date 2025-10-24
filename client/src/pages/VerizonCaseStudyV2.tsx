import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, TrendingDown, AlertTriangle, Target, CheckCircle2,
  TrendingUp, Users, DollarSign, Award, Zap, Shield, Globe,
  ChevronDown, ChevronUp, Info, Calendar, Phone, Smartphone
} from 'lucide-react';
import hispanicMarketData from '../../../data/hispanicMarketData.json';
import verizonInitiatives from '../../../data/verizonInitiatives.json';

type ScenarioType = 'conservative' | 'moderate' | 'aggressive';
type SectionId = 'crisis' | 'losing' | 'current' | 'solution' | 'impact';

export default function VerizonCaseStudyV2() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('aggressive');
  const [activeSection, setActiveSection] = useState<SectionId | ''>(''); // Empty = no section visible by default
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const marketData = hispanicMarketData;
  const scenario = marketData.growthScenarios[selectedScenario];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    // Scroll to top when switching sections
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Version Indicator - Fixed Position */}
      <div className="fixed top-2 right-2 z-[100] bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
        v2024-10-23-16:45 ✓
      </div>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-white" />
              <h1 className="text-xl font-bold text-white">Verizon Hispanic Market Strategy</h1>
            </div>
            <div className="flex gap-2">
              {[
                { id: 'crisis' as SectionId, label: 'Market Opportunity', icon: Target },
                { id: 'losing' as SectionId, label: 'Growth Potential', icon: TrendingUp },
                { id: 'current' as SectionId, label: 'Current Position', icon: Building2 },
                { id: 'solution' as SectionId, label: 'Strategy', icon: Zap },
                { id: 'impact' as SectionId, label: 'Expected Impact', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${
                    activeSection === id
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section 1: The Competitive Crisis */}
        {activeSection === 'crisis' && (
        <section id="crisis">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-10 h-10 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900">The Market Opportunity</h2>
            </div>

            <p className="text-xl text-gray-600 mb-8">
              Verizon has a significant opportunity to capture market share in the $65.5B Hispanic wireless market. The $13.8B revenue gap represents untapped potential in the fastest-growing demographic segment, where strategic differentiation can drive substantial growth.
            </p>

            {/* Crisis Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* T-Mobile Position */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-8 h-8" />
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Market Leader</span>
                </div>
                <div className="text-5xl font-bold mb-2">{marketData.competitiveLandscape.tMobile.marketShare}%</div>
                <div className="text-purple-100 mb-4">T-Mobile Market Share</div>
                <div className="space-y-1 text-sm">
                  <div>{marketData.competitiveLandscape.tMobile.subscribers}M subscribers</div>
                  <div>${marketData.competitiveLandscape.tMobile.revenue}B annual revenue</div>
                  <div>+{marketData.competitiveLandscape.tMobile.netAdds2024}M net adds (2024)</div>
                </div>
              </div>

              {/* Verizon Position */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="w-8 h-8" />
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Current Position</span>
                </div>
                <div className="text-5xl font-bold mb-2">{marketData.competitiveLandscape.verizon.marketShare}%</div>
                <div className="text-blue-100 mb-4">Verizon Market Share</div>
                <div className="space-y-1 text-sm">
                  <div>{marketData.competitiveLandscape.verizon.subscribers}M subscribers</div>
                  <div>${marketData.competitiveLandscape.verizon.revenue}B annual revenue</div>
                  <div>+{marketData.competitiveLandscape.verizon.netAdds2024}M net adds (2024)</div>
                </div>
              </div>

              {/* Growth Opportunity */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8" />
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Growth Potential</span>
                </div>
                <div className="text-5xl font-bold mb-2">${marketData.marketGap.revenue}B</div>
                <div className="text-green-100 mb-4">Revenue Growth Opportunity</div>
                <div className="space-y-1 text-sm">
                  <div>{marketData.marketGap.sharePoints} points market share gain</div>
                  <div>{marketData.marketGap.subscribers}M potential new subscribers</div>
                  <div>+{marketData.marketGap.percentIncrease}% growth potential</div>
                </div>
              </div>
            </div>

            {/* Market Context */}
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Market Context: The $65.5B Prize</h3>
                  <p className="text-sm text-blue-800 mb-3">
                    The U.S. Hispanic wireless market represents <strong>${marketData.marketOverview.hispanicWirelessTAM}B in annual revenue</strong> from {marketData.marketOverview.hispanicPopulation}M consumers ({marketData.marketOverview.hispanicPopulationPercentage}% of U.S. population). This segment is growing <strong>70% faster</strong> than the general market and accounts for <strong>{marketData.marketOverview.percentOfUSGrowth}% of all U.S. population growth</strong>.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-blue-900">T-Mobile: {marketData.competitiveLandscape.tMobile.marketShare}%</div>
                      <div className="text-blue-700">${marketData.competitiveLandscape.tMobile.revenue}B revenue</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900">Verizon: {marketData.competitiveLandscape.verizon.marketShare}%</div>
                      <div className="text-blue-700">${marketData.competitiveLandscape.verizon.revenue}B revenue</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-900">AT&T: {marketData.competitiveLandscape.att.marketShare}%</div>
                      <div className="text-blue-700">${marketData.competitiveLandscape.att.revenue}B revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency Metrics */}
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Why This is Urgent
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <strong className="text-red-900">Net Adds Gap:</strong> T-Mobile added <strong>+{marketData.competitiveLandscape.tMobile.netAdds2024}M</strong> Hispanic subscribers in 2024 vs Verizon's <strong>+{marketData.competitiveLandscape.verizon.netAdds2024}M</strong> — a <strong>5.5x difference</strong>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <strong className="text-red-900">Churn Rate:</strong> T-Mobile's Hispanic churn is <strong>{marketData.competitiveLandscape.tMobile.churnRate}%</strong> (industry-leading) while Verizon struggles with higher churn
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <strong className="text-red-900">Hispanic Penetration:</strong> T-Mobile's base is <strong>{marketData.competitiveLandscape.tMobile.hispanicPercentOfBase}%</strong> Hispanic vs Verizon's <strong>{marketData.competitiveLandscape.verizon.hispanicPercentOfBase}%</strong> — showing strategic commitment gap
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <strong className="text-red-900">Demographic Imperative:</strong> Hispanics represent <strong>{marketData.marketOverview.percentOfUSGrowth}% of all U.S. growth</strong> — losing this segment means losing the future
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        )}

        {/* Section 2: Why Verizon is Losing */}
        {activeSection === 'losing' && (
        <section id="losing">
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="w-10 h-10 text-orange-600" />
            <h2 className="text-4xl font-bold text-gray-900">Why Verizon is Losing</h2>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            T-Mobile and AT&T have built substantial competitive advantages through cultural investment and infrastructure. Verizon's generic approach leaves it vulnerable to continued share loss.
          </p>

          {/* T-Mobile's Winning Playbook */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('tmobile-playbook')}
              className="w-full bg-pink-50 border-2 border-pink-300 rounded-lg p-6 hover:bg-pink-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-pink-600" />
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900">T-Mobile's Winning Playbook</h3>
                    <p className="text-sm text-gray-600">How T-Mobile captured 50.2% market share</p>
                  </div>
                </div>
                {expandedSections['tmobile-playbook'] ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </div>
            </button>

            {expandedSections['tmobile-playbook'] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border-2 border-pink-200 rounded-b-lg p-6 -mt-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-pink-900 mb-2">1. Cultural Positioning</h4>
                      <p className="text-sm text-gray-700">
                        <strong>${marketData.tMobileStrategy.culturalInvestment}M annual investment</strong> in Hispanic marketing vs Verizon's ${marketData.tMobileStrategy.verizonCulturalInvestment}M. Partnerships with FIFA, Liga MX, and cultural events position T-Mobile as "the Hispanic carrier."
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-pink-900 mb-2">2. Community Engagement</h4>
                      <p className="text-sm text-gray-700">
                        <strong>{marketData.tMobileStrategy.hometownGrants} Hometown Grants</strong> program funds Hispanic community projects, building grassroots loyalty and word-of-mouth marketing.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-pink-900 mb-2">3. Data-Driven Insights</h4>
                      <p className="text-sm text-gray-700">
                        Annual "Latino Mobile Trends Report" demonstrates thought leadership and informs product development based on Hispanic consumer behavior.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-pink-900 mb-2">4. Operational Excellence</h4>
                      <p className="text-sm text-gray-700">
                        Industry-leading <strong>{marketData.tMobileStrategy.lowestChurn}% churn rate</strong> among Hispanic customers through superior customer experience and cultural relevance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-pink-100 rounded-lg p-4 border border-pink-300">
                  <p className="text-sm font-semibold text-pink-900 mb-2">Results:</p>
                  <div className="grid grid-cols-3 gap-4 text-sm text-pink-800">
                    <div><strong>{marketData.competitiveLandscape.tMobile.hispanicPercentOfBase}%+</strong> Hispanic customer base</div>
                    <div><strong>{marketData.competitiveLandscape.tMobile.churnRate}%</strong> churn rate (lowest)</div>
                    <div><strong>+{marketData.competitiveLandscape.tMobile.netAdds2024}M</strong> net adds (2024)</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* AT&T's Infrastructure Moat */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('att-moat')}
              className="w-full bg-blue-50 border-2 border-blue-300 rounded-lg p-6 hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-blue-600" />
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900">AT&T's Infrastructure Moat</h3>
                    <p className="text-sm text-gray-600">25+ years of bilingual infrastructure investment</p>
                  </div>
                </div>
                {expandedSections['att-moat'] ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </div>
            </button>

            {expandedSections['att-moat'] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border-2 border-blue-200 rounded-b-lg p-6 -mt-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Physical Presence
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>{marketData.competitiveLandscape.att.bilingualStores}+ bilingual retail stores</strong> in Hispanic markets</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Strategic locations in high-density Hispanic neighborhoods</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Bilingual staff trained in cultural nuances</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Service Infrastructure
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>{marketData.competitiveLandscape.att.spanishCallCenters} dedicated Spanish call centers</strong></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Native Spanish-speaking support agents</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Established processes and training programs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-blue-100 rounded-lg p-4 border border-blue-300">
                  <p className="text-sm text-blue-800">
                    <strong className="text-blue-900">Competitive Advantage:</strong> This infrastructure took 25+ years and hundreds of millions to build. It creates a significant barrier to entry and allows AT&T to maintain {marketData.competitiveLandscape.att.marketShare}% market share despite T-Mobile's aggressive marketing.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Verizon's Strategic Deficit */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('verizon-deficit')}
              className="w-full bg-red-50 border-2 border-red-300 rounded-lg p-6 hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-gray-900">Verizon's Strategic Deficit</h3>
                    <p className="text-sm text-gray-600">Critical gaps vs. T-Mobile and AT&T</p>
                  </div>
                </div>
                {expandedSections['verizon-deficit'] ? (
                  <ChevronUp className="w-6 h-6 text-gray-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                )}
              </div>
            </button>

            {expandedSections['verizon-deficit'] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border-2 border-red-200 rounded-b-lg p-6 -mt-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Generic Spanish Only',
                      description: 'No dialect-specific translation. Mexican Spanish used for all customers regardless of origin (Puerto Rican, Cuban, Colombian, etc.).',
                      impact: 'Critical'
                    },
                    {
                      title: 'Minimal Cultural Investment',
                      description: `$${marketData.tMobileStrategy.verizonCulturalInvestment}M vs T-Mobile's $${marketData.tMobileStrategy.culturalInvestment}M — 33x less investment in Hispanic marketing and community engagement.`,
                      impact: 'Critical'
                    },
                    {
                      title: 'No Dedicated Infrastructure',
                      description: 'No bilingual retail stores or dedicated Spanish call centers. Relies on translation services and bilingual agents scattered across general support.',
                      impact: 'High'
                    },
                    {
                      title: 'Fragmented Initiatives',
                      description: '6 separate Spanish programs with no unified strategy. Each initiative operates in isolation without end-to-end customer journey integration.',
                      impact: 'High'
                    },
                    {
                      title: 'Low Hispanic Penetration',
                      description: `Only ${marketData.competitiveLandscape.verizon.hispanicPercentOfBase}% of customer base is Hispanic vs T-Mobile's ${marketData.competitiveLandscape.tMobile.hispanicPercentOfBase}%+ — indicating lack of appeal to this segment.`,
                      impact: 'Medium'
                    },
                    {
                      title: 'Reactive vs. Proactive',
                      description: 'Verizon responds to complaints rather than proactively building cultural relevance. No thought leadership or community engagement strategy.',
                      impact: 'Medium'
                    }
                  ].map((deficit, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-red-900">{deficit.title}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          deficit.impact === 'Critical' ? 'bg-red-600 text-white' :
                          deficit.impact === 'High' ? 'bg-orange-600 text-white' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {deficit.impact}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{deficit.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-red-100 rounded-lg p-4 border border-red-300">
                  <p className="text-sm font-semibold text-red-900 mb-2">The Result:</p>
                  <p className="text-sm text-red-800">
                    Verizon's market share has declined from <strong>39% to {marketData.competitiveLandscape.verizon.marketShare}%</strong> while T-Mobile has grown to <strong>{marketData.competitiveLandscape.tMobile.marketShare}%</strong>. Without strategic intervention, this trend will continue as the Hispanic segment grows to represent <strong>30%+ of the U.S. population by 2050</strong>.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>
        )}

        {/* Section 3: Current State Assessment */}
        {activeSection === 'current' && (
        <section id="current">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-10 h-10 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">Current State Assessment</h2>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            Verizon has made investments in Spanish language support, but these initiatives are insufficient to compete with T-Mobile's cultural positioning and AT&T's infrastructure. Each program has critical limitations that prevent it from driving meaningful business impact.
          </p>

          {/* Current Initiatives */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Spanish Language Initiatives</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verizonInitiatives.currentInitiatives.map((initiative, index) => (
                <div key={initiative.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{initiative.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{initiative.launchDate}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {initiative.coverage}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{initiative.description}</p>
                  <div className="border-t pt-4">
                    <p className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Critical Limitations:
                    </p>
                    <ul className="space-y-1">
                      {initiative.limitations.map((limitation, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Identified Gaps */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Identified Gaps & Business Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verizonInitiatives.gaps.map((gap, index) => (
                <div key={gap.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">{gap.gap}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          gap.impact === 'Critical' ? 'bg-red-600 text-white' :
                          gap.impact === 'High' ? 'bg-orange-600 text-white' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {gap.impact} Impact
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{gap.category}</p>
                      <p className="text-sm text-gray-700 mb-3">{gap.description}</p>
                      <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                        <p className="text-xs font-semibold text-red-900 mb-1">Business Impact:</p>
                        <p className="text-xs text-red-800">{gap.businessImpact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Section 4: The Invictus Solution */}
        {activeSection === 'solution' && (
        <section id="solution">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-10 h-10 text-green-600" />
            <h2 className="text-4xl font-bold text-gray-900">The Invictus Solution</h2>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            {verizonInitiatives.invictusSolution.overview}
          </p>

          {/* Defend-Capture-Grow Framework */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Framework: Defend → Capture → Grow</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Defend */}
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <h4 className="text-xl font-bold text-blue-900">DEFEND</h4>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Stop the bleeding by reducing churn among existing Hispanic customers through dialect-specific support and cultural relevance.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Churn Reduction:</span>
                    <span className="font-bold text-blue-900">{scenario.defend.churnReduction}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subs Retained:</span>
                    <span className="font-bold text-blue-900">{scenario.defend.subscribersRetained}M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Revenue Protected:</span>
                    <span className="font-bold text-blue-900">${scenario.defend.revenueProtected}B</span>
                  </div>
                </div>
              </div>

              {/* Capture */}
              <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <h4 className="text-xl font-bold text-purple-900">CAPTURE</h4>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Take market share from T-Mobile, AT&T, and other carriers by offering superior dialect-specific CX that competitors can't match.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">From T-Mobile:</span>
                    <span className="font-bold text-purple-900">{scenario.capture.fromTMobile}M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">From AT&T:</span>
                    <span className="font-bold text-purple-900">{scenario.capture.fromATT}M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Captured:</span>
                    <span className="font-bold text-purple-900">{scenario.capture.totalCaptured}M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-bold text-purple-900">${scenario.capture.revenueFromCapture}B</span>
                  </div>
                </div>
              </div>

              {/* Grow */}
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <h4 className="text-xl font-bold text-green-900">GROW</h4>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Attract net new customers from market expansion, prepaid switchers, and first-time wireless buyers through differentiated positioning.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Net New Customers:</span>
                    <span className="font-bold text-green-900">{scenario.grow.netNewCustomers}M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">New Revenue:</span>
                    <span className="font-bold text-green-900">${scenario.grow.revenueFromGrowth}B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verizonInitiatives.invictusSolution.capabilities.map((capability, index) => (
                <div key={capability.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{capability.capability}</h4>
                      <p className="text-sm text-gray-600 mb-3">{capability.description}</p>
                      <div className="bg-green-50 border-l-4 border-green-600 p-3 rounded">
                        <p className="text-xs font-semibold text-green-900 mb-1">Business Benefit:</p>
                        <p className="text-xs text-green-800">{capability.benefit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive Moat */}
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Why This Creates a Defensible Competitive Moat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-green-900">First-Mover Advantage:</strong> No major telecom offers dialect-specific translation. 12-18 month window before competitors can replicate.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-green-900">Technical Complexity:</strong> Dialect-specific AI translation requires significant R&D and training data that competitors don't have.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-green-900">Network Effects:</strong> As more Hispanic customers join, word-of-mouth and community trust accelerate growth.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-green-900">Cultural Positioning:</strong> Being first to market with dialect-specific CX positions Verizon as "the carrier that truly understands us."
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Section 5: Expected Impact */}
        {activeSection === 'impact' && (
        <section id="impact">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-10 h-10 text-purple-600" />
            <h2 className="text-4xl font-bold text-gray-900">Expected Impact</h2>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            Based on market analysis and competitive benchmarking, Invictus can help Verizon capture ${scenario.annualRevenue}B in annual incremental revenue (${scenario.fiveYearRevenue}B over 5 years) under a {selectedScenario} execution scenario.
          </p>

          {/* Scenario Selector */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-purple-300">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Select Growth Scenario:</h3>
            <div className="flex gap-3 mb-6">
              {(['conservative', 'moderate', 'aggressive'] as ScenarioType[]).map((scenarioKey) => (
                <button
                  key={scenarioKey}
                  onClick={() => setSelectedScenario(scenarioKey)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    selectedScenario === scenarioKey
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {scenarioKey.charAt(0).toUpperCase() + scenarioKey.slice(1)}
                </button>
              ))}
            </div>

            {/* Scenario Results */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6">
                <DollarSign className="w-8 h-8 mb-3" />
                <div className="text-3xl font-bold mb-1">${scenario.annualRevenue}B/yr</div>
                <div className="text-lg font-semibold mb-1">${scenario.fiveYearRevenue}B (5-yr)</div>
                <div className="text-green-100 text-sm">Incremental Revenue</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
                <Users className="w-8 h-8 mb-3" />
                <div className="text-3xl font-bold mb-1">+{scenario.newSubscribers}M</div>
                <div className="text-blue-100 text-sm">New Subscribers</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6">
                <TrendingUp className="w-8 h-8 mb-3" />
                <div className="text-3xl font-bold mb-1">{scenario.newMarketShare}%</div>
                <div className="text-purple-100 text-sm">New Market Share</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6">
                <Target className="w-8 h-8 mb-3" />
                <div className="text-3xl font-bold mb-1">+{scenario.revenueIncrease}%</div>
                <div className="text-orange-100 text-sm">Revenue Increase</div>
              </div>
            </div>
          </div>

          {/* Market Share Trajectory */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Market Share Trajectory (5 Years)</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Current Position</span>
                  <span className="text-sm font-bold text-gray-900">{marketData.competitiveLandscape.verizon.marketShare}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-red-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${marketData.competitiveLandscape.verizon.marketShare}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Target Position ({selectedScenario.charAt(0).toUpperCase() + selectedScenario.slice(1)})</span>
                  <span className="text-sm font-bold text-green-900">{scenario.newMarketShare}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${scenario.newMarketShare}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 border border-purple-300">
                <p className="text-sm text-purple-900">
                  <strong>Growth:</strong> +{(scenario.newMarketShare - marketData.competitiveLandscape.verizon.marketShare).toFixed(1)} percentage points = {scenario.newSubscribers}M new subscribers = ${scenario.annualRevenue}B annual revenue (${scenario.fiveYearRevenue}B over 5 years)
                </p>
              </div>
            </div>
          </div>
        </section>
        )}
      </div>
    </div>
  );
}

