import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface OnboardingPageProps {
  onComplete: () => void;
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="flex flex-col h-full bg-background select-none relative overflow-hidden font-sans">
      
      {/* Step Indicators - Frosted Glass capsule at top right */}
      <div className="absolute top-5 right-5 flex items-center gap-1.5 z-20 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              currentStep === idx
                ? "w-4 bg-[var(--brand-gold)]"
                : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col min-h-0">
        
        {/* Top Image Container - takes up all remaining height */}
        <div className="flex-1 w-full relative overflow-hidden bg-muted/20">
          {currentStep === 0 && (
            <img 
              src="/louise-pilgaard-mSCsaPifGUs-unsplash.jpg" 
              alt="Empower Quick Sourcing" 
              className="w-full h-full object-cover select-none pointer-events-none animate-[fadeIn_0.3s_ease-out]" 
            />
          )}
          {currentStep === 1 && (
            <img 
              src="/vincent-leyva-txlnlMv28Ow-unsplash.jpg" 
              alt="Elevate Sourcing" 
              className="w-full h-full object-cover select-none pointer-events-none animate-[fadeIn_0.3s_ease-out]" 
            />
          )}
          {currentStep === 2 && (
            <img 
              src="/gerold-hinzen-hGncIpZnSBw-unsplash.jpg" 
              alt="Stay Compliant" 
              className="w-full h-full object-cover select-none pointer-events-none animate-[fadeIn_0.3s_ease-out]" 
            />
          )}
        </div>

        {/* Bottom Card - fits content height, overlapping the image slightly */}
        <div className="relative -mt-6 bg-card rounded-t-[32px] px-6 pt-8 pb-8 shrink-0 shadow-2xl border-t border-border/10 z-10 flex flex-col gap-6">
          
          {/* Text Content */}
          <div className="space-y-3">
            {currentStep === 0 && (
              <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
                <h1 className="text-2xl font-black text-foreground tracking-tight leading-[1.15] uppercase">
                  Empower Yourself<br />
                  With Quick Sourcing
                </h1>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Discover reliable suppliers, instantly request pricing, and simplify your construction logistics.
                </p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
                <h2 className="text-xl font-extrabold text-foreground uppercase tracking-tight leading-[1.15]">
                  Elevate Sourcing<br />
                  With Quick Insights
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Rent heavy telehandlers, excavator systems, and specialized site machinery instantly from local suppliers.
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
                <h2 className="text-xl font-extrabold text-foreground uppercase tracking-tight leading-[1.15]">
                  Stay Compliant &<br />
                  Achieve Project Goals
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Order high-visibility ANSI vests, PPE bundles, and site safety barriers. Get instant verification and tracking.
                </p>
              </div>
            )}
          </div>

          {/* Bottom controls row (Skip & Next) */}
          <div className="flex justify-between items-center pt-2 border-t border-border/5 shrink-0">
            <button
              onClick={handleSkip}
              className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition focus:outline-none py-2"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] flex items-center justify-center text-white shadow-md transition active-scale"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default OnboardingPage;
