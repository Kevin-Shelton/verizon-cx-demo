import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Languages,
  ShoppingCart,
  Headphones,
  CreditCard,
  Heart,
  Check,
  X,
  Info,
  AlertTriangle,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import dialectData from '../../../data/dialectExamples.json';

interface Translation {
  text: string;
  qualityScore: number;
  culturalNote?: string;
  issues?: string[];
}

interface Example {
  id: string;
  category: string;
  english: string;
  translations: {
    generic: Translation;
    mexican: Translation;
    puerto_rican: Translation;
    colombian: Translation;
    us_spanish: Translation;
  };
}

interface DialectData {
  categories: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  examples: Example[];
  dialectInfo: {
    [key: string]: {
      name: string;
      flag: string;
      speakers: string;
      regions: string;
      keyFeatures: string[];
    };
  };
}

const data = dialectData as DialectData;

const categoryIcons: { [key: string]: any } = {
  sales: ShoppingCart,
  support: Headphones,
  billing: CreditCard,
  retention: Heart,
};

export default function TranslationDemo() {
  const [selectedCategory, setSelectedCategory] = useState('sales');
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [showComparison, setShowComparison] = useState(true);
  const [highlightedDialect, setHighlightedDialect] = useState<string | null>(null);

  const filteredExamples = data.examples.filter((ex) => ex.category === selectedCategory);

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getQualityBadge = (score: number) => {
    if (score >= 90) return { icon: Check, label: 'Excellent', color: 'green' };
    if (score >= 75) return { icon: TrendingUp, label: 'Good', color: 'yellow' };
    return { icon: AlertTriangle, label: 'Poor', color: 'red' };
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
              <Languages className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Live Translation Demo</h1>
            </div>
            <p className="text-xl text-red-100 max-w-3xl">
              See the difference between generic machine translation and dialect-specific cultural
              translation. Experience why 72% of customers prefer native language support.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Select Customer Interaction Category</CardTitle>
              <CardDescription>
                Choose a common customer service scenario to see dialect-specific translations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {data.categories.map((category) => {
                  const Icon = categoryIcons[category.id];
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedExample(null);
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md'
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-red-600' : 'text-gray-600'}`}
                      />
                      <div
                        className={`text-sm font-semibold ${isSelected ? 'text-red-700' : 'text-gray-700'}`}
                      >
                        {category.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Example Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Select Example Phrase</CardTitle>
              <CardDescription>Click on a phrase to see dialect comparisons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredExamples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => setSelectedExample(example)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedExample?.id === example.id
                        ? 'border-red-600 bg-red-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`w-2 h-2 rounded-full ${selectedExample?.id === example.id ? 'bg-red-600' : 'bg-gray-400'}`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-medium mb-1 ${selectedExample?.id === example.id ? 'text-red-700' : 'text-gray-900'}`}
                        >
                          {example.english}
                        </div>
                        {selectedExample?.id === example.id && (
                          <div className="text-sm text-red-600 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Click dialect cards below to see cultural insights
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Translation Comparison Grid */}
        <AnimatePresence>
          {selectedExample && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Card className="border-2 border-red-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Languages className="w-6 h-6 text-red-600" />
                        Dialect Comparison
                      </CardTitle>
                      <CardDescription>
                        Original: <strong>{selectedExample.english}</strong>
                      </CardDescription>
                    </div>
                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                    >
                      {showComparison ? 'Hide Generic' : 'Show Generic'}
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    {/* Generic Translation (Warning) */}
                    {showComparison && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-red-50 border-2 border-red-300">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-semibold text-red-700 flex items-center gap-1">
                                <AlertTriangle className="w-4 h-4" />
                                Generic
                              </div>
                              <div
                                className={`px-2 py-1 rounded text-xs font-bold ${getQualityColor(selectedExample.translations.generic.qualityScore)}`}
                              >
                                {selectedExample.translations.generic.qualityScore}%
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm text-gray-700 mb-3 italic">
                              {selectedExample.translations.generic.text}
                            </div>
                            {selectedExample.translations.generic.issues && (
                              <div className="space-y-2">
                                <div className="text-xs font-semibold text-red-700 flex items-center gap-1">
                                  <X className="w-3 h-3" />
                                  Issues:
                                </div>
                                <ul className="space-y-1">
                                  {selectedExample.translations.generic.issues.map((issue, idx) => (
                                    <li key={idx} className="text-xs text-red-600 flex items-start gap-1">
                                      <span className="text-red-400">•</span>
                                      <span>{issue}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}

                    {/* Mexican Spanish */}
                    {(['mexican', 'puerto_rican', 'colombian', 'us_spanish'] as const).map((dialect) => {
                      const translation = selectedExample.translations[dialect];
                      const dialectInfo = data.dialectInfo[dialect];
                      const badge = getQualityBadge(translation.qualityScore);
                      const BadgeIcon = badge.icon;
                      const isHighlighted = highlightedDialect === dialect;

                      return (
                        <motion.div
                          key={dialect}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          onMouseEnter={() => setHighlightedDialect(dialect)}
                          onMouseLeave={() => setHighlightedDialect(null)}
                        >
                          <Card
                            className={`transition-all cursor-pointer ${
                              isHighlighted
                                ? 'border-2 border-green-400 shadow-lg scale-105'
                                : 'border-2 border-green-200 hover:border-green-300 hover:shadow-md'
                            }`}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-semibold text-green-700 flex items-center gap-1">
                                  <span className="text-lg">{dialectInfo.flag}</span>
                                  {dialect === 'mexican' && 'Mexican'}
                                  {dialect === 'puerto_rican' && 'Puerto Rican'}
                                  {dialect === 'colombian' && 'Colombian'}
                                  {dialect === 'us_spanish' && 'US Spanish'}
                                </div>
                                <div
                                  className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${getQualityColor(translation.qualityScore)}`}
                                >
                                  <BadgeIcon className="w-3 h-3" />
                                  {translation.qualityScore}%
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm text-gray-900 mb-3 font-medium">
                                {translation.text}
                              </div>
                              {translation.culturalNote && (
                                <div className="space-y-2">
                                  <div className="text-xs font-semibold text-green-700 flex items-center gap-1">
                                    <Info className="w-3 h-3" />
                                    Cultural Insight:
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed">
                                    {translation.culturalNote}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dialect Information Panel */}
        {highlightedDialect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{data.dialectInfo[highlightedDialect].flag}</span>
                  {data.dialectInfo[highlightedDialect].name}
                </CardTitle>
                <CardDescription className="text-green-800">
                  <strong>{data.dialectInfo[highlightedDialect].speakers}</strong> •{' '}
                  {data.dialectInfo[highlightedDialect].regions}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-semibold text-green-800 mb-2">
                      Key Linguistic Features:
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {data.dialectInfo[highlightedDialect].keyFeatures.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Research Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Why Dialect-Specific Translation Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">72%</div>
                  <div className="text-sm text-blue-900">
                    of customers experience <strong>increased satisfaction</strong> when support is
                    delivered in their native dialect
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">68%</div>
                  <div className="text-sm text-blue-900">
                    of consumers would <strong>switch to a competitor</strong> offering native
                    language support
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700 mb-2">86%</div>
                  <div className="text-sm text-blue-900">
                    <strong>First Call Resolution</strong> improvement with multilingual support -
                    the #1 ranked operational metric
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-300">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">The Competitive Advantage</p>
                    <p>
                      Generic machine translation misses cultural nuances, regional idioms, and
                      emotional context. Dialect-specific translation creates authentic connections
                      that drive loyalty, reduce churn, and enable premium pricing. Companies
                      investing in multilingual capabilities outperform competitors by{' '}
                      <strong>1.5x average</strong>.
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
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0">
            <CardContent className="py-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3">Experience the Difference</h3>
                <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                  See how Verizon's dialect-specific multilingual CX transforms customer
                  interactions across all touchpoints - from sales to support to retention.
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                    View Customer Journeys
                  </button>
                  <button className="bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-900 transition-colors">
                    Calculate Your ROI
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

