import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, CheckCircle2, XCircle, TrendingUp, 
  Smartphone, Phone, Users, Globe, Zap, Target,
  ArrowRight, AlertTriangle, Award, Calendar
} from 'lucide-react';
import verizonInitiatives from '../../../data/verizonInitiatives.json';

export default function VerizonCaseStudy() {
  const [selectedGap, setSelectedGap] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'current' | 'gaps' | 'solution'>('current');

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCoverageIcon = (coverage: string) => {
    switch (coverage) {
      case 'Mobile App': return <Smartphone className="w-5 h-5" />;
      case 'Contact Center': return <Phone className="w-5 h-5" />;
      case 'Billing & Payments': return <Target className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Building2 className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Verizon Spanish Language Initiatives
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Comprehensive analysis of current programs, identified gaps, and strategic opportunities
              for enhancing multilingual customer experience
            </p>
          </motion.div>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
          <button
            onClick={() => setViewMode('current')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              viewMode === 'current'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 inline mr-2" />
            Current Initiatives (6)
          </button>
          <button
            onClick={() => setViewMode('gaps')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              viewMode === 'gaps'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <AlertTriangle className="w-5 h-5 inline mr-2" />
            Identified Gaps (6)
          </button>
          <button
            onClick={() => setViewMode('solution')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              viewMode === 'solution'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Zap className="w-5 h-5 inline mr-2" />
            Invictus Solution
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Initiatives View */}
        {viewMode === 'current' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Current Spanish Language Initiatives
              </h2>
              <p className="text-lg text-gray-600">
                Verizon has made significant investments in Spanish language support across multiple channels.
                However, these initiatives are fragmented and lack the unified, dialect-specific approach needed
                to fully serve the Hispanic market.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verizonInitiatives.currentInitiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 rounded-lg text-red-600">
                        {getCoverageIcon(initiative.coverage)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {initiative.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{initiative.launchDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{initiative.description}</p>

                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                      {initiative.coverage}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Limitations:</p>
                    <ul className="space-y-2">
                      {initiative.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gaps View */}
        {viewMode === 'gaps' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Identified Gaps & Business Impact
              </h2>
              <p className="text-lg text-gray-600">
                Despite Verizon's investments, critical gaps remain that are costing the company billions in
                lost revenue and customer churn. These gaps represent strategic opportunities for improvement.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {verizonInitiatives.gaps.map((gap, index) => (
                <motion.div
                  key={gap.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedGap(selectedGap === gap.id ? null : gap.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                        <h3 className="text-xl font-bold text-gray-900">{gap.gap}</h3>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getImpactColor(gap.impact)}`}>
                          {gap.impact} Impact
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mb-3">{gap.category}</p>
                      <p className="text-gray-700 mb-4">{gap.description}</p>

                      <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                        <p className="text-sm font-semibold text-red-900 mb-1">Business Impact:</p>
                        <p className="text-sm text-red-800">{gap.businessImpact}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Impact Summary */}
            <div className="mt-8 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                Total Opportunity at Risk
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-red-100 text-sm mb-2">Revenue at Risk</p>
                  <p className="text-4xl font-bold">$6.61B</p>
                  <p className="text-red-100 text-sm mt-1">68% brand switching risk</p>
                </div>
                <div>
                  <p className="text-red-100 text-sm mb-2">Annual Churn</p>
                  <p className="text-4xl font-bold">$797M</p>
                  <p className="text-red-100 text-sm mt-1">29% due to language barriers</p>
                </div>
                <div>
                  <p className="text-red-100 text-sm mb-2">Total Addressable Opportunity</p>
                  <p className="text-4xl font-bold">$3.87B</p>
                  <p className="text-red-100 text-sm mt-1">With multilingual CX</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Solution View */}
        {viewMode === 'solution' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Invictus Language Engine Solution
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {verizonInitiatives.invictusSolution.overview}
              </p>

              {/* Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {verizonInitiatives.invictusSolution.capabilities.map((capability, index) => (
                  <motion.div
                    key={capability.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {capability.capability}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {capability.description}
                        </p>
                        <div className="bg-green-50 border-l-4 border-green-600 p-3 rounded mb-3">
                          <p className="text-sm font-semibold text-green-900 mb-1">Business Benefit:</p>
                          <p className="text-sm text-green-800">{capability.benefit}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {capability.fillsGaps.map(gapId => {
                            const gap = verizonInitiatives.gaps.find(g => g.id === gapId);
                            return gap ? (
                              <span
                                key={gapId}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                              >
                                Fills: {gap.gap}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Integration Points */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-red-600" />
                  Integration with Existing Initiatives
                </h3>
                <p className="text-gray-600 mb-6">
                  Invictus Language Engine enhances Verizon's current Spanish initiatives rather than replacing them:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(verizonInitiatives.invictusSolution.integration).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <ArrowRight className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </p>
                        <p className="text-sm text-gray-600">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitive Comparison */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-red-600" />
                  Competitive Positioning
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Capability</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Verizon Current</th>
                        <th className="text-center py-3 px-4 font-semibold text-green-700 bg-green-50">
                          Verizon + Invictus
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Competitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(verizonInitiatives.competitiveComparison.verizonCurrent).filter(k => k !== 'score').map((key, index) => (
                        <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </td>
                          <td className="text-center py-3 px-4 text-gray-600">
                            {verizonInitiatives.competitiveComparison.verizonCurrent[key as keyof typeof verizonInitiatives.competitiveComparison.verizonCurrent]}
                          </td>
                          <td className="text-center py-3 px-4 font-semibold text-green-700 bg-green-50">
                            {verizonInitiatives.competitiveComparison.verizonWithInvictus[key as keyof typeof verizonInitiatives.competitiveComparison.verizonWithInvictus]}
                          </td>
                          <td className="text-center py-3 px-4 text-gray-600">
                            {verizonInitiatives.competitiveComparison.competitors[key as keyof typeof verizonInitiatives.competitiveComparison.competitors]}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-200 font-bold">
                        <td className="py-3 px-4 text-gray-900">Overall Score</td>
                        <td className="text-center py-3 px-4 text-red-600">
                          {verizonInitiatives.competitiveComparison.verizonCurrent.score}/100
                        </td>
                        <td className="text-center py-3 px-4 text-green-700 bg-green-50">
                          {verizonInitiatives.competitiveComparison.verizonWithInvictus.score}/100
                        </td>
                        <td className="text-center py-3 px-4 text-gray-600">
                          {verizonInitiatives.competitiveComparison.competitors.score}/100
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

