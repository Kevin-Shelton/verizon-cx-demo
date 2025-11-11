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
  const generateTokenMutation = trpc.auth.generateAuthToken.useMutation();

  const handleLaunchDemo = async () => {
    try {
      setIsLoading(true);
      
      // Generate auth token
      const response = await generateTokenMutation.mutateAsync();
      console.log("Token response:", response);
      const token = response?.token;
      
      // Append token to the actual URL passed in
      const separator = url.includes('?') ? '&' : '?';
      const urlWithToken = `${url}${separator}token=${encodeURIComponent(token)}`;
      
      // Open in new window
      window.open(urlWithToken, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Error launching demo:", err);
      // Fallback: open without token
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-fit">
      <div className="text-center max-w-md py-4">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 mb-3">
            <ExternalLink className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        </div>

        <motion.button
          onClick={handleLaunchDemo}
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-lg text-sm"
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
        >
          <span>{isLoading ? "Launching..." : "Let's Go!"}</span>
          <ExternalLink className="w-4 h-4" />
        </motion.button>

        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600">
            💡 <strong>Tip:</strong> The demo will open in a new window. You can reference this carousel while using the demo, then return here to continue.
          </p>
        </div>
      </div>
    </div>
  );
}

