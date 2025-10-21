import { useState } from "react";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SourceTooltipProps {
  source: string;
  detail?: string;
}

export default function SourceTooltip({ source, detail }: SourceTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span className="relative inline-block ml-1">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-300 hover:bg-gray-400 text-white transition-colors cursor-help"
        aria-label="Show source"
      >
        <Info className="w-3 h-3" />
      </button>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg pointer-events-none"
          >
            <div className="font-semibold mb-1">Source</div>
            <div className="text-gray-200">{source}</div>
            {detail && (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <div className="text-gray-300">{detail}</div>
              </>
            )}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="border-8 border-transparent border-t-gray-900"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

