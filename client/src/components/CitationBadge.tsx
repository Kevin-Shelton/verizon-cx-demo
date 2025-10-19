import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Source {
  id: number;
  title: string;
  organization: string;
  url: string;
  type: string;
}

interface CitationBadgeProps {
  sourceIds: number[];
  sources: Source[];
}

export default function CitationBadge({ sourceIds, sources }: CitationBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const citedSources = sources.filter((source) => sourceIds.includes(source.id));

  return (
    <span className="relative inline-block">
      <sup
        className="ml-0.5 text-[10px] font-bold text-[#E60000] cursor-help px-1 py-0.5 bg-red-50 rounded hover:bg-red-100 transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        [{sourceIds.join(',')}]
      </sup>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="text-xs font-semibold text-gray-700 mb-2">Research Sources:</div>
            <div className="space-y-2">
              {citedSources.map((source) => (
                <div key={source.id} className="text-xs">
                  <div className="font-medium text-gray-900">[{source.id}] {source.organization}</div>
                  <div className="text-gray-600 line-clamp-2">{source.title}</div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#E60000] hover:text-[#B30000] mt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Source
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <a
                href="/research-sources"
                className="text-xs text-[#E60000] hover:text-[#B30000] font-medium"
              >
                View All Research Sources →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

