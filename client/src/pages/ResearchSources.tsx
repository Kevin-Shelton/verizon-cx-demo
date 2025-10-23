import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Filter, Search, Award, TrendingUp, Users } from 'lucide-react';
import researchSourcesData from '../../../data/researchSources.json';

export default function ResearchSources() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { sources, categories } = researchSourcesData;

  // Filter sources based on category and search
  const filteredSources = sources.filter((source) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      categories
        .find((cat) => cat.name === selectedCategory)
        ?.sources.includes(source.id);

    const matchesSearch =
      searchQuery === '' ||
      source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.keyFindings.some((finding) =>
        finding.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  // Brand-name sources to highlight
  const brandNameSources = [
    'Common Sense Advisory',
    'Accenture',
    'Nielsen',
    'U.S. Census Bureau',
    'Forrester',
    'Gartner',
    'Harvard Business Review',
    'McKinsey',
    'Pew Research'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <BookOpen className="w-16 h-16" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Research Sources & Citations
            </h1>
            <p className="text-xl text-white/90 mb-8">
              All statistics and insights are backed by credible research from industry-leading organizations
            </p>

            {/* Brand Name Highlights */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              {brandNameSources.slice(0, 5).map((brand) => (
                <div key={brand} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm font-semibold">
                  {brand.split(' ')[0]}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900">{sources.length}</div>
              </div>
              <div className="text-sm text-gray-600">Credible Sources</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <div className="text-3xl font-bold text-gray-900">2020-2024</div>
              </div>
              <div className="text-sm text-gray-600">Recent Research</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <div className="text-3xl font-bold text-gray-900">9</div>
              </div>
              <div className="text-sm text-gray-600">Brand-Name Firms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Filter className="w-4 h-4" />
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Categories ({sources.length} sources)</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name} ({category.sources.length} sources)
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Search className="w-4 h-4" />
                  Search Sources
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, organization, or finding..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 font-medium">
              Showing {filteredSources.length} of {sources.length} sources
            </div>
          </div>

          {/* Sources List */}
          <div className="space-y-6">
            {filteredSources.map((source, index) => {
              const isBrandName = brandNameSources.some(brand => 
                source.organization.includes(brand)
              );
              
              return (
                <motion.div
                  key={source.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border-2 ${
                    isBrandName ? 'border-blue-200 bg-gradient-to-br from-blue-50/50 to-white' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg ${
                      isBrandName 
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white' 
                        : 'bg-gradient-to-br from-gray-600 to-gray-700 text-white'
                    }`}>
                      {source.id}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {source.title}
                            </h3>
                            {isBrandName && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                <Award className="w-3 h-3" />
                                Brand Name
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-gray-700">
                            {source.organization}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {source.type} • {source.year}
                          </p>
                        </div>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all text-sm font-semibold shadow-md hover:shadow-lg"
                        >
                          View Source
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          Key Findings:
                        </h4>
                        <ul className="space-y-2">
                          {source.keyFindings.map((finding, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-700 flex items-start gap-3 pl-4 border-l-2 border-blue-200"
                            >
                              <span className="text-blue-600 font-bold mt-0.5">•</span>
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredSources.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                No sources found matching your criteria.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Methodology Footer */}
      <div className="bg-gradient-to-br from-slate-100 to-gray-100 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Research Methodology
            </h2>
            <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
              All statistics used in the Executive Introduction, Case Study, and Journey Heatmap have been validated 
              through comprehensive research from credible industry sources.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Brand-Name Sources</h3>
                <p className="text-sm text-gray-600">
                  Leading analyst firms (Gartner, Forrester, McKinsey), government data (U.S. Census), 
                  and academic research (Harvard Business Review).
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Recent Data</h3>
                <p className="text-sm text-gray-600">
                  We prioritize research from 2020-2024 to ensure relevance and accuracy in the 
                  rapidly evolving multilingual customer experience landscape.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Rigorous Validation</h3>
                <p className="text-sm text-gray-600">
                  Each statistic is cross-referenced with multiple sources when possible and 
                  validated for methodology and relevance to telecommunications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

