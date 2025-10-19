import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Users,
  Phone,
  Target,
  Award,
  ArrowRight,
  Calculator,
  Building2,
  ToggleLeft,
  ToggleRight,
  PieChart,
  BarChart3,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import roiMetricsData from '../../../data/roiMetrics.json';
import verizonROIData from '../../../data/verizonROIData.json';

interface ROIMetrics {
  baseMetrics: {
    avgCustomerLifetimeValue: number;
    avgMonthlyCustomers: number;
    avgCallHandleTime: number;
    avgCostPerCall: number;
    churnRate: number;
    customerAcquisitionCost: number;
    avgMonthlyCallVolume: number;
    avgRevenuePerCustomer: number;
  };
  multilingualImpact: {
    satisfactionIncrease: number;
    loyaltyIncrease: number;
    fcrImprovement: number;
    ahtReduction: number;
    churnReduction: number;
    retentionImprovement: number;
    premiumPricingTolerance: number;
    brandSwitchingRisk: number;
    spendingLimitWithout: number;
    repeatCallReduction: number;
    churnReplacementCost: number;
    roiMultiplier: number;
  };
  marketData: {
    hispanicPopulationUS: number;
    californiaSpanishSpeakers: number;
    texasSpanishSpeakers: number;
    floridaSpanishSpeakers: number;
    newYorkSpanishSpeakers: number;
    marketPenetrationOpportunity: number;
  };
  costBreakdown: {
    increasedAHT: number;
    repeatCalls: number;
    churnReplace: number;
    agentTraining: number;
    lostRevenue: number;
  };
  implementationCosts: {
    aiTranslationPlatform: number;
    agentTraining: number;
    technologyIntegration: number;
    contentLocalization: number;
    ongoingMaintenance: number;
  };
  industryBenchmarks: {
    bestInClassCSAT: number;
    avgCSATWithoutMultilingual: number;
    bestInClassNPS: number;
    avgNPSWithoutMultilingual: number;
    bestInClassFCR: number;
    avgFCRWithoutMultilingual: number;
    avgRetentionWithMultilingual: number;
    avgRetentionWithoutMultilingual: number;
  };
  timeToROI: {
    months: number;
    description: string;
  };
}

const roiMetrics = roiMetricsData as ROIMetrics;

export default function ROICalculator() {
  // Verizon data toggle
  const [useVerizonData, setUseVerizonData] = useState(false);

  // User inputs
  const [customerBase, setCustomerBase] = useState(50000);
  const [monthlyCallVolume, setMonthlyCallVolume] = useState(150000);
  const [currentChurnRate, setCurrentChurnRate] = useState(15);
  const [avgCLV, setAvgCLV] = useState(1200);
  const [implementationBudget, setImplementationBudget] = useState(300000);

  // Calculated values
  const [costSavings, setCostSavings] = useState(0);
  const [revenueImpact, setRevenueImpact] = useState(0);
  const [netROI, setNetROI] = useState(0);
  const [paybackMonths, setPaybackMonths] = useState(0);

  useEffect(() => {
    calculateROI();
  }, [customerBase, monthlyCallVolume, currentChurnRate, avgCLV, implementationBudget]);

  const calculateROI = () => {
    const { baseMetrics, multilingualImpact, implementationCosts } = roiMetrics;

    // Annual Cost Savings Calculations
    const ahtSavings =
      monthlyCallVolume *
      12 *
      (baseMetrics.avgCallHandleTime * multilingualImpact.ahtReduction) *
      (baseMetrics.avgCostPerCall / 60); // Convert minutes to cost

    const repeatCallSavings =
      monthlyCallVolume *
      12 *
      multilingualImpact.repeatCallReduction *
      baseMetrics.avgCostPerCall;

    const churnReplacementSavings =
      customerBase *
      (currentChurnRate / 100) *
      multilingualImpact.churnReduction *
      baseMetrics.customerAcquisitionCost;

    const totalCostSavings = ahtSavings + repeatCallSavings + churnReplacementSavings;

    // Annual Revenue Impact Calculations
    const premiumPricingRevenue =
      customerBase *
      multilingualImpact.premiumPricingTolerance *
      baseMetrics.avgRevenuePerCustomer *
      0.1 * // 10% premium pricing
      12;

    const retainedCustomerRevenue =
      customerBase *
      (currentChurnRate / 100) *
      multilingualImpact.churnReduction *
      avgCLV;

    const marketExpansionRevenue =
      customerBase *
      roiMetrics.marketData.marketPenetrationOpportunity *
      avgCLV *
      0.5; // Conservative 50% of opportunity

    const totalRevenueImpact =
      premiumPricingRevenue + retainedCustomerRevenue + marketExpansionRevenue;

    // Net ROI Calculation
    const totalImplementationCost = implementationBudget;
    const annualBenefit = totalCostSavings + totalRevenueImpact;
    const roi = ((annualBenefit - totalImplementationCost) / totalImplementationCost) * 100;
    const payback = (totalImplementationCost / (annualBenefit / 12)).toFixed(1);

    setCostSavings(totalCostSavings);
    setRevenueImpact(totalRevenueImpact);
    setNetROI(roi);
    setPaybackMonths(parseFloat(payback));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
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
              <Calculator className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Multilingual CX ROI Calculator</h1>
            </div>
            <p className="text-xl text-red-100 max-w-3xl mb-6">
              Calculate the financial impact of implementing dialect-specific multilingual customer
              experience at Verizon. Based on industry research and proven metrics.
            </p>
            
            {/* Verizon Data Toggle */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md">
              <button
                onClick={() => {
                  setUseVerizonData(!useVerizonData);
                  if (!useVerizonData) {
                    // Switch to Verizon data
                    setCustomerBase(verizonROIData.verizonBaseline.hispanicCustomers);
                    setMonthlyCallVolume(Math.round(verizonROIData.verizonBaseline.hispanicCustomers * 0.15)); // Estimate 15% call monthly
                    setCurrentChurnRate(verizonROIData.verizonBaseline.churnRate);
                    setAvgCLV(Math.round(verizonROIData.verizonBaseline.arpa * 24)); // 24-month CLV
                  } else {
                    // Switch back to generic data
                    setCustomerBase(50000);
                    setMonthlyCallVolume(150000);
                    setCurrentChurnRate(15);
                    setAvgCLV(1200);
                  }
                }}
                className="flex items-center gap-2 text-white hover:text-red-100 transition-colors"
              >
                {useVerizonData ? (
                  <ToggleRight className="w-6 h-6" />
                ) : (
                  <ToggleLeft className="w-6 h-6" />
                )}
                <span className="font-semibold">
                  {useVerizonData ? 'Verizon-Specific Data' : 'Generic Industry Data'}
                </span>
              </button>
              {useVerizonData && (
                <div className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Q4 2024</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Input Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8 border-2 border-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-red-600" />
                Your Business Parameters
              </CardTitle>
              <CardDescription>
                Adjust these values to match your current operations and see real-time ROI
                calculations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Customer Base */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Current Customer Base
                  </label>
                  <span className="text-lg font-bold text-red-600">
                    {formatNumber(customerBase)} customers
                  </span>
                </div>
                <Slider
                  value={[customerBase]}
                  onValueChange={(value) => setCustomerBase(value[0])}
                  min={10000}
                  max={500000}
                  step={10000}
                  className="w-full"
                />
              </div>

              {/* Monthly Call Volume */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Monthly Call Volume
                  </label>
                  <span className="text-lg font-bold text-red-600">
                    {formatNumber(monthlyCallVolume)} calls/month
                  </span>
                </div>
                <Slider
                  value={[monthlyCallVolume]}
                  onValueChange={(value) => setMonthlyCallVolume(value[0])}
                  min={50000}
                  max={1000000}
                  step={50000}
                  className="w-full"
                />
              </div>

              {/* Current Churn Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Current Annual Churn Rate
                  </label>
                  <span className="text-lg font-bold text-red-600">{currentChurnRate}%</span>
                </div>
                <Slider
                  value={[currentChurnRate]}
                  onValueChange={(value) => setCurrentChurnRate(value[0])}
                  min={5}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Average CLV */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Average Customer Lifetime Value
                  </label>
                  <span className="text-lg font-bold text-red-600">{formatCurrency(avgCLV)}</span>
                </div>
                <Slider
                  value={[avgCLV]}
                  onValueChange={(value) => setAvgCLV(value[0])}
                  min={500}
                  max={5000}
                  step={100}
                  className="w-full"
                />
              </div>

              {/* Implementation Budget */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Implementation Budget
                  </label>
                  <span className="text-lg font-bold text-red-600">
                    {formatCurrency(implementationBudget)}
                  </span>
                </div>
                <Slider
                  value={[implementationBudget]}
                  onValueChange={(value) => setImplementationBudget(value[0])}
                  min={100000}
                  max={1000000}
                  step={50000}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Annual Cost Savings */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Annual Cost Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">{formatCurrency(costSavings)}</div>
              <p className="text-xs text-green-600 mt-2">
                From reduced AHT, fewer repeat calls, and lower churn
              </p>
            </CardContent>
          </Card>

          {/* Annual Revenue Impact */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Annual Revenue Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">
                {formatCurrency(revenueImpact)}
              </div>
              <p className="text-xs text-blue-600 mt-2">
                From premium pricing, retention, and market expansion
              </p>
            </CardContent>
          </Card>

          {/* Net ROI */}
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Net ROI (Year 1)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{netROI.toFixed(0)}%</div>
              <p className="text-xs text-red-600 mt-2">
                Return on investment in first year of implementation
              </p>
            </CardContent>
          </Card>

          {/* Payback Period */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-800 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Payback Period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">{paybackMonths} months</div>
              <p className="text-xs text-purple-600 mt-2">
                Time to recover initial investment
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cost Savings Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-red-600" />
                  Cost Savings Breakdown
                </CardTitle>
                <CardDescription>
                  How multilingual support reduces operational costs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Reduced Average Handle Time</span>
                      <span className="text-sm font-bold text-green-600">35% savings</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: '35%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Clear communication eliminates misunderstandings
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Fewer Repeat Calls</span>
                      <span className="text-sm font-bold text-green-600">25% reduction</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Issues resolved correctly the first time
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Lower Churn Replacement Costs</span>
                      <span className="text-sm font-bold text-green-600">29% reduction</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: '29%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Reduced customer acquisition costs
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-start gap-2 text-xs text-gray-600">
                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p>
                      Research shows that 35% of language barrier costs come from increased handle
                      times, making AHT reduction the #1 operational benefit.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Revenue Impact Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                  Revenue Impact Breakdown
                </CardTitle>
                <CardDescription>
                  How multilingual support drives revenue growth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Premium Pricing Tolerance</span>
                      <span className="text-sm font-bold text-blue-600">64% willing</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: '64%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Customers pay more for native language service
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Customer Retention</span>
                      <span className="text-sm font-bold text-blue-600">70% loyalty boost</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Increased lifetime value from loyal customers
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Market Expansion</span>
                      <span className="text-sm font-bold text-blue-600">18% opportunity</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: '18%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Access to 62.3M Hispanic market in US
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-start gap-2 text-xs text-gray-600">
                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p>
                      68% of consumers would switch to a competitor offering native language
                      support, representing massive competitive vulnerability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Industry Benchmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-red-600" />
                Industry Benchmarks: Multilingual vs. Monolingual Support
              </CardTitle>
              <CardDescription>
                Research-backed performance metrics from telecommunications industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* CSAT */}
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    Customer Satisfaction
                  </div>
                  <div className="flex items-end justify-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-400">65%</div>
                      <div className="text-xs text-gray-500">Without</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-500 mb-2" />
                    <div>
                      <div className="text-2xl font-bold text-green-600">85%</div>
                      <div className="text-xs text-green-600">With</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-semibold mt-2">+20 points</div>
                </div>

                {/* NPS */}
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-2">Net Promoter Score</div>
                  <div className="flex items-end justify-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-400">25</div>
                      <div className="text-xs text-gray-500">Without</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-500 mb-2" />
                    <div>
                      <div className="text-2xl font-bold text-green-600">45</div>
                      <div className="text-xs text-green-600">With</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-semibold mt-2">+20 points</div>
                </div>

                {/* FCR */}
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    First Call Resolution
                  </div>
                  <div className="flex items-end justify-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-400">58%</div>
                      <div className="text-xs text-gray-500">Without</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-500 mb-2" />
                    <div>
                      <div className="text-2xl font-bold text-green-600">86%</div>
                      <div className="text-xs text-green-600">With</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-semibold mt-2">+28 points</div>
                </div>

                {/* Retention */}
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-2">Retention Rate</div>
                  <div className="flex items-end justify-center gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-400">78%</div>
                      <div className="text-xs text-gray-500">Without</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-500 mb-2" />
                    <div>
                      <div className="text-2xl font-bold text-green-600">82%</div>
                      <div className="text-xs text-green-600">With</div>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-semibold mt-2">+4 points</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Research Insight</p>
                    <p>
                      Companies investing in multilingual customer service capabilities outperform
                      competitors by an average of <strong>1.5x</strong>. Contact centers typically
                      achieve ROI within <strong>6-12 months</strong> through reduced call handling
                      costs, improved FCR rates, and decreased customer churn.
                    </p>
                  </div>
                </div>
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
                <h3 className="text-2xl font-bold mb-3">Ready to Transform Your CX?</h3>
                <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                  Based on your parameters, implementing dialect-specific multilingual support could
                  generate <strong>{formatCurrency(costSavings + revenueImpact)}</strong> in annual
                  value with a payback period of just <strong>{paybackMonths} months</strong>.
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                    Schedule Executive Briefing
                  </button>
                  <button className="bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-900 transition-colors">
                    Download Full Report
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

