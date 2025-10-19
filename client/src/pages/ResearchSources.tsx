import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Filter, Search } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#E60000] to-[#B30000] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Research Sources & Citations
            </h1>
            <p className="text-xl text-white/90">
              All statistics and figures in this demo are backed by credible industry research from
              leading organizations including ICMI, Common Sense Advisory, Harvard Business Review,
              and US Census Bureau.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4" />
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60000] focus:border-transparent"
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
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Search className="w-4 h-4" />
                  Search Sources
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, organization, or finding..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E60000] focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredSources.length} of {sources.length} sources
            </div>
          </div>

          {/* Sources List */}
          <div className="space-y-6">
            {filteredSources.map((source, index) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#E60000] text-white rounded-lg flex items-center justify-center font-bold text-lg">
                    {source.id}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {source.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {source.organization} • {source.type}
                        </p>
                      </div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        View Source
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Key Findings:
                      </h4>
                      <ul className="space-y-2">
                        {source.keyFindings.map((finding, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <span className="text-[#E60000] mt-1">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredSources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No sources found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Research Methodology
            </h2>
            <p className="text-gray-600 mb-6">
              All statistics and figures used in the ROI Calculator, Translation Demo, and Journey
              Heatmap have been validated through comprehensive research from credible industry
              sources. We prioritize:
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">Credible Sources</h3>
                <p className="text-sm text-gray-600">
                  Industry analyst firms (Gartner, Forrester), government data (US Census),
                  academic research (Harvard Business Review), and industry associations (ICMI).
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">Recent Data</h3>
                <p className="text-sm text-gray-600">
                  We prioritize research from 2020-2024 to ensure relevance and accuracy in the
                  rapidly evolving multilingual customer experience landscape.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">Rigorous Validation</h3>
                <p className="text-sm text-gray-600">
                  Each statistic is cross-referenced with multiple sources when possible and
                  validated for methodology and relevance to telecommunications and customer
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

