import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generateTokenMutation = trpc.auth.generateAuthToken.useMutation();

  const handleLaunchDemo = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Request auth token via tRPC
      const { token } = await generateTokenMutation.mutateAsync();

      if (!token) {
        throw new Error("No token in response");
      }

      // Append token to URL
      const separator = url.includes("?") ? "&" : "?";
      const demoUrl = `${url}${separator}auth=${encodeURIComponent(token)}`;

      console.log("Opening demo URL:", demoUrl);
      // Open demo in new window
      window.open(demoUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Error launching demo:", err);
      setError("Failed to launch demo. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg"
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
        >
          <span>{isLoading ? "Launching..." : "Launch Demo"}</span>
          <ExternalLink className="w-5 h-5" />
        </motion.button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="mt-8 p-4 bg-white rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> The demo will open in a new window with automatic authentication. You can reference this carousel while using the demo, then return here to continue.
          </p>
        </div>
      </div>
    </div>
  );
}

