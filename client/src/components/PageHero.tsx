import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  gradient?: "red" | "blue" | "purple" | "green" | "orange";
}

const gradients = {
  red: "bg-gradient-to-br from-red-600 via-red-500 to-orange-500",
  blue: "bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500",
  purple: "bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500",
  green: "bg-gradient-to-br from-green-600 via-green-500 to-emerald-500",
  orange: "bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500",
};

export default function PageHero({
  title,
  subtitle,
  icon: Icon,
  gradient = "red",
}: PageHeroProps) {
  return (
    <div className={`relative overflow-hidden ${gradients[gradient]} -mx-8 -mt-8 mb-8`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      <div className="container relative py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {Icon && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex-shrink-0"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-white/90 max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-8"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,80 600,80 900,40 C1050,20 1150,0 1200,0 L1200,120 L0,120 Z"
            fill="hsl(var(--background))"
            opacity="1"
          />
        </svg>
      </div>
    </div>
  );
}

