import { BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';

interface ResearchAttributionProps {
  title?: string;
  description: string;
  highlightedSources: string[];
  totalSourceCount: number;
}

export default function ResearchAttribution({
  title = "Research-Backed Statistics",
  description,
  highlightedSources,
  totalSourceCount,
}: ResearchAttributionProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{description}</p>

          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">
              Credible Sources Include:
            </div>
            <div className="flex flex-wrap gap-2">
              {highlightedSources.map((source, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/research-sources">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#E60000] hover:bg-[#B30000] text-white rounded-lg font-medium transition-colors">
                View All {totalSourceCount} Research Sources
                <ExternalLink className="w-4 h-4" />
              </button>
            </Link>
            <span className="text-sm text-gray-600">
              Complete bibliography with citations and key findings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

