import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface LaunchDemoButtonProps {
  url: string;
  title: string;
  description: string;
}

export default function LaunchDemoButton({
  url,
  title,
  description,
}: LaunchDemoButtonProps) {
  const handleLaunchDemo = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-full flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <ExternalLink className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
        </div>

        <motion.button
          onClick={handleLaunchDemo}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Launch Demo</span>
          <ExternalLink className="w-5 h-5" />
        </motion.button>

        <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> The demo will open in a new window. You can reference this carousel while using the demo, then return here to continue.
          </p>
        </div>
      </div>
    </div>
  );
}

