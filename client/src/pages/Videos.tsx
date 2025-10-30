import { Play, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

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
  // Add more videos here as needed
  // {
  //   id: "video-2",
  //   title: "Feature Walkthrough",
  //   description: "Detailed walkthrough of key features...",
  //   url: "https://example.com/video2",
  //   duration: "8:30",
  // },
];

export default function Videos() {
  const handlePlayClick = (videoUrl: string) => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Proprietary Demo Videos
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Watch in-depth demonstrations of our dialect-specific translation technology in
              action across all customer touchpoints
            </p>
          </motion.div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 border-2 border-gray-200 hover:border-blue-400 transition-all hover:shadow-2xl bg-white h-full flex flex-col">
                  {/* Video Player Container */}
                  <div
                    className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden mb-6 aspect-video flex items-center justify-center group cursor-pointer"
                    onClick={() => handlePlayClick(video.url)}
                  >
                    {/* Background gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-700/20" />

                    {/* Play button */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                      <p className="text-white text-sm font-semibold">Click to play</p>
                    </div>
                  </div>

                  {/* Video Information */}
                  <div className="flex-grow flex flex-col gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{video.description}</p>
                    </div>

                    {/* Video Metadata */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-semibold">Proprietary Content</span>
                      </div>
                      {video.duration && (
                        <span className="text-xs font-medium text-gray-600">{video.duration}</span>
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
            className="max-w-5xl mx-auto mt-12"
          >
            <Card className="p-6 border-2 border-blue-200 bg-blue-50">
              <div className="flex items-start gap-4">
                <Lock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Proprietary Content</h3>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    These videos contain confidential information and are for authorized viewers
                    only. When you click to play, you will be prompted to authenticate with your
                    Ikoneworld credentials. Access is restricted to authorized personnel only.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to See It In Action?
            </h2>
            <p className="text-lg text-white/90">
              Explore our comprehensive demo to understand how dialect-specific translation
              transforms customer experience across every touchpoint.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

