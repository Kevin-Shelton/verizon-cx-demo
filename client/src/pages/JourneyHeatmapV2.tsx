import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Info,
  ArrowRight, Users, Target, Award, Zap, Shield, DollarSign,
  ChevronDown, ChevronUp, Phone, Smartphone, MessageSquare, Store
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import journeyData from '../../../data/journeyMetrics.json';
import hispanicMarketData from '../../../data/hispanicMarketData.json';

type ScenarioType = 'conservative' | 'moderate' | 'aggressive';
type ViewMode = 'verizon-current' | 'tmobile' | 'att' | 'verizon-invictus' | 'comparison';
type DCGPillar = 'defend' | 'capture' | 'grow';

interface JourneyStage {
  id: string;
  name: string;
  description: string;
  touchpoints: string[];
  dcgPillar: DCGPillar;
  metricsWithout: {
    engagement: number;
    dropoffRate: number;
    avgTimeSpent: number;
    conversionRate: number;
    satisfaction: number;
  };
  metricsWith: {
    engagement: number;
    dropoffRate: number;
    avgTimeSpent: number;
    conversionRate: number;
    satisfaction: number;
  };
  painPoints: string[];
  improvements: string[];
  customerQuote: {
    spanish: string;
    dialect: string;
    english: string;
  };
}

export default function JourneyHeatmapV2() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('aggressive');
  const [viewMode, setViewMode] = useState<ViewMode>('comparison');
  const [selectedStage, setSelectedStage] = useState<JourneyStage | null>(null);
  const [expandedStages, setExpandedStages] = useState<{ [key: string]: boolean }>({});

  const marketData = hispanicMarketData;
  const scenario = marketData.growthScenarios[selectedScenario];
  const stages = journeyData.journeyStages as JourneyStage[];

  // Add D-C-G pillar mapping to stages
  const stagesWithDCG = stages.map(stage => ({
    ...stage,
    dcgPillar: 
      ['awareness', 'consideration'].includes(stage.id) ? 'capture' as DCGPillar :
      ['purchase', 'onboarding', 'support'].includes(stage.id) ? 'defend' as DCGPillar :
      'grow' as DCGPillar
  }));

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const expandAll = () => {
    const allStages = stagesWithDCG.reduce((acc, stage) => ({
      ...acc,
      [stage.id]: true
    }), {});
    setExpandedStages(allStages);
  };

  const collapseAll = () => {
    setExpandedStages({});
  };

  const getDCGColor = (pillar: DCGPillar) => {
    switch (pillar) {
      case 'defend': return 'blue';
      case 'capture': return 'purple';
      case 'grow': return 'green';
    }
  };

  const getDCGIcon = (pillar: DCGPillar) => {
    switch (pillar) {
      case 'defend': return Shield;
      case 'capture': return Target;
      case 'grow': return TrendingUp;
    }
  };

  // Competitive benchmarks (estimated based on market data)
  const competitiveBenchmarks = {
    tmobile: {
      engagement: 82,
      dropoffRate: 12,
      conversionRate: 32,
      satisfaction: 88,
      churnRate: 0.86,
      nps: 68
    },
    att: {
      engagement: 75,
      dropoffRate: 18,
      conversionRate: 26,
      satisfaction: 80,
      churnRate: 1.2,
      nps: 58
    },
    verizonCurrent: {
      engagement: 52,
      dropoffRate: 38,
      conversionRate: 15,
      satisfaction: 62,
      churnRate: 2.1,
      nps: 42
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Crisis Context Hero */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Map className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Customer Journey Performance Analysis</h1>
            </div>
            <p className="text-xl text-red-100 mb-6 max-w-4xl">
              Verizon's journey underperforms T-Mobile at every stage, driving higher churn and lower lifetime value. Dialect-specific CX can reverse this trend and help capture <strong>${scenario.annualRevenue}B annual revenue (${scenario.fiveYearRevenue}B over 5 years)</strong>.
            </p>

            {/* Crisis Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-red-100 mb-1">Current Engagement</div>
                <div className="text-3xl font-bold">{competitiveBenchmarks.verizonCurrent.engagement}%</div>
                <div className="text-xs text-red-200 mt-1">vs T-Mobile's {competitiveBenchmarks.tmobile.engagement}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-red-100 mb-1">Current Churn Rate</div>
                <div className="text-3xl font-bold">{competitiveBenchmarks.verizonCurrent.churnRate}%</div>
                <div className="text-xs text-red-200 mt-1">vs T-Mobile's {competitiveBenchmarks.tmobile.churnRate}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-red-100 mb-1">Current NPS</div>
                <div className="text-3xl font-bold">{competitiveBenchmarks.verizonCurrent.nps}</div>
                <div className="text-xs text-red-200 mt-1">vs T-Mobile's {competitiveBenchmarks.tmobile.nps}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-red-100 mb-1">Revenue at Risk</div>
                <div className="text-3xl font-bold">$6.6B</div>
                <div className="text-xs text-red-200 mt-1">From journey gaps</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Sticky Controls Section */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-md rounded-lg mb-8 p-6">
          {/* Scenario Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Select Growth Scenario</h3>
            <div className="flex gap-3 mb-4">
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

            {/* Scenario Impact Summary */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-xs text-purple-700 mb-1">Churn Reduction</div>
                  <div className="text-xl font-bold text-purple-900">{scenario.defend.churnReduction}%</div>
                </div>
                <div>
                  <div className="text-xs text-purple-700 mb-1">New Subscribers</div>
                  <div className="text-xl font-bold text-purple-900">+{scenario.newSubscribers}M</div>
                </div>
                <div>
                  <div className="text-xs text-purple-700 mb-1">Market Share</div>
                  <div className="text-xl font-bold text-purple-900">{scenario.newMarketShare}%</div>
                </div>
                <div>
                  <div className="text-xs text-purple-700 mb-1">Revenue</div>
                  <div className="text-xl font-bold text-purple-900">${scenario.annualRevenue}B/yr</div>
                  <div className="text-xs text-purple-600">(${scenario.fiveYearRevenue}B 5-yr)</div>
                </div>
              </div>
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Select View Mode</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { id: 'verizon-current' as ViewMode, label: 'Verizon Current', color: 'red', icon: AlertCircle },
                { id: 'tmobile' as ViewMode, label: 'T-Mobile', color: 'pink', icon: Award },
                { id: 'att' as ViewMode, label: 'AT&T', color: 'blue', icon: Shield },
                { id: 'verizon-invictus' as ViewMode, label: 'Verizon + Invictus', color: 'green', icon: CheckCircle },
                { id: 'comparison' as ViewMode, label: '4-Way Comparison', color: 'purple', icon: TrendingUp }
              ].map(({ id, label, color, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    viewMode === id
                      ? `border-${color}-600 bg-${color}-50 shadow-md`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${viewMode === id ? `text-${color}-600` : 'text-gray-400'}`} />
                  <div className={`text-sm font-medium ${viewMode === id ? `text-${color}-900` : 'text-gray-700'}`}>
                    {label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Expand/Collapse All Controls */}
          <div className="flex justify-end gap-3">
            <button
              onClick={expandAll}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <ChevronDown className="w-4 h-4" />
              Expand All Stages
            </button>
            <button
              onClick={collapseAll}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2"
            >
              <ChevronUp className="w-4 h-4" />
              Collapse All Stages
            </button>
          </div>
        </div>

        {/* Journey Stages with D-C-G Framework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Journey Stages Performance</h2>
          
          <div className="space-y-6">
            {stagesWithDCG.map((stage, index) => {
              const DCGIcon = getDCGIcon(stage.dcgPillar);
              const dcgColor = getDCGColor(stage.dcgPillar);
              
              return (
                <Card key={stage.id} className="border-2 border-gray-200">
                  <CardHeader className={`bg-${dcgColor}-50 border-b-2 border-${dcgColor}-200 cursor-pointer hover:bg-${dcgColor}-100 transition-colors`} onClick={() => toggleStage(stage.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-${dcgColor}-100 rounded-lg`}>
                          <DCGIcon className={`w-6 h-6 text-${dcgColor}-600`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{stage.name}</CardTitle>
                          <CardDescription className="mt-1">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 bg-${dcgColor}-100 text-${dcgColor}-800 text-xs font-semibold rounded-full`}>
                              {stage.dcgPillar.toUpperCase()}
                            </span>
                            <span className="ml-2 text-gray-600">{stage.description}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                        {expandedStages[stage.id] ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {/* Comparison View */}
                  {viewMode === 'comparison' && (
                    <CardContent className="pt-6">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b-2 border-gray-200">
                              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Metric</th>
                              <th className="text-center py-3 px-4 text-sm font-semibold text-red-700">Verizon Current</th>
                              <th className="text-center py-3 px-4 text-sm font-semibold text-pink-700">T-Mobile</th>
                              <th className="text-center py-3 px-4 text-sm font-semibold text-blue-700">AT&T</th>
                              <th className="text-center py-3 px-4 text-sm font-semibold text-green-700">Verizon + Invictus</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { key: 'engagement', label: 'Engagement', suffix: '%' },
                              { key: 'dropoffRate', label: 'Dropoff Rate', suffix: '%', inverse: true },
                              { key: 'conversionRate', label: 'Conversion', suffix: '%' },
                              { key: 'satisfaction', label: 'Satisfaction', suffix: '%' }
                            ].map(metric => (
                              <tr key={metric.key} className="border-b border-gray-100">
                                <td className="py-3 px-4 text-sm font-medium text-gray-900">{metric.label}</td>
                                <td className="py-3 px-4 text-center">
                                  <span className="text-lg font-bold text-red-600">
                                    {stage.metricsWithout[metric.key as keyof typeof stage.metricsWithout]}{metric.suffix}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className="text-lg font-bold text-pink-600">
                                    {Math.round(stage.metricsWith[metric.key as keyof typeof stage.metricsWith] * 0.95)}{metric.suffix}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className="text-lg font-bold text-blue-600">
                                    {Math.round(stage.metricsWith[metric.key as keyof typeof stage.metricsWith] * 0.88)}{metric.suffix}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <span className="text-lg font-bold text-green-600">
                                    {stage.metricsWith[metric.key as keyof typeof stage.metricsWith]}{metric.suffix}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  )}

                  {/* Single View Mode */}
                  {viewMode !== 'comparison' && (
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { key: 'engagement', label: 'Engagement', suffix: '%' },
                          { key: 'dropoffRate', label: 'Dropoff Rate', suffix: '%' },
                          { key: 'conversionRate', label: 'Conversion', suffix: '%' },
                          { key: 'satisfaction', label: 'Satisfaction', suffix: '%' }
                        ].map(metric => {
                          const value = viewMode === 'verizon-current' 
                            ? stage.metricsWithout[metric.key as keyof typeof stage.metricsWithout]
                            : viewMode === 'verizon-invictus'
                            ? stage.metricsWith[metric.key as keyof typeof stage.metricsWith]
                            : viewMode === 'tmobile'
                            ? Math.round(stage.metricsWith[metric.key as keyof typeof stage.metricsWith] * 0.95)
                            : Math.round(stage.metricsWith[metric.key as keyof typeof stage.metricsWith] * 0.88);

                          return (
                            <div key={metric.key} className="text-center p-4 bg-gray-50 rounded-lg">
                              <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                              <div className="text-3xl font-bold text-gray-900">{value}{metric.suffix}</div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}

                  {/* Expanded Details */}
                  {expandedStages[stage.id] && (
                    <CardContent className="pt-0 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Pain Points */}
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            Current Pain Points
                          </h4>
                          <ul className="space-y-2">
                            {stage.painPoints.map((pain, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-red-500 mt-0.5">•</span>
                                <span>{pain}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Improvements */}
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Invictus Improvements
                          </h4>
                          <ul className="space-y-2">
                            {stage.improvements.map((improvement, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Customer Quote */}
                      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-yellow-900 mb-2">
                              Customer Voice ({stage.customerQuote.dialect})
                            </div>
                            <p className="text-sm text-yellow-800 italic mb-3">
                              "{stage.customerQuote.spanish}"
                            </p>
                            <p className="text-xs text-yellow-700 border-t border-yellow-200 pt-2">
                              <span className="font-semibold">English:</span> "{stage.customerQuote.english}"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* D-C-G Impact */}
                      <div className={`mt-6 bg-${dcgColor}-50 border-2 border-${dcgColor}-200 rounded-lg p-4`}>
                        <h4 className={`font-bold text-${dcgColor}-900 mb-3 flex items-center gap-2`}>
                          <DCGIcon className={`w-5 h-5 text-${dcgColor}-600`} />
                          {stage.dcgPillar.toUpperCase()} Impact
                        </h4>
                        <div className="text-sm text-gray-700">
                          {stage.dcgPillar === 'defend' && (
                            <div>
                              <p className="mb-2">
                                <strong>Churn Reduction:</strong> Improving this stage reduces early churn by <strong>{scenario.defend.churnReduction}%</strong>, retaining <strong>{scenario.defend.subscribersRetained}M</strong> customers and protecting <strong>${scenario.defend.revenueProtected}B</strong> in revenue.
                              </p>
                            </div>
                          )}
                          {stage.dcgPillar === 'capture' && (
                            <div>
                              <p className="mb-2">
                                <strong>Competitive Capture:</strong> Superior experience at this stage helps win <strong>{scenario.capture.totalCaptured}M</strong> customers from competitors (T-Mobile: {scenario.capture.fromTMobile}M, AT&T: {scenario.capture.fromATT}M), generating <strong>${scenario.capture.revenueFromCapture}B</strong> in new revenue.
                              </p>
                            </div>
                          )}
                          {stage.dcgPillar === 'grow' && (
                            <div>
                              <p className="mb-2">
                                <strong>Market Expansion:</strong> Exceptional experience drives word-of-mouth and referrals, attracting <strong>{scenario.grow.netNewCustomers}M</strong> net new customers and generating <strong>${scenario.grow.revenueFromGrowth}B</strong> in incremental revenue.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Overall Journey Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-white border-2 border-green-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-green-600" />
                End-to-End Journey Impact ({selectedScenario.charAt(0).toUpperCase() + selectedScenario.slice(1)} Scenario)
              </CardTitle>
              <CardDescription>
                Overall business impact of dialect-specific CX across entire customer lifecycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Defend */}
                <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="text-xl font-bold text-blue-900">DEFEND</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Churn Reduction:</span>
                      <span className="font-bold text-blue-900">{scenario.defend.churnReduction}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Customers Retained:</span>
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
                    <h3 className="text-xl font-bold text-purple-900">CAPTURE</h3>
                  </div>
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
                      <span className="text-gray-600">Revenue Captured:</span>
                      <span className="font-bold text-purple-900">${scenario.capture.revenueFromCapture}B</span>
                    </div>
                  </div>
                </div>

                {/* Grow */}
                <div className="bg-green-50 rounded-lg p-6 border-2 border-green-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <h3 className="text-xl font-bold text-green-900">GROW</h3>
                  </div>
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

              {/* Total Impact */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-sm text-green-100 mb-1">Total New Subscribers</div>
                    <div className="text-3xl font-bold">+{scenario.newSubscribers}M</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-100 mb-1">Incremental Revenue</div>
                    <div className="text-3xl font-bold">${scenario.annualRevenue}B/yr</div>
                    <div className="text-lg font-semibold text-green-200">${scenario.fiveYearRevenue}B (5-yr)</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-100 mb-1">New Market Share</div>
                    <div className="text-3xl font-bold">{scenario.newMarketShare}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-100 mb-1">Revenue Increase</div>
                    <div className="text-3xl font-bold">+{scenario.revenueIncrease}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

