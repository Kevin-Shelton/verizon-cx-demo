import { ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export interface ExperienceStep {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "email" | "ivr" | "field-services";
}

interface ExperienceCarouselProps {
  personaName: string;
  personaDescription: string;
  steps: ExperienceStep[];
}

export default function ExperienceCarousel({
  personaName,
  personaDescription,
  steps,
}: ExperienceCarouselProps) {
  const [currentStep, setCurrentStep] = useState(0);


  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
    }
  };

  const goNext = () => goToStep(currentStep + 1);
  const goPrev = () => goToStep(currentStep - 1);
  const restart = () => goToStep(0);
  const handleExit = () => {
    window.location.href = "/personas";
  };

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header with Logo and Controls */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 border-b-2 border-blue-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/ikow-logo.png"
              alt="ikOneWorld"
              className="h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold">{personaName}'s Experience Journey</h1>
              <p className="text-blue-100">{personaDescription}</p>
            </div>
          </div>
          <button
            onClick={handleExit}
            className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
            title="Exit carousel"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-blue-800 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-100 text-sm font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-blue-100 text-sm font-medium">{currentStepData.title}</span>
          </div>
          <div className="w-full bg-blue-900 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {/* Frame with Logo */}
              <div className="h-full flex flex-col bg-white">
                {/* Frame Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/ikow-logo.png"
                      alt="ikOneWorld"
                      className="h-8 object-contain"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{currentStepData.title}</h2>
                      <p className="text-sm text-gray-600">{currentStepData.description}</p>
                    </div>
                  </div>
                </div>

                {/* Embedded Experience */}
                <div className="flex-1 overflow-hidden">
                  <iframe
                    src={currentStepData.url}
                    title={currentStepData.title}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 border-t-2 border-blue-700">
        <div className="max-w-7xl mx-auto">
          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => goToStep(idx)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  idx === currentStep
                    ? "bg-white text-blue-900 scale-105"
                    : "bg-blue-700 text-white hover:bg-blue-600"
                }`}
                title={step.title}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={isFirstStep}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isFirstStep
                  ? "bg-blue-800 text-blue-400 cursor-not-allowed opacity-50"
                  : "bg-blue-700 text-white hover:bg-blue-600 active:scale-95"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>

            <div className="flex gap-3">
              <button
                onClick={restart}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-amber-600 text-white hover:bg-amber-700 transition-all active:scale-95"
                title="Restart from first step"
              >
                <RotateCcw className="h-5 w-5" />
                Restart
              </button>
            </div>

            <button
              onClick={goNext}
              disabled={isLastStep}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isLastStep
                  ? "bg-blue-800 text-blue-400 cursor-not-allowed opacity-50"
                  : "bg-blue-700 text-white hover:bg-blue-600 active:scale-95"
              }`}
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Info Text */}
          {isLastStep && (
            <p className="text-center text-blue-100 text-sm mt-4">
              You've completed {personaName}'s experience journey. Click "Restart" to begin again or exit to return to personas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

