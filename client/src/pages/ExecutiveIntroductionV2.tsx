import React, { useState } from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, Target, DollarSign, Users, Globe, Zap, CheckCircle, XCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import marketData from '../../../data/hispanicMarketData.json';
import SourceTooltip from '../components/SourceTooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

type ScenarioType = 'conservative' | 'moderate' | 'aggressive';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  id, 
  title, 
  isExpanded, 
  onToggle, 
  children 
}) => {
  console.log(`CollapsibleSection [${id}]: isExpanded=${isExpanded}, will render content: ${isExpanded}`);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>
      {isExpanded && (
        <div className="p-6 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

const ExecutiveIntroductionV2: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('aggressive');
  const [activeSection, setActiveSection] = useState<string>('market-overview');
  
  // Individual state for each collapsible section - ALL START AS FALSE (hidden)
  const [culturalPreferencesExpanded, setCulturalPreferencesExpanded] = useState(false);
  const [dialectComparisonExpanded, setDialectComparisonExpanded] = useState(false);
  const [dialectDistributionExpanded, setDialectDistributionExpanded] = useState(false);
  const [endToEndCoverageExpanded, setEndToEndCoverageExpanded] = useState(false);
  const [scenarioComparisonExpanded, setScenarioComparisonExpanded] = useState(false);
  const [scenarioRationaleExpanded, setScenarioRationaleExpanded] = useState(false);

  // Debug logging
  console.log('=== COLLAPSIBLE SECTIONS STATE ===');
  console.log('culturalPreferencesExpanded:', culturalPreferencesExpanded);
  console.log('dialectComparisonExpanded:', dialectComparisonExpanded);
  console.log('dialectDistributionExpanded:', dialectDistributionExpanded);
  console.log('endToEndCoverageExpanded:', endToEndCoverageExpanded);
  console.log('scenarioComparisonExpanded:', scenarioComparisonExpanded);
  console.log('scenarioRationaleExpanded:', scenarioRationaleExpanded);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSection(sectionId);
    }
  };

  const expandAll = () => {
    setCulturalPreferencesExpanded(true);
    setDialectComparisonExpanded(true);
    setDialectDistributionExpanded(true);
    setEndToEndCoverageExpanded(true);
    setScenarioComparisonExpanded(true);
    setScenarioRationaleExpanded(true);
  };

  const collapseAll = () => {
    setCulturalPreferencesExpanded(false);
    setDialectComparisonExpanded(false);
    setDialectDistributionExpanded(false);
    setEndToEndCoverageExpanded(false);
    setScenarioComparisonExpanded(false);
    setScenarioRationaleExpanded(false);
  };

  const scenario = marketData.growthScenarios[selectedScenario];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Executive Summary Banner with Integrated Navigation - Sticky */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-3 md:px-8">
          {/* Top Row: Summary and Expand/Collapse */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-2 md:py-4">
            <div className="flex-1">
              <h2 className="text-lg md:text-2xl font-bold mb-1">Executive Summary</h2>
              <p className="text-blue-100 text-xs md:text-base">
                Capture {scenario.gapCapturePercent}% of the Hispanic market through dialect-specific translation, generating ${scenario.annualRevenue}B annual revenue (${scenario.fiveYearRevenue}B over 5 years) and strengthening Verizon's market position.
              </p>
            </div>
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={expandAll}
                className="px-2 py-1 md:px-3 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
              >
                <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-2 py-1 md:px-3 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
              >
                <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
                Collapse All
              </button>
            </div>
          </div>
          
          {/* Bottom Row: Section Navigation */}
          <nav className="flex overflow-x-auto border-t border-white/20 -mx-3 md:-mx-8 px-3 md:px-8">
            <button
              onClick={() => scrollToSection('market-overview')}
              className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeSection === 'market-overview'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white hover:border-white/50'
              }`}
            >
              Market Overview
            </button>
            <button
              onClick={() => scrollToSection('winning-strategy')}
              className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeSection === 'winning-strategy'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white hover:border-white/50'
              }`}
            >
              Winning Strategy
            </button>
            <button
              onClick={() => scrollToSection('super-consumer')}
              className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeSection === 'super-consumer'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white hover:border-white/50'
              }`}
            >
              Super Consumer
            </button>
            <button
              onClick={() => scrollToSection('differentiation')}
              className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeSection === 'differentiation'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white hover:border-white/50'
              }`}
            >
              Differentiation
            </button>
            <button
              onClick={() => scrollToSection('growth-scenarios')}
              className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeSection === 'growth-scenarios'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white hover:border-white/50'
              }`}
            >
              Growth Scenarios
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 py-4 md:px-8 md:py-6">
        
        {/* Section 1: The Strategic Opportunity */}
        <section id="market-overview" className="mb-6 md:mb-10 scroll-mt-[120px] md:scroll-mt-[140px]">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <TrendingUp className="w-5 h-5 md:w-8 md:h-8 text-blue-600" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">The Strategic Opportunity</h1>
          </div>

          {/* Hero Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 p-3 md:p-6 rounded-lg mb-3 md:mb-6">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
              The $65.5B U.S. Hispanic Wireless Market
              <SourceTooltip 
                source="U.S. Census Bureau (2023), Wireless Industry Analysis" 
                detail="62M Hispanic consumers × $1,058 average annual wireless spend = $65.5B TAM" 
              />
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              T-Mobile dominates with 50.2% share while Verizon holds only 26.9%
            </p>

            {/* Competitive Comparison Cards */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
              {/* T-Mobile */}
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-md border-2 border-purple-200">
                <div className="text-sm font-semibold text-purple-600 mb-2">T-MOBILE</div>
                <div className="text-4xl font-bold text-purple-700 mb-1">50.2%
                  <SourceTooltip 
                    source="Wireless Market Share Analysis Q4 2024" 
                    detail="T-Mobile Hispanic market share based on subscriber data and market research" 
                  />
                </div>
                <div className="text-gray-600 mb-3">Market Share</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers:</span>
                    <span className="font-semibold">32.4M
                      <SourceTooltip 
                        source="T-Mobile Q4 2024 Earnings Report" 
                        detail="Hispanic subscriber count from quarterly earnings and demographic analysis" 
                      />
                    </span>
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
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-md border-2 border-red-200">
                <div className="text-sm font-semibold text-red-600 mb-2">VERIZON</div>
                <div className="text-4xl font-bold text-red-700 mb-1">26.9%
                  <SourceTooltip 
                    source="Verizon Q4 2024 Earnings Report" 
                    detail="Verizon Hispanic market share: 17.4M subscribers ÷ 64.6M total Hispanic wireless subscribers" 
                  />
                </div>
                <div className="text-gray-600 mb-3">Market Share</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers:</span>
                    <span className="font-semibold">17.4M
                      <SourceTooltip 
                        source="Verizon Q4 2024 Earnings Report" 
                        detail="Hispanic subscriber count from Verizon quarterly earnings and demographic segmentation" 
                      />
                    </span>
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
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-md border-2 border-blue-200">
                <div className="text-sm font-semibold text-blue-600 mb-2">AT&T</div>
                <div className="text-4xl font-bold text-blue-700 mb-1">20.1%
                  <SourceTooltip 
                    source="AT&T Q4 2024 Earnings Report" 
                    detail="AT&T Hispanic market share based on subscriber data and market analysis" 
                  />
                </div>
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
            <div className="bg-red-100 border-2 border-red-300 rounded-lg p-3 md:p-4">
              <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-700">${marketData.marketGap.revenue}B</div>
                  <div className="text-sm text-blue-600 font-medium mt-1">Growth Opportunity</div>
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

        {/* Section 2: How Verizon Can Win in This Space */}
        <section id="winning-strategy" className="mb-6 md:mb-10 scroll-mt-[120px] md:scroll-mt-[140px]">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">How Verizon Can Win in This Space</h1>
          </div>

          {/* Three Strategy Cards - Side by Side with Modals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1: T-Mobile Strategy */}
            <Dialog>
              <div className="bg-white rounded-lg border-2 border-purple-200 p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900">T-Mobile's Playbook</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">50.2% market share through cultural positioning and value</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-700">• FIFA partnerships & Latino artists</div>
                  <div className="text-xs text-gray-700">• Consumer-friendly pricing</div>
                  <div className="text-xs text-gray-700">• ${marketData.tMobileStrategy.hometownGrants}M+ community investment</div>
                </div>
                <DialogTrigger asChild>
                  <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Learn More
                  </button>
                </DialogTrigger>
              </div>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>T-Mobile's Winning Playbook: How They Captured 50.2% Market Share</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-sm">Cultural Positioning</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• FIFA partnerships, Latino artists</li>
                          <li>• "Leading provider for Latinos"</li>
                          <li>• Latino Mobile Trends Report</li>
                          <li>• Authentic cultural engagement</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-sm">Value Proposition</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Consumer-friendly pricing</li>
                          <li>• Targets lower median income demo</li>
                          <li>• Transparent, simple plans</li>
                          <li>• Family plan incentives</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-sm">Community Investment</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• ${marketData.tMobileStrategy.hometownGrants}M+ Hometown Grants</li>
                          <li>• Friday Night 5G Lights</li>
                          <li>• Hispanic community programs</li>
                          <li>• Local market activation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 text-sm">Loyalty Programs</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Stateside International Talk</li>
                          <li>• Matricula consular program</li>
                          <li>• T-Mobile Tuesdays rewards</li>
                          <li>• International roaming benefits</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-100 rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-purple-700">{marketData.competitiveLandscape.tMobile.hispanicPercentOfBase}%+</div>
                      <div className="text-xs text-purple-600 mt-1">Hispanic % of Base</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-700">{marketData.competitiveLandscape.tMobile.churnRate}%</div>
                      <div className="text-xs text-purple-600 mt-1">Lowest Churn Rate</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-700">+{marketData.competitiveLandscape.tMobile.netAdds2024}M</div>
                      <div className="text-xs text-purple-600 mt-1">2024 Net Adds</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-700">#1</div>
                      <div className="text-xs text-purple-600 mt-1">Customer Satisfaction</div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Card 2: AT&T Infrastructure */}
            <Dialog>
              <div className="bg-white rounded-lg border-2 border-blue-200 p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900">AT&T's Infrastructure</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">25+ years of bilingual investment and infrastructure</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-700">• 770+ bilingual stores</div>
                  <div className="text-xs text-gray-700">• 22 Spanish call centers</div>
                  <div className="text-xs text-gray-700">• $14.1B Hispanic revenue</div>
                </div>
                <DialogTrigger asChild>
                  <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Learn More
                  </button>
                </DialogTrigger>
              </div>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>AT&T's Infrastructure Moat: 25+ Years of Bilingual Investment</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Physical Infrastructure</h4>
                    <ul className="text-xs text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>770+ bilingual stores</strong> (established since 2006)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>22 Spanish call centers</strong> (25+ years of operation)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Dedicated bilingual staff nationwide</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Market Position</h4>
                    <ul className="text-xs text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>$14.1B annual Hispanic revenue</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span><strong>20.1% market share</strong> (13.0M subscribers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>41.5% fiber convergence penetration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Card 3: Verizon's Opportunity */}
            <Dialog>
              <div className="bg-white rounded-lg border-2 border-green-200 p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-6 h-6 text-green-600" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900">Verizon's Opportunity</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Market expansion potential through differentiation</p>
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-700">• Dialect-specific translation</div>
                  <div className="text-xs text-gray-700">• AI-powered personalization</div>
                  <div className="text-xs text-gray-700">• Premium network advantage</div>
                </div>
                <DialogTrigger asChild>
                  <button className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Learn More
                  </button>
                </DialogTrigger>
              </div>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Verizon's Growth Opportunity: Market Expansion Potential</DialogTitle>
                </DialogHeader>
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-3">Current Market Position</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="text-sm text-gray-700"><strong>26.9% market share</strong></div>
                      <div className="text-xs text-gray-600">17.4M Hispanic subscribers</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="text-sm text-gray-700"><strong>$9.7B annual revenue</strong></div>
                      <div className="text-xs text-gray-600">From Hispanic segment</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Growth Opportunities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-xs text-gray-700"><strong>Dialect-specific translation</strong></div>
                      <div className="text-xs text-gray-600">First-mover advantage in authentic localization</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-xs text-gray-700"><strong>Premium network positioning</strong></div>
                      <div className="text-xs text-gray-600">Leverage superior 5G infrastructure</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-xs text-gray-700"><strong>AI-powered personalization</strong></div>
                      <div className="text-xs text-gray-600">Culturally relevant customer experience</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-xs text-gray-700"><strong>Strategic partnerships</strong></div>
                      <div className="text-xs text-gray-600">Community engagement and cultural investment</div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 rounded-lg p-4 text-center border-2 border-green-300 mt-4">
                  <div className="text-sm font-bold text-green-700">
                    Potential: Capture 60% of the market gap = $8.3B additional annual revenue
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Section 3: Super Consumer Behaviors */}
        <section id="super-consumer" className="mb-6 md:mb-10 scroll-mt-[120px] md:scroll-mt-[140px]">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <Zap className="w-8 h-8 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-900">The Hispanic "Super Consumer"</h1>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 rounded-lg p-8 mb-6">
            <p className="text-lg text-gray-700 mb-6">
              Hispanics are the most mobile-engaged demographic in the U.S., with significantly higher usage across all metrics.
            </p>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
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
          </div>

          {/* Cultural Preferences - Collapsible */}
          <CollapsibleSection
            id="cultural-preferences"
            title="Cultural & Language Preferences Drive Loyalty and Switching Behavior"
            isExpanded={culturalPreferencesExpanded}
            onToggle={() => setCulturalPreferencesExpanded(!culturalPreferencesExpanded)}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl font-bold text-orange-700">{marketData.culturalPreferences.satisfactionIncreaseNativeLanguage}%</div>
                  <div className="text-sm text-gray-700 flex-1">satisfaction increase with native language service</div>
                </div>
                <p className="text-xs text-gray-600">Source: Accenture Language Services Study</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl font-bold text-orange-700">{marketData.culturalPreferences.wouldSwitchForNativeLanguage}%</div>
                  <div className="text-sm text-gray-700 flex-1">would switch to competitor for native language support</div>
                </div>
                <p className="text-xs text-gray-600">Source: Common Sense Advisory (CSA Research)</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl font-bold text-orange-700">{marketData.culturalPreferences.appreciateBrandsSpeakingSpanish}%</div>
                  <div className="text-sm text-gray-700 flex-1">appreciate when brands speak Spanish</div>
                </div>
                <p className="text-xs text-gray-600">Source: Nielsen Hispanic Consumer Study</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl font-bold text-orange-700">{marketData.culturalPreferences.wontBuyWithoutLanguageSupport}%</div>
                  <div className="text-sm text-gray-700 flex-1">won't buy from companies not speaking their language</div>
                </div>
                <p className="text-xs text-gray-600">Source: CSA Research Global Survey</p>
              </div>
            </div>

            <div className="mt-6 bg-orange-100 rounded-lg p-4 border border-orange-300">
              <h4 className="font-bold text-gray-900 mb-2">Key Insight:</h4>
              <p className="text-sm text-gray-700">
                Language preference is not just about convenience—it's a powerful driver of brand loyalty, customer satisfaction, and switching behavior. 
                <strong className="text-orange-700"> 68% switching intent</strong> represents massive competitive vulnerability for carriers offering only generic Spanish.
              </p>
            </div>
          </CollapsibleSection>
        </section>

        {/* Section 4: The Differentiation Opportunity */}
        <section id="differentiation" className="mb-6 md:mb-10 scroll-mt-[120px] md:scroll-mt-[140px]">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">The Differentiation Opportunity</h1>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-3 md:p-6 mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Dialect-Specific Translation: Verizon's Competitive Moat</h3>

            {/* Collapsible Sections Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
              <CollapsibleSection
                id="dialect-comparison"
                title="Generic Spanish vs Dialect-Specific Translation: The Quality Gap"
                isExpanded={dialectComparisonExpanded}
                onToggle={() => setDialectComparisonExpanded(!dialectComparisonExpanded)}
              >
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
                <div className="bg-blue-100 rounded-lg p-6 border border-blue-300">
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
              </CollapsibleSection>
              <CollapsibleSection
                id="dialect-distribution"
                title="U.S. Hispanic Market Dialect Distribution"
                isExpanded={dialectDistributionExpanded}
                onToggle={() => setDialectDistributionExpanded(!dialectDistributionExpanded)}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700 mb-1">{marketData.dialectDistribution.mexican}%</div>
                    <div className="text-sm text-gray-600 mb-2">Mexican Spanish</div>
                    <div className="text-xs text-gray-500">~36.8M people</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700 mb-1">{marketData.dialectDistribution.puertoRican}%</div>
                    <div className="text-sm text-gray-600 mb-2">Puerto Rican Spanish</div>
                    <div className="text-xs text-gray-500">~5.8M people</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700 mb-1">{marketData.dialectDistribution.centralAmerican}%</div>
                    <div className="text-sm text-gray-600 mb-2">Central American</div>
                    <div className="text-xs text-gray-500">~5.2M people</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700 mb-1">{marketData.dialectDistribution.cuban}%</div>
                    <div className="text-sm text-gray-600 mb-2">Cuban Spanish</div>
                    <div className="text-xs text-gray-500">~2.6M people</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700 mb-1">{marketData.dialectDistribution.colombian}%</div>
                    <div className="text-sm text-gray-600 mb-2">Colombian Spanish</div>
                    <div className="text-xs text-gray-500">~1.9M people</div>
                  </div>
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700 mb-1">{marketData.dialectDistribution.other}%</div>
                    <div className="text-sm text-gray-600 mb-2">Other Dialects</div>
                    <div className="text-xs text-gray-500">~12.3M people</div>
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong>Strategic Implication:</strong> Mexican Spanish should be prioritized in Phase 1 deployment (57% of market), 
                    followed by Puerto Rican (9%) and Central American (8%) variants in Phase 2.
                  </p>
                </div>
              </CollapsibleSection>
              <CollapsibleSection
                id="end-to-end-coverage"
                title="End-to-End Dialect-Specific Coverage Across All Customer Touchpoints"
                isExpanded={endToEndCoverageExpanded}
                onToggle={() => setEndToEndCoverageExpanded(!endToEndCoverageExpanded)}
              >
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Account Management & Billing</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Customer Service (Voice, Chat, Email)</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Product Documentation</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Mobile App Interface</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Website Content</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Support Articles & FAQs</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>IVR (Voice Response)</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>In-Store Materials</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-200">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Field Service Communications</span>
                </div>
              </div>
              <div className="mt-4 bg-blue-100 rounded-lg p-4 border border-blue-300">
                <p className="text-sm text-gray-700">
                  <strong>Seamless Experience:</strong> Dialect-specific translation across every touchpoint creates a consistent, 
                  culturally authentic experience that builds trust and loyalty—something no competitor currently offers.
                </p>
              </div>
              </CollapsibleSection>
            </div>
          </div>
        </section>

        {/* Section 5: Growth Scenarios */}
        <section id="growth-scenarios" className="mb-6 md:mb-10 scroll-mt-[120px] md:scroll-mt-[140px]">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Growth Scenarios & Financial Impact</h1>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-3 md:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              The ${scenario.fiveYearRevenue}B Opportunity (5-Year)
              <span className="text-lg font-normal text-gray-600 ml-3">({scenario.gapCapturePercent}% of ${marketData.marketGap.revenue}B gap)</span>
            </h3>
            
            {/* Opportunity Explainer */}
            <div className="bg-white rounded-lg p-3 md:p-4 mb-4 border-2 border-green-300 shadow-sm">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-3">The ${scenario.fiveYearRevenue}B Opportunity (5-Year): A Three-Pronged Strategy</h4>
                  <div className="text-sm text-gray-700 space-y-3">
                    <p className="text-gray-600">
                      Dialect-specific multilingual CX enables Verizon to simultaneously <strong>defend</strong> current customers, <strong>capture</strong> share from all competitors, and <strong>grow</strong> with net new customers—generating <strong>${scenario.annualRevenue}B annual revenue (${scenario.fiveYearRevenue}B over 5 years)</strong>.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2 md:gap-3 mt-3">
                      {/* Defend */}
                      <div className="bg-blue-50 rounded-lg p-2 md:p-3 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                          <h5 className="font-bold text-blue-900">DEFEND</h5>
                        </div>
                        <div className="text-xs text-gray-700 space-y-1">
                          <div><strong>{scenario.defend.churnReduction}%</strong> churn reduction</div>
                          <div><strong>{scenario.defend.subscribersRetained}M</strong> subs retained</div>
                          <div><strong>${scenario.defend.revenueProtected}B</strong> revenue protected</div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">Stop the bleeding: Verizon is declining from 39% → 36% share</p>
                      </div>

                      {/* Capture */}
                      <div className="bg-purple-50 rounded-lg p-2 md:p-3 border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                          <h5 className="font-bold text-purple-900">CAPTURE</h5>
                        </div>
                        <div className="text-xs text-gray-700 space-y-1">
                          <div><strong>{scenario.capture.totalCaptured}M</strong> from competitors</div>
                          <div className="ml-2">• {scenario.capture.fromTMobile}M from T-Mobile</div>
                          <div className="ml-2">• {scenario.capture.fromATT}M from AT&T</div>
                          <div><strong>${scenario.capture.revenueFromCapture}B</strong> revenue captured</div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">Take share from T-Mobile, AT&T, and others</p>
                      </div>

                      {/* Grow */}
                      <div className="bg-green-50 rounded-lg p-2 md:p-3 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                          <h5 className="font-bold text-green-900">GROW</h5>
                        </div>
                        <div className="text-xs text-gray-700 space-y-1">
                          <div><strong>{scenario.grow.netNewCustomers}M</strong> net new customers</div>
                          <div><strong>${scenario.grow.revenueFromGrowth}B</strong> new revenue</div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">Market expansion: new entrants, switchers from prepaid/MVNOs</p>
                      </div>
                    </div>

                    <div className="bg-green-100 rounded-lg p-2 md:p-3 mt-3 border border-green-300">
                      <p className="text-xs text-gray-700">
                        <strong className="text-green-800">Total Impact:</strong> Grow from {marketData.competitiveLandscape.verizon.marketShare}% to <strong>{scenario.newMarketShare}% market share</strong> (+{scenario.newSubscribers}M subscribers), increasing Hispanic representation from {marketData.competitiveLandscape.verizon.hispanicPercentOfBase}% to <strong>{scenario.hispanicPercentOfBase}%</strong> of customer base—a <strong>+{scenario.revenueIncrease}% revenue increase</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario Selector */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-700 font-semibold">Select Scenario:</span>
                <div className="flex gap-3">
                  {(['conservative', 'moderate', 'aggressive'] as ScenarioType[]).map((scenarioKey) => (
                    <button
                      key={scenarioKey}
                      onClick={() => setSelectedScenario(scenarioKey)}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        selectedScenario === scenarioKey
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {scenarioKey.charAt(0).toUpperCase() + scenarioKey.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Scenario Display */}
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-lg border-2 border-green-400">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-2xl font-bold text-gray-900">
                    {selectedScenario.charAt(0).toUpperCase() + selectedScenario.slice(1)} Scenario
                  </h4>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Gap Capture</div>
                    <div className="text-3xl font-bold text-green-600">{scenario.gapCapturePercent}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3">
                  <div className="bg-green-50 rounded-lg p-2 md:p-3">
                    <div className="text-sm text-gray-600 mb-1">New Subscribers (5yr)</div>
                    <div className="text-3xl font-bold text-green-700">+{scenario.newSubscribers}M</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 md:p-3">
                    <div className="text-sm text-gray-600 mb-1">Incremental Revenue</div>
                    <div className="text-3xl font-bold text-green-700">${scenario.annualRevenue}B/yr</div>
                    <div className="text-xl font-semibold text-green-600 mt-1">${scenario.fiveYearRevenue}B (5-yr)</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 md:p-3">
                    <div className="text-sm text-gray-600 mb-1">New Market Share</div>
                    <div className="text-3xl font-bold text-green-700">{scenario.newMarketShare}%</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 md:p-3">
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

            {/* Scenario Comparison and Assumptions - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <CollapsibleSection
                id="scenario-comparison"
                title="Scenario Comparison: 5-Year Financial Impact"
                isExpanded={scenarioComparisonExpanded}
                onToggle={() => setScenarioComparisonExpanded(!scenarioComparisonExpanded)}
              >
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
                        <td className="text-center py-3 px-4 font-bold text-green-700">${marketData.growthScenarios.conservative.annualRevenue}B/yr<br/><span className="text-sm">(${marketData.growthScenarios.conservative.fiveYearRevenue}B 5-yr)</span></td>
                        <td className="text-center py-3 px-4 bg-green-200 font-bold text-green-800">${marketData.growthScenarios.moderate.annualRevenue}B/yr<br/><span className="text-sm">(${marketData.growthScenarios.moderate.fiveYearRevenue}B 5-yr)</span></td>
                        <td className="text-center py-3 px-4 font-bold text-green-700">${marketData.growthScenarios.aggressive.annualRevenue}B/yr<br/><span className="text-sm">(${marketData.growthScenarios.aggressive.fiveYearRevenue}B 5-yr)</span></td>
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
              </CollapsibleSection>
              <CollapsibleSection
              id="scenario-rationale"
              title="Scenario Assumptions & Rationale"
              isExpanded={scenarioRationaleExpanded}
              onToggle={() => setScenarioRationaleExpanded(!scenarioRationaleExpanded)}
            >
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-300">
                  <h4 className="font-bold text-gray-900 mb-2">Conservative (25% gap capture)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Modest execution with limited investment</li>
                    <li>• Strong competitive response from T-Mobile/AT&T</li>
                    <li>• Slower rollout (3-4 years to full deployment)</li>
                    <li>• Limited marketing investment</li>
                    <li>• Achieves {marketData.growthScenarios.conservative.newMarketShare}% market share</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-5 border border-green-300">
                  <h4 className="font-bold text-gray-900 mb-2">Moderate (40% gap capture) - Recommended</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Balanced execution with standard investment</li>
                    <li>• Normal competitive dynamics</li>
                    <li>• Phased rollout (2-3 years to full deployment)</li>
                    <li>• Standard marketing investment</li>
                    <li>• Achieves {marketData.growthScenarios.moderate.newMarketShare}% market share</li>
                    <li>• <strong>Most realistic baseline for planning</strong></li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-5 border border-blue-300">
                  <h4 className="font-bold text-gray-900 mb-2">Aggressive (60% gap capture)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Superior execution with heavy investment</li>
                    <li>• Weak competitive response (12-18 month lag)</li>
                    <li>• Rapid rollout (12-18 months to full deployment)</li>
                    <li>• Heavy marketing investment</li>
                    <li>• Achieves {marketData.growthScenarios.aggressive.newMarketShare}% market share</li>
                    <li>• <strong>Achievable with strong executive commitment</strong></li>
                  </ul>
                </div>
              </div>
              </CollapsibleSection>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">The Time to Act is Now</h2>
            <p className="text-xl mb-6 text-blue-100">
              Verizon has a unique opportunity to capture significant market share in the fastest-growing demographic segment. 
              Early movers in dialect-specific CX will establish lasting competitive advantages and customer loyalty.
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
                <div className="text-3xl font-bold">${scenario.annualRevenue}B/yr</div>
                <div className="text-xl font-semibold text-gray-600 mt-1">${scenario.fiveYearRevenue}B (5-yr)</div>
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

