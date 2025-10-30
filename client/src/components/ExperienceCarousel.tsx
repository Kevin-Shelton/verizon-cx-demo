import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export interface ExperienceStep {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "email" | "ivr" | "field-services" | "email-viewer" | "ivr-voice" | "website-translation" | "live-chat" | "document-translation";
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
  const [contentHtml, setContentHtml] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
    }
  };

  const goNext = () => goToStep(currentStep + 1);
  const goPrev = () => goToStep(currentStep - 1);
  const restart = () => goToStep(0);

  const handleBackToPersonas = () => {
    window.location.href = "/personas";
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Fetch content for internal URLs
  const fetchContentHtml = async (url: string) => {
    if (url.startsWith('/experiences/')) {
      setLoading(true);
      try {
        console.log('Fetching content from:', url, 'for persona:', personaName);
        // Add cache-busting parameter to ensure fresh content
        const urlWithCache = `${url}?t=${Date.now()}`;
        const response = await fetch(urlWithCache, {
          method: 'GET',
          headers: {
            'Accept': 'text/html',
            'Cache-Control': 'no-cache',
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        console.log('Received HTML, length:', html.length);
        // Extract the inner content from the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const container = doc.querySelector('.container');
        if (container) {
          console.log('Found container, setting content');
          const newContent = container.innerHTML;
          console.log('New content preview:', newContent.substring(0, 100));
          setContentHtml(newContent);
        } else {
          console.error('Container not found in HTML');
          console.log('HTML body:', doc.body.innerHTML.substring(0, 500));
          // Try to find any main content area
          const main = doc.querySelector('main') || doc.querySelector('[role="main"]') || doc.body;
          if (main && main !== doc.body) {
            setContentHtml(main.innerHTML);
          } else {
            setContentHtml('<p>Error: Container not found</p>');
          }
        }
      } catch (error) {
        console.error('Failed to fetch content:', error);
        setContentHtml(`<p>Error loading content: ${error instanceof Error ? error.message : 'Unknown error'}</p>`);
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Fetch content when step changes or persona changes
  useEffect(() => {
    if (currentStepData && currentStepData.url.startsWith('/experiences/')) {
      // Reset content before fetching new content
      setContentHtml('');
      fetchContentHtml(currentStepData.url);
    }
  }, [currentStep, currentStepData?.url, personaName]);
  
  // Render embedded content for internal URLs
  const renderEmbeddedContent = () => {
    if (currentStepData.url.startsWith('/experiences/')) {
      return (
        <div className="p-8 overflow-y-auto max-h-[calc(100vh-400px)]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-600">Loading experience...</p>
            </div>
          ) : contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-600">No content available</p>
            </div>
          )}
        </div>
      );
    }
    
    // External URL - open in new window
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">This experience opens in a new window</p>
          <a
            href={currentStepData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Open Experience
          </a>
        </div>
      </div>
    );
  };

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
            onClick={handleBackToPersonas}
            title="Exit carousel"
            className="text-white hover:text-red-400 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-semibold">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-white text-sm font-semibold">
              {currentStepData?.title}
            </span>
          </div>
          <div className="w-full bg-blue-800 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-7xl mx-auto">
          {currentStepData && (
            <div>
              <div className="flex items-start gap-4 p-6 border-b">
                <img
                  src="/ikow-logo.png"
                  alt="ikOneWorld"
                  className="h-8 object-contain flex-shrink-0"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {currentStepData.title}
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed whitespace-normal">
                    {currentStepData.description}
                  </p>
                </div>
              </div>
              {renderEmbeddedContent()}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 border-t-2 border-blue-700 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Step Indicators */}
          <div className="flex justify-center gap-3 mb-6">
            {steps.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-10 h-10 rounded-full font-bold transition-all ${
                  index === currentStep
                    ? 'bg-white text-blue-900 scale-110'
                    : 'bg-blue-700 text-white hover:bg-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <motion.button
              onClick={goPrev}
              disabled={isFirstStep}
              className={`flex items-center gap-2 px-6 py-3 rounded font-semibold transition-all ${
                isFirstStep
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              whileHover={!isFirstStep ? { scale: 1.05 } : {}}
              whileTap={!isFirstStep ? { scale: 0.95 } : {}}
            >
              <span>← Previous</span>
            </motion.button>

            <motion.button
              onClick={restart}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Restart
            </motion.button>

            <motion.button
              onClick={goNext}
              disabled={isLastStep}
              className={`flex items-center gap-2 px-6 py-3 rounded font-semibold transition-all ${
                isLastStep
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              whileHover={!isLastStep ? { scale: 1.05 } : {}}
              whileTap={!isLastStep ? { scale: 0.95 } : {}}
            >
              <span>Next →</span>
            </motion.button>
          </div>

          {/* Completion Message */}
          {isLastStep && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center text-white text-sm"
            >
              <p>You've completed {personaName}'s experience journey. Click "Restart" to begin again or exit to return to personas.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

