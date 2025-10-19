import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Info,
  ArrowRight,
  Users,
  Target,
  Award,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import journeyData from '../../../data/journeyMetrics.json';

interface JourneyMetrics {
  engagement: number;
  dropoffRate: number;
  avgTimeSpent: number;
  conversionRate: number;
  satisfaction: number;
}

interface JourneyStage {
  id: string;
  name: string;
  description: string;
  touchpoints: string[];
  metricsWithout: JourneyMetrics;
  metricsWith: JourneyMetrics;
  painPoints: string[];
  improvements: string[];
  customerQuote: string;
}

interface JourneyData {
  journeyStages: JourneyStage[];
  overallMetrics: {
    without: {
      endToEndConversion: number;
      avgCustomerSatisfaction: number;
      nps: number;
      churnRate: number;
      avgLifetimeValue: number;
      recommendationRate: number;
    };
    with: {
      endToEndConversion: number;
      avgCustomerSatisfaction: number;
      nps: number;
      churnRate: number;
      avgLifetimeValue: number;
      recommendationRate: number;
    };
  };
  impactSummary: {
    conversionImprovement: number;
    satisfactionImprovement: number;
    npsImprovement: number;
    churnReduction: number;
    lifetimeValueIncrease: number;
    recommendationIncrease: number;
  };
  researchInsights: Array<{
    metric: string;
    description: string;
    source: string;
  }>;
}

const data = journeyData as JourneyData;

export default function JourneyHeatmap() {
  const [viewMode, setViewMode] = useState<'without' | 'with'>('without');
  const [selectedStage, setSelectedStage] = useState<JourneyStage | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const getHeatmapColor = (value: number, isDropoff: boolean = false) => {
    if (isDropoff) {
      // For dropoff rate: higher is worse
      if (value >= 35) return 'from-red-500 to-red-600';
      if (value >= 20) return 'from-orange-500 to-orange-600';
      return 'from-green-500 to-green-600';
    } else {
      // For engagement/satisfaction: higher is better
      if (value >= 80) return 'from-green-500 to-green-600';
      if (value >= 60) return 'from-yellow-500 to-yellow-600';
      return 'from-red-500 to-red-600';
    }
  };

  const getMetricDelta = (without: number, with_: number, isDropoff: boolean = false) => {
    const delta = with_ - without;
    const percentChange = ((delta / without) * 100).toFixed(0);
    const isPositive = isDropoff ? delta < 0 : delta > 0;
    return {
      delta: Math.abs(delta).toFixed(0),
      percentChange: Math.abs(parseFloat(percentChange)),
      isPositive,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Map className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Customer Journey Heatmap</h1>
            </div>
            <p className="text-xl text-red-100 max-w-3xl">
              Visualize where customers drop off without multilingual support and how engagement
              improves with dialect-specific experiences across the entire journey.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Select View Mode</CardTitle>
              <CardDescription>
                Compare customer journey performance with and without multilingual support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setViewMode('without');
                    setShowComparison(false);
                  }}
                  className={`flex-1 p-6 rounded-lg border-2 transition-all ${
                    viewMode === 'without' && !showComparison
                      ? 'border-red-600 bg-red-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <div className="text-lg font-bold text-gray-900">
                      Without Multilingual Support
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    See where customers struggle and drop off due to language barriers
                  </div>
                </button>

                <button
                  onClick={() => {
                    setViewMode('with');
                    setShowComparison(false);
                  }}
                  className={`flex-1 p-6 rounded-lg border-2 transition-all ${
                    viewMode === 'with' && !showComparison
                      ? 'border-green-600 bg-green-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <div className="text-lg font-bold text-gray-900">
                      With Multilingual Support
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    See improved engagement and conversion with dialect-specific CX
                  </div>
                </button>

                <button
                  onClick={() => setShowComparison(true)}
                  className={`flex-1 p-6 rounded-lg border-2 transition-all ${
                    showComparison
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <div className="text-lg font-bold text-gray-900">Side-by-Side Comparison</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    View before and after metrics together to see the impact
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journey Stage Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.journeyStages.map((stage, index) => {
              const metrics = showComparison
                ? null
                : viewMode === 'without'
                  ? stage.metricsWithout
                  : stage.metricsWith;

              const engagementColor = metrics
                ? getHeatmapColor(metrics.engagement)
                : 'from-gray-400 to-gray-500';
              const dropoffColor = metrics
                ? getHeatmapColor(metrics.dropoffRate, true)
                : 'from-gray-400 to-gray-500';

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedStage?.id === stage.id
                        ? 'border-2 border-blue-500 shadow-xl'
                        : 'border border-gray-200'
                    }`}
                    onClick={() => setSelectedStage(stage)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold text-gray-500">
                          Stage {index + 1}
                        </div>
                        {!showComparison && (
                          <div
                            className={`px-2 py-1 rounded text-xs font-bold text-white bg-gradient-to-r ${engagementColor}`}
                          >
                            {metrics?.engagement}% engaged
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-lg">{stage.name}</CardTitle>
                      <CardDescription className="text-xs">{stage.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {showComparison ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-center p-2 bg-red-50 rounded">
                              <div className="text-xs text-gray-600 mb-1">Without</div>
                              <div className="text-lg font-bold text-red-600">
                                {stage.metricsWithout.engagement}%
                              </div>
                              <div className="text-xs text-gray-500">Engagement</div>
                            </div>
                            <div className="text-center p-2 bg-green-50 rounded">
                              <div className="text-xs text-gray-600 mb-1">With</div>
                              <div className="text-lg font-bold text-green-600">
                                {stage.metricsWith.engagement}%
                              </div>
                              <div className="text-xs text-gray-500">Engagement</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-600">
                            <TrendingUp className="w-4 h-4" />
                            +
                            {getMetricDelta(
                              stage.metricsWithout.engagement,
                              stage.metricsWith.engagement
                            ).percentChange}
                            % improvement
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Dropoff Rate</span>
                            <span
                              className={`font-bold ${viewMode === 'without' ? 'text-red-600' : 'text-green-600'}`}
                            >
                              {metrics?.dropoffRate}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Conversion</span>
                            <span
                              className={`font-bold ${viewMode === 'without' ? 'text-red-600' : 'text-green-600'}`}
                            >
                              {metrics?.conversionRate}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Satisfaction</span>
                            <span
                              className={`font-bold ${viewMode === 'without' ? 'text-red-600' : 'text-green-600'}`}
                            >
                              {metrics?.satisfaction}%
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t">
                        <div className="text-xs text-gray-500 mb-2">Touchpoints:</div>
                        <div className="flex flex-wrap gap-1">
                          {stage.touchpoints.map((tp) => (
                            <span
                              key={tp}
                              className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700"
                            >
                              {tp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Stage Details */}
        <AnimatePresence>
          {selectedStage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    {selectedStage.name} - Detailed Analysis
                  </CardTitle>
                  <CardDescription>{selectedStage.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pain Points */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Pain Points (Without Multilingual)
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {selectedStage.painPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Improvements (With Multilingual)
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {selectedStage.improvements.map((improvement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Customer Quote */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-yellow-900 mb-1">
                            Customer Voice
                          </div>
                          <p className="text-sm text-yellow-800 italic">
                            "{selectedStage.customerQuote}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Comparison */}
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Performance Metrics Comparison
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { key: 'engagement', label: 'Engagement', suffix: '%' },
                        { key: 'dropoffRate', label: 'Dropoff', suffix: '%', isDropoff: true },
                        { key: 'conversionRate', label: 'Conversion', suffix: '%' },
                        { key: 'satisfaction', label: 'Satisfaction', suffix: '%' },
                      ].map((metric) => {
                        const withoutValue =
                          selectedStage.metricsWithout[metric.key as keyof JourneyMetrics];
                        const withValue =
                          selectedStage.metricsWith[metric.key as keyof JourneyMetrics];
                        const delta = getMetricDelta(
                          withoutValue,
                          withValue,
                          metric.isDropoff || false
                        );

                        return (
                          <div key={metric.key} className="text-center">
                            <div className="text-xs text-gray-600 mb-2">{metric.label}</div>
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <div className="text-sm text-gray-400">
                                {withoutValue}
                                {metric.suffix}
                              </div>
                              <ArrowRight className="w-3 h-3 text-gray-400" />
                              <div className="text-lg font-bold text-green-600">
                                {withValue}
                                {metric.suffix}
                              </div>
                            </div>
                            <div
                              className={`text-xs font-semibold ${delta.isPositive ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {delta.isPositive ? '↑' : '↓'} {delta.percentChange}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overall Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-green-50 to-white border-2 border-green-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-green-600" />
                End-to-End Journey Impact
              </CardTitle>
              <CardDescription>
                Overall performance improvement with multilingual support across entire customer
                lifecycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  {
                    label: 'Conversion',
                    without: data.overallMetrics.without.endToEndConversion,
                    with: data.overallMetrics.with.endToEndConversion,
                    suffix: '%',
                    improvement: data.impactSummary.conversionImprovement,
                  },
                  {
                    label: 'Satisfaction',
                    without: data.overallMetrics.without.avgCustomerSatisfaction,
                    with: data.overallMetrics.with.avgCustomerSatisfaction,
                    suffix: '%',
                    improvement: data.impactSummary.satisfactionImprovement,
                  },
                  {
                    label: 'NPS',
                    without: data.overallMetrics.without.nps,
                    with: data.overallMetrics.with.nps,
                    suffix: '',
                    improvement: data.impactSummary.npsImprovement,
                  },
                  {
                    label: 'Churn Rate',
                    without: data.overallMetrics.without.churnRate,
                    with: data.overallMetrics.with.churnRate,
                    suffix: '%',
                    improvement: data.impactSummary.churnReduction,
                    isNegative: true,
                  },
                  {
                    label: 'Lifetime Value',
                    without: data.overallMetrics.without.avgLifetimeValue,
                    with: data.overallMetrics.with.avgLifetimeValue,
                    suffix: '',
                    improvement: data.impactSummary.lifetimeValueIncrease,
                    isCurrency: true,
                  },
                  {
                    label: 'Recommendations',
                    without: data.overallMetrics.without.recommendationRate,
                    with: data.overallMetrics.with.recommendationRate,
                    suffix: '%',
                    improvement: data.impactSummary.recommendationIncrease,
                  },
                ].map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-xs text-gray-600 mb-2">{metric.label}</div>
                    <div className="flex flex-col items-center gap-1 mb-2">
                      <div className="text-sm text-gray-400">
                        {metric.isCurrency ? '$' : ''}
                        {metric.without}
                        {metric.suffix}
                      </div>
                      <ArrowRight className="w-3 h-3 text-gray-400 rotate-90" />
                      <div className="text-xl font-bold text-green-600">
                        {metric.isCurrency ? '$' : ''}
                        {metric.with}
                        {metric.suffix}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-green-600 flex items-center justify-center gap-1">
                      <Zap className="w-3 h-3" />
                      {metric.isNegative ? '↓' : '↑'} {metric.improvement}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Research Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" />
                Research-Backed Insights
              </CardTitle>
              <CardDescription>
                Industry data supporting the business case for multilingual CX
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.researchInsights.map((insight, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-700 mb-2">{insight.metric}</div>
                    <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                    <div className="text-xs text-blue-600 font-medium">
                      Source: {insight.source}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0">
            <CardContent className="py-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3">Transform Your Customer Journey</h3>
                <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                  See how Verizon's dialect-specific multilingual CX eliminates pain points,
                  improves engagement, and drives measurable business results across every stage of
                  the customer lifecycle.
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                    Calculate Your ROI
                  </button>
                  <button className="bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-900 transition-colors">
                    See Translation Demo
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

