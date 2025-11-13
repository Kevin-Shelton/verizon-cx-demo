import { Lock, Play, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration?: string;
}

const videos: VideoItem[] = [
  {
    id: "complete-overview",
    title: "Complete Solution Overview",
    description:
      "See how our dialect-specific translation technology works across all customer touchpoints. This comprehensive demo showcases real-world scenarios, cultural insights, and the competitive advantage of authentic multilingual communication.",
    url: "https://store.ikoneworld.com/vz-val/",
    duration: "12:45",
  },
  {
    id: "carlos-demo",
    title: "Carlos Demo",
    description:
      "Discover how our dialect-specific translation technology delivers authentic multilingual customer experiences. This demo showcases real-world applications and the competitive advantage of culturally-aware communication.",
    url: "https://store.ikoneworld.com/vz-carlos/",
    duration: "10:30",
  },
  {
    id: "ikoneworld-pillars",
    title: "iKoneworld Pillars",
    description:
      "Explore the foundational pillars of our platform and understand how each component works together to deliver seamless multilingual customer experiences across all touchpoints.",
    url: "https://video.ikunnect.com/ik-oneworld-pillars/",
    duration: "8:00",
  },
];

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle video selection
  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-6 md:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-1 leading-tight">
              Proprietary Demo Videos
            </h1>
            <p className="text-sm md:text-base text-white/90 leading-relaxed">
              Watch in-depth demonstrations of our dialect-specific translation technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="p-4 border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-2xl bg-white h-full flex flex-col cursor-pointer group"
                  onClick={() => handleVideoSelect(video)}
                >
                  {/* Video Thumbnail with Play Button Overlay */}
                  <div className="relative w-full bg-black rounded-lg overflow-hidden mb-4 aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:from-blue-600/40 group-hover:to-purple-600/40 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 group-hover:bg-white transition-all rounded-full p-4">
                        <Play className="w-8 h-8 text-blue-600 fill-blue-600" />
                      </div>
                    </div>
                  </div>

                  {/* Video Information */}
                  <div className="flex-grow flex flex-col gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    {/* Video Metadata */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 mt-auto">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-semibold">Proprietary Content</span>
                      </div>
                      {video.duration && (
                        <span className="text-xs font-medium text-gray-600">
                          {video.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Proprietary Content Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mt-8"
          >
            <Card className="p-6 border-2 border-blue-200 bg-blue-50">
              <div className="flex items-start gap-4">
                <Lock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Proprietary Content
                  </h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    These videos contain confidential information and are for authorized
                    viewers only. Videos are embedded securely within this portal and will
                    not display the public URL. Access is restricted to authenticated portal
                    users only.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to See It In Action?
            </h2>
            <p className="text-base text-white/90">
              Explore our comprehensive demo to understand how dialect-specific translation
              transforms customer experience across every touchpoint.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Modal - Fullscreen with Auto-Play */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setSelectedVideo(null)}
            role="dialog"
          >
            <div className="relative w-full h-full flex flex-col">
              {/* Close Button - Floating */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Video Player - Full Screen */}
              <div className="flex-grow relative w-full bg-black">
                <iframe
                  ref={iframeRef}
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    margin: 0,
                    padding: 0,
                    border: "none",
                  }}
                />
              </div>

              {/* Video Info - Bottom Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                <p className="text-sm text-white/90 mb-3 max-w-2xl">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-white/80">
                  <span className="font-semibold">Proprietary Content</span>
                  {selectedVideo.duration && (
                    <span className="font-medium">{selectedVideo.duration}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

