import { useState, useEffect } from "react";
import { Play, Lock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";

export default function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch video access from backend
  const { data: accessData, isLoading: accessLoading } = trpc.video.getAccess.useQuery();
  const { data: metadata } = trpc.video.getMetadata.useQuery();

  useEffect(() => {
    if (accessData?.success && accessData.videoUrl) {
      setVideoUrl(accessData.videoUrl);
      setError(null);
    } else if (accessData && !accessData.success) {
      setError(accessData.error || "Failed to load video");
    }
    setIsLoading(accessLoading);
  }, [accessData, accessLoading]);

  const handlePlayClick = () => {
    if (videoUrl) {
      // Open video in new window/tab
      window.open(videoUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card className="p-8 border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-2xl bg-white">
        {/* Video Player Container */}
        <div
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden mb-6 aspect-video flex items-center justify-center group cursor-pointer"
          onClick={handlePlayClick}
        >
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-700/20" />

          {/* Loading state */}
          {isLoading && (
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white text-sm font-medium">Loading video...</p>
            </div>
          )}

          {/* Error state */}
          {error && !isLoading && (
            <div className="relative z-10 flex flex-col items-center gap-4">
              <AlertCircle className="h-12 w-12 text-red-400" />
              <p className="text-white text-sm font-medium text-center">{error}</p>
            </div>
          )}

          {/* Play button - visible when loaded */}
          {!isLoading && !error && (
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
                <Play className="h-10 w-10 text-white fill-white" />
              </div>
              <p className="text-white text-lg font-semibold">Click to play video</p>
            </div>
          )}
        </div>

        {/* Video Information */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">
            {metadata?.title || "Complete Solution Overview"}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {metadata?.description ||
              "See how our dialect-specific translation technology works across all customer touchpoints. This comprehensive demo showcases real-world scenarios, cultural insights, and the competitive advantage of authentic multilingual communication."}
          </p>

          {/* Proprietary Content Notice */}
          <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-6">
            <Lock className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Proprietary Content:</span> This video contains
              confidential information and is for authorized viewers only. Authentication is
              required to access the content.
            </p>
          </div>

          {/* Video Details */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Content Type</p>
              <p className="text-sm text-gray-900 mt-1">Proprietary Demo</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Access Level</p>
              <p className="text-sm text-gray-900 mt-1">Authenticated Users</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

