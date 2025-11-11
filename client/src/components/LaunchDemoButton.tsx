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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 flex flex-col items-center gap-3 sm:gap-4">
      {/* Centered Button */}
      <motion.button
        onClick={handleLaunchDemo}
        disabled={isLoading}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-all shadow-lg text-sm sm:text-base"
        whileHover={{ scale: isLoading ? 1 : 1.05 }}
        whileTap={{ scale: isLoading ? 1 : 0.95 }}
      >
        <span>{isLoading ? "Launching..." : "Let's Go!"}</span>
        <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5" />
      </motion.button>

      {/* Tip box */}
      <div className="bg-white rounded-lg p-2 sm:p-3 border border-blue-200 text-xs sm:text-sm max-w-md">
        <p className="text-gray-600">
          <span className="font-semibold">💡 Tip:</span> Demo opens in a new window. Reference this carousel while using it, then return here to continue.
        </p>
      </div>
    </div>
  );
}

