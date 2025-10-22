import React, { useState } from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, Target, DollarSign, Users, Globe, Zap, CheckCircle, XCircle, Info } from 'lucide-react';
import marketData from '../../../data/hispanicMarketData.json';

type ScenarioType = 'conservative' | 'moderate' | 'aggressive';

const ExecutiveIntroductionV2: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('moderate');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(['tmobile-strategy', 'verizon-deficit', 'super-consumer', 'dialect-examples', 'scenario-details', 'roadmap-details', 'roi-details']));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  const scenario = marketData.growthScenarios[selectedScenario];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Executive Summary Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Executive Summary</h2>
              <p className="text-blue-100 text-lg">
                Close the $13.8B revenue gap to T-Mobile by capturing {scenario.gapCapturePercent}% of the Hispanic market through dialect-specific translation, generating ${scenario.incrementalRevenue}B incremental annual revenue over 5 years.
              </p>
            </div>
            <div className="ml-8 flex gap-3">
              <button
                onClick={expandAll}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Section 1: The Competitive Crisis */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">The Competitive Crisis</h1>
          </div>

          {/* Hero Stats */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-8 rounded-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The $65.5B U.S. Hispanic Wireless Market
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              T-Mobile dominates with 50.2% share while Verizon holds only 26.9%
            </p>

            {/* Competitive Comparison Cards */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* T-Mobile */}
              <div className="bg-white rounded-lg p-6 shadow-md border-2 border-purple-200">
                <div className="text-sm font-semibold text-purple-600 mb-2">T-MOBILE</div>
                <div className="text-4xl font-bold text-purple-700 mb-1">50.2%</div>
                <div className="text-gray-600 mb-3">Market Share</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers:</span>
                    <span className="font-semibold">32.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-semibold">${marketData.competitiveLandscape.tMobile.revenue}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">2024 Net Adds:</span>
                    <span className="font-semibold text-green-600">+{marketData.competitiveLandscape.tMobile.netAdds2024}M</span>
                  </div>
                </div>
              </div>

              {/* Verizon */}
              <div className="bg-white rounded-lg p-6 shadow-md border-2 border-red-200">
                <div className="text-sm font-semibold text-red-600 mb-2">VERIZON</div>
                <div className="text-4xl font-bold text-red-700 mb-1">26.9%</div>
                <div className="text-gray-600 mb-3">Market Share</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers:</span>
                    <span className="font-semibold">17.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-semibold">${marketData.competitiveLandscape.verizon.revenue}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">2024 Net Adds:</span>
                    <span className="font-semibold text-orange-600">+{marketData.competitiveLandscape.verizon.netAdds2024}M</span>
                  </div>
                </div>
              </div>

              {/* AT&T */}
              <div className="bg-white rounded-lg p-6 shadow-md border-2 border-blue-200">
                <div className="text-sm font-semibold text-blue-600 mb-2">AT&T</div>
                <div className="text-4xl font-bold text-blue-700 mb-1">20.1%</div>
                <div className="text-gray-600 mb-3">Market Share</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers:</span>
                    <span className="font-semibold">13.0M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-semibold">${marketData.competitiveLandscape.att.revenue}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bilingual Stores:</span>
                    <span className="font-semibold">{marketData.competitiveLandscape.att.bilingualStores}+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* The Gap */}
            <div className="bg-red-100 border-2 border-red-300 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-700">${marketData.marketGap.revenue}B</div>
                  <div className="text-sm text-red-600 font-medium mt-1">Annual Revenue Gap</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-700">{marketData.marketGap.subscribers}M</div>
                  <div className="text-sm text-red-600 font-medium mt-1">Subscriber Gap</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-700">{marketData.marketGap.sharePoints} pts</div>
                  <div className="text-sm text-red-600 font-medium mt-1">Market Share Gap</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Context Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Market Prize */}
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">The Market Prize</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hispanic Wireless TAM:</span>
                  <span className="text-2xl font-bold text-green-600">${marketData.marketOverview.hispanicWirelessTAM}B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Telecom TAM:</span>
                  <span className="text-xl font-bold text-green-600">${marketData.marketOverview.hispanicTotalTelecomTAM}B</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Subscribers:</span>
                  <span className="text-lg font-semibold">{marketData.marketOverview.totalWirelessSubscribers}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average ARPU:</span>
                  <span className="text-lg font-semibold">${marketData.marketOverview.averageARPU}</span>
                  <span className="text-xs text-green-600">(10% premium)</span>
                </div>
              </div>
            </div>

            {/* Demographic Imperative */}
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">The Demographic Imperative</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hispanic Population:</span>
                  <span className="text-2xl font-bold text-blue-600">{marketData.marketOverview.hispanicPopulation}M</span>
                  <span className="text-sm text-blue-600">({marketData.marketOverview.hispanicPopulationPercentage}% of U.S.)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">% of U.S. Growth (2000-2024):</span>
                  <span className="text-xl font-bold text-blue-600">{marketData.marketOverview.percentOfUSGrowth}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projected by 2050:</span>
                  <span className="text-lg font-semibold">{marketData.marketOverview.hispanicPopulationProjected2050}M</span>
                  <span className="text-xs text-blue-600">(29% of U.S.)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Median Age:</span>
                  <span className="text-lg font-semibold">31.2 years</span>
                  <span className="text-xs text-blue-600">(youngest demo)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why T-Mobile is Winning */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Why T-Mobile is Winning</h1>
          </div>

          {/* T-Mobile Strategy */}
          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">T-Mobile's Winning Playbook</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Cultural Positioning</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• FIFA partnerships, Latino artists</li>
                      <li>• "Leading provider for Latinos"</li>
                      <li>• Latino Mobile Trends Report</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Value Proposition</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Consumer-friendly pricing</li>
                      <li>• Targets lower median income demo</li>
                      <li>• Transparent, simple plans</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Community Investment</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• ${marketData.tMobileStrategy.hometownGrants}M+ Hometown Grants</li>
                      <li>• Friday Night 5G Lights</li>
                      <li>• Hispanic community programs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Loyalty Programs</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Stateside International Talk</li>
                      <li>• Matricula consular program</li>
                      <li>• Family plan incentives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-100 rounded-lg p-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-700">{marketData.competitiveLandscape.tMobile.hispanicPercentOfBase}%+</div>
                  <div className="text-xs text-purple-600 mt-1">Hispanic % of Base</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">{marketData.competitiveLandscape.tMobile.churnRate}%</div>
                  <div className="text-xs text-purple-600 mt-1">Lowest Churn Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">+{marketData.competitiveLandscape.tMobile.netAdds2024}M</div>
                  <div className="text-xs text-purple-600 mt-1">2024 Net Adds</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">#1</div>
                  <div className="text-xs text-purple-600 mt-1">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Verizon's Deficit */}
          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Verizon's Strategic Deficit</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-gray-700">
                  <span className="font-semibold">No dedicated bilingual store network</span>
                  <div className="text-sm text-gray-600">vs AT&T's 770+ bilingual stores</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-gray-700">
                  <span className="font-semibold">No Spanish call center footprint</span>
                  <div className="text-sm text-gray-600">vs AT&T's 22 Spanish call centers (25+ years)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-gray-700">
                  <span className="font-semibold">Only {marketData.competitiveLandscape.verizon.hispanicPercentOfBase}% Hispanic customer base</span>
                  <div className="text-sm text-gray-600">Half of T-Mobile's 25%+ penetration</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-gray-700">
                  <span className="font-semibold">Minimal cultural investment</span>
                  <div className="text-sm text-gray-600">${marketData.tMobileStrategy.verizonCulturalInvestment}M vs T-Mobile's ${marketData.tMobileStrategy.culturalInvestment}M</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-gray-700">
                  <span className="font-semibold">Generic Spanish only</span>
                  <div className="text-sm text-gray-600">No dialect-specific support</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-gray-700">
                  <span className="font-semibold">Weak subscriber growth</span>
                  <div className="text-sm text-gray-600">+{marketData.competitiveLandscape.verizon.netAdds2024}M vs T-Mobile's +{marketData.competitiveLandscape.tMobile.netAdds2024}M (2024)</div>
                </div>
              </div>
            </div>

            <div className="bg-red-100 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-red-700">
                Result: {marketData.competitiveLandscape.verizon.marketShare}% market share despite being the largest U.S. carrier
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Super Consumer Behaviors */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900">The Hispanic "Super Consumer"</h1>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-8">
            <p className="text-lg text-gray-700 mb-6">
              Hispanics are the most mobile-engaged demographic in the U.S., with significantly higher usage across all metrics.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-2">{marketData.superConsumerMetrics.hoursPerWeekOnSmartphone}+</div>
                <div className="text-sm text-gray-600 mb-1">Hours/Week on Smartphone</div>
                <div className="text-xs text-orange-600 font-medium">Highest of any demographic</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-2">{marketData.superConsumerMetrics.minutesPerMonthUsage}</div>
                <div className="text-sm text-gray-600 mb-1">Minutes/Month Mobile Usage</div>
                <div className="text-xs text-orange-600 font-medium">vs {marketData.superConsumerMetrics.nationalAverageMinutes} national average</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-2">{marketData.superConsumerMetrics.smartphoneOnlyUsers}%</div>
                <div className="text-sm text-gray-600 mb-1">Smartphone-Only Internet</div>
                <div className="text-xs text-orange-600 font-medium">vs {marketData.superConsumerMetrics.generalPopulationSmartphoneOnly}% general population</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-2">{marketData.superConsumerMetrics.digitalVideoPenetration}%</div>
                <div className="text-sm text-gray-600 mb-1">Digital Video Penetration</div>
                <div className="text-xs text-orange-600 font-medium">Highest among racial/ethnic groups</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-2">{marketData.superConsumerMetrics.netflixAccounts}%</div>
                <div className="text-sm text-gray-600 mb-1">Have Netflix Accounts</div>
                <div className="text-xs text-orange-600 font-medium">32% use it several times daily</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-2">{marketData.superConsumerMetrics.smartphoneOwnership}%</div>
                <div className="text-sm text-gray-600 mb-1">Smartphone Ownership</div>
                <div className="text-xs text-orange-600 font-medium">Mobile-first generation</div>
              </div>
            </div>

            <div className="mt-6 bg-orange-100 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-3">Cultural & Language Preferences Drive Loyalty:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-orange-700">{marketData.culturalPreferences.satisfactionIncreaseNativeLanguage}%</div>
                  <div className="text-sm text-gray-700">satisfaction increase with native language service</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-orange-700">{marketData.culturalPreferences.wouldSwitchForNativeLanguage}%</div>
                  <div className="text-sm text-gray-700">would switch for native language support</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-orange-700">{marketData.culturalPreferences.appreciateBrandsSpeakingSpanish}%</div>
                  <div className="text-sm text-gray-700">appreciate brands speaking Spanish</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-orange-700">{marketData.culturalPreferences.wontBuyWithoutLanguageSupport}%</div>
                  <div className="text-sm text-gray-700">won't buy from companies not speaking their language</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The Differentiation Opportunity */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">The Differentiation Opportunity</h1>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Dialect-Specific Translation: Verizon's Competitive Moat</h3>

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Current State */}
              <div className="bg-gray-100 rounded-lg p-6 border-2 border-gray-300">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-gray-600" />
                  ALL CARRIERS TODAY (Generic Spanish)
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span><span className="font-semibold">{marketData.translationQuality.genericSpanish}%</span> translation quality</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>One-size-fits-all approach</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>No dialect recognition<br/><span className="text-xs">(Mexican = Puerto Rican = Colombian = Cuban)</span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Limited cultural context</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span>Customers feel like an afterthought</span>
                  </div>
                </div>
              </div>

              {/* Verizon's Opportunity */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-6 border-2 border-blue-400">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  VERIZON'S COMPETITIVE MOAT (Dialect-Specific)
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span><span className="font-semibold">{marketData.translationQuality.dialectSpecific.min}-{marketData.translationQuality.dialectSpecific.max}%</span> translation quality</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Personalized by origin/preference</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Dialect recognition:<br/>
                      <span className="text-xs ml-4">- Mexican Spanish ({marketData.dialectDistribution.mexican}% of market)</span><br/>
                      <span className="text-xs ml-4">- Puerto Rican Spanish ({marketData.dialectDistribution.puertoRican}% of market)</span><br/>
                      <span className="text-xs ml-4">- Colombian, Cuban, Central American variants</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Cultural context (idioms, formality, expressions)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Customers feel understood and valued</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why This is a Moat */}
            <div className="bg-blue-100 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3">Why This is a Defensible Competitive Moat:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700"><span className="font-semibold">First-mover advantage</span> in telecom (no major carrier offers this)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700"><span className="font-semibold">Difficult to replicate</span> quickly (12-18 months for competitors)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700"><span className="font-semibold">Builds deep loyalty</span> through cultural authenticity</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700"><span className="font-semibold">Aligns with premium brand</span> positioning</span>
                </div>
              </div>
            </div>

            {/* End-to-End Coverage */}
            <div className="mt-6 bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-3">End-to-End Dialect-Specific Coverage:</h4>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Account Management & Billing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Customer Service (Voice, Chat, Email)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Product Documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Mobile App Interface</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Website Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Support Articles & FAQs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>IVR (Voice Response)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>In-Store Materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Field Service Communications</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Growth Scenarios */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Growth Scenarios & Financial Impact</h1>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The ${marketData.marketGap.revenue}B Opportunity</h3>

            {/* Scenario Selector */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-700 font-semibold">Select Scenario:</span>
                <div className="flex gap-3">
                  {(['conservative', 'moderate', 'aggressive'] as ScenarioType[]).map((scenario) => (
                    <button
                      key={scenario}
                      onClick={() => setSelectedScenario(scenario)}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        selectedScenario === scenario
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Scenario Display */}
              <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-green-400">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-2xl font-bold text-gray-900">
                    {selectedScenario.charAt(0).toUpperCase() + selectedScenario.slice(1)} Scenario
                  </h4>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Gap Capture</div>
                    <div className="text-3xl font-bold text-green-600">{scenario.gapCapturePercent}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">New Subscribers (5yr)</div>
                    <div className="text-3xl font-bold text-green-700">+{scenario.newSubscribers}M</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Incremental Revenue</div>
                    <div className="text-3xl font-bold text-green-700">${scenario.incrementalRevenue}B</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">New Market Share</div>
                    <div className="text-3xl font-bold text-green-700">{scenario.newMarketShare}%</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Revenue Increase</div>
                    <div className="text-3xl font-bold text-green-700">+{scenario.revenueIncrease}%</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Hispanic % of Customer Base:</div>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-lg font-semibold text-gray-700">{marketData.competitiveLandscape.verizon.hispanicPercentOfBase}%</span>
                      <span className="text-sm text-gray-500 ml-1">(current)</span>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div>
                      <span className="text-2xl font-bold text-green-600">{scenario.hispanicPercentOfBase}%</span>
                      <span className="text-sm text-green-600 ml-1">(target)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario Comparison Table */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-4">Scenario Comparison (5-Year Impact)</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-gray-700">Metric</th>
                      <th className="text-center py-3 px-4 text-gray-700">Conservative</th>
                      <th className="text-center py-3 px-4 text-gray-700 bg-green-50">Moderate</th>
                      <th className="text-center py-3 px-4 text-gray-700">Aggressive</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-gray-700">% of Gap Captured</td>
                      <td className="text-center py-3 px-4">{marketData.growthScenarios.conservative.gapCapturePercent}%</td>
                      <td className="text-center py-3 px-4 bg-green-50 font-semibold">{marketData.growthScenarios.moderate.gapCapturePercent}%</td>
                      <td className="text-center py-3 px-4">{marketData.growthScenarios.aggressive.gapCapturePercent}%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-gray-700">New Subscribers</td>
                      <td className="text-center py-3 px-4">+{marketData.growthScenarios.conservative.newSubscribers}M</td>
                      <td className="text-center py-3 px-4 bg-green-50 font-semibold">+{marketData.growthScenarios.moderate.newSubscribers}M</td>
                      <td className="text-center py-3 px-4">+{marketData.growthScenarios.aggressive.newSubscribers}M</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-green-100">
                      <td className="py-3 px-4 text-gray-900 font-bold">Incremental Annual Revenue</td>
                      <td className="text-center py-3 px-4 font-bold text-green-700">${marketData.growthScenarios.conservative.incrementalRevenue}B</td>
                      <td className="text-center py-3 px-4 bg-green-200 font-bold text-green-800">${marketData.growthScenarios.moderate.incrementalRevenue}B</td>
                      <td className="text-center py-3 px-4 font-bold text-green-700">${marketData.growthScenarios.aggressive.incrementalRevenue}B</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-gray-700">New Market Share</td>
                      <td className="text-center py-3 px-4">{marketData.growthScenarios.conservative.newMarketShare}%</td>
                      <td className="text-center py-3 px-4 bg-green-50 font-semibold">{marketData.growthScenarios.moderate.newMarketShare}%</td>
                      <td className="text-center py-3 px-4">{marketData.growthScenarios.aggressive.newMarketShare}%</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-gray-700">Hispanic % of Base</td>
                      <td className="text-center py-3 px-4">{marketData.growthScenarios.conservative.hispanicPercentOfBase}%</td>
                      <td className="text-center py-3 px-4 bg-green-50 font-semibold">{marketData.growthScenarios.moderate.hispanicPercentOfBase}%</td>
                      <td className="text-center py-3 px-4">{marketData.growthScenarios.aggressive.hispanicPercentOfBase}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">The Window is Closing</h2>
            <p className="text-xl mb-6 text-blue-100">
              T-Mobile added {marketData.competitiveLandscape.tMobile.netAdds2024}M subscribers in 2024 vs Verizon's {marketData.competitiveLandscape.verizon.netAdds2024}M. 
              Every quarter of delay means losing more ground in the fastest-growing demographic segment.
            </p>
            <div className="flex justify-center gap-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold">{marketData.marketOverview.percentOfUSGrowth}%</div>
                <div className="text-sm text-blue-100">of U.S. growth is Hispanic</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold">12-18 mo</div>
                <div className="text-sm text-blue-100">First-mover window</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl font-bold">${scenario.incrementalRevenue}B</div>
                <div className="text-sm text-blue-100">Opportunity at stake</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ExecutiveIntroductionV2;

