import { useState } from "react";
import { ArrowRight, HardHat, ShieldCheck, Construction, Truck, FileCheck, Users } from "lucide-react";

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
      
      {/* Step Indicators (Dots at the top right) */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              currentStep === idx
                ? "w-4 bg-[var(--brand-gold)]"
                : "w-1.5 bg-dot-inactive"
            }`}
          />
        ))}
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 flex flex-col justify-between p-6 relative min-h-0">
        
        {/* SLIDE 0: Empower Sourcing (Title top, Button top, Illustration bottom) */}
        {currentStep === 0 && (
          <div className="flex-1 flex flex-col justify-between pt-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="space-y-4">
              <h1 className="text-3xl font-black text-foreground tracking-tight leading-[1.1] uppercase">
                Empower<br />
                Yourself With<br />
                Quick<br />
                Sourcing
              </h1>
              
              {/* Circular Next Button Left Aligned */}
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] flex items-center justify-center text-white shadow-md transition active-scale"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Illustration on bottom right */}
            <div className="w-full flex justify-end items-end h-[360px] relative -mr-6 -mb-6 mt-4">
              <svg className="w-[85%] h-full" viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background soft blob */}
                <path d="M50 180C50 100 120 50 200 50C280 50 320 120 320 180C320 240 280 320 200 320C120 320 50 260 50 180Z" fill="var(--brand-gold)" fillOpacity="0.06"/>
                
                {/* Modern architectural building blueprints */}
                <rect x="140" y="100" width="100" height="220" rx="4" fill="none" stroke="var(--brand-gold)" strokeWidth="1.5" strokeDasharray="3 3"/>
                <rect x="80" y="150" width="100" height="170" rx="4" fill="none" stroke="var(--brand-gold)" strokeWidth="1.5"/>
                
                {/* Grid lines inside blueprints */}
                <line x1="80" y1="200" x2="180" y2="200" stroke="var(--brand-gold)" strokeWidth="0.5" strokeOpacity="0.5" />
                <line x1="80" y1="250" x2="180" y2="250" stroke="var(--brand-gold)" strokeWidth="0.5" strokeOpacity="0.5" />
                <line x1="140" y1="150" x2="240" y2="150" stroke="var(--brand-gold)" strokeWidth="0.5" strokeOpacity="0.5" />
                <line x1="140" y1="220" x2="240" y2="220" stroke="var(--brand-gold)" strokeWidth="0.5" strokeOpacity="0.5" />
                
                {/* Floating circular badges representing concrete specialists and services */}
                <g filter="drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05))">
                  <circle cx="95" cy="180" r="22" fill="white" className="dark:fill-[var(--card)]" stroke="var(--brand-gold)" strokeWidth="1"/>
                  <path d="M95 172C91.6863 172 89 174.686 89 178C89 181.314 91.6863 184 95 184C98.3137 184 101 181.314 101 178" stroke="var(--brand-gold)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="95" cy="178" r="3" fill="var(--brand-gold)"/>
                </g>

                <g filter="drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05))">
                  <circle cx="180" cy="120" r="25" fill="white" className="dark:fill-[var(--card)]"/>
                  <foreignObject x="166" y="106" width="28" height="28">
                    <Construction className="w-7 h-7 text-[var(--brand-gold)]" />
                  </foreignObject>
                </g>

                <g filter="drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05))">
                  <circle cx="210" cy="230" r="20" fill="var(--brand-gold-light)"/>
                  <foreignObject x="198" y="218" width="24" height="24">
                    <Users className="w-6 h-6 text-[var(--brand-gold)]" />
                  </foreignObject>
                </g>
              </svg>
            </div>
          </div>
        )}

        {/* SLIDE 1: Heavy Rentals (Graphic center-top, Text bottom-left, Button bottom-right) */}
        {currentStep === 1 && (
          <div className="flex-1 flex flex-col justify-between pt-6 animate-[fadeIn_0.3s_ease-out]">
            {/* Graphic center-top */}
            <div className="w-full flex items-center justify-center h-[260px] relative mt-2">
              <svg className="w-full h-full" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background blob */}
                <circle cx="160" cy="130" r="90" fill="var(--brand-gold)" fillOpacity="0.04" />
                
                {/* Modern floating mockups representation */}
                {/* Back card */}
                <rect x="70" y="40" width="150" height="140" rx="12" fill="white" className="dark:fill-[var(--card)]" stroke="var(--brand-border)" strokeWidth="1" />
                <rect x="85" y="60" width="120" height="8" rx="4" fill="var(--brand-gold-light)" />
                <rect x="85" y="80" width="90" height="6" rx="3" fill="slate-100" className="dark:fill-slate-900" />
                <rect x="85" y="95" width="100" height="6" rx="3" fill="slate-100" className="dark:fill-slate-900" />
                
                {/* Front card showing Caterpillar Excavator rental */}
                <g filter="drop-shadow(0px 8px 16px rgba(166, 110, 78, 0.12))">
                  <rect x="100" y="80" width="160" height="140" rx="12" fill="white" className="dark:fill-[var(--card)]" stroke="var(--brand-gold)" strokeWidth="1"/>
                  <rect x="115" y="100" width="130" height="50" rx="6" fill="slate-50" className="dark:fill-slate-900" />
                  
                  {/* Excavator mini drawing */}
                  <path d="M135 135H155V145H135V135Z" fill="var(--brand-gold)" />
                  <path d="M150 135L170 120" stroke="var(--brand-gold)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M170 120L185 135" stroke="var(--brand-gold)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="140" cy="148" r="4" fill="var(--brand-dark-charcoal)" />
                  <circle cx="150" cy="148" r="4" fill="var(--brand-dark-charcoal)" />

                  {/* Pricing info */}
                  <text x="115" y="175" fill="var(--brand-dark-charcoal)" className="dark:fill-slate-200" fontSize="10" fontWeight="bold">CAT 320 Excavator</text>
                  <text x="115" y="195" fill="var(--brand-gold)" fontSize="12" fontWeight="black">$850/day</text>
                  
                  {/* Delivery truck icon */}
                  <foreignObject x="220" y="178" width="22" height="22">
                    <Truck className="w-5 h-5 text-[var(--brand-gold)]" />
                  </foreignObject>
                </g>
              </svg>
            </div>

            {/* Title, description, and next button on the bottom */}
            <div className="space-y-4 pt-4">
              <div className="space-y-2 text-left">
                <h2 className="text-xl font-extrabold text-foreground uppercase tracking-tight leading-tight">
                  Elevate Sourcing<br />
                  With Quick Insights
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Rent heavy telehandlers, excavator systems, and specialized site machinery instantly from local suppliers.
                </p>
              </div>

              {/* Circular Next Button Right Aligned */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] flex items-center justify-center text-white shadow-md transition active-scale"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: OSHA & Safety (Graphic center-top, Text bottom-left, Button bottom-right) */}
        {currentStep === 2 && (
          <div className="flex-1 flex flex-col justify-between pt-6 animate-[fadeIn_0.3s_ease-out]">
            {/* Graphic center-top */}
            <div className="w-full flex items-center justify-center h-[260px] relative mt-2">
              <svg className="w-full h-full" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Blob */}
                <circle cx="160" cy="130" r="95" fill="var(--brand-gold)" fillOpacity="0.04" />
                
                {/* Circular shield ring */}
                <circle cx="160" cy="120" r="70" stroke="var(--brand-gold-light)" strokeWidth="3" strokeDasharray="6 6"/>
                
                {/* Stylized safety graphics */}
                <g filter="drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.05))">
                  <circle cx="160" cy="120" r="50" fill="white" className="dark:fill-[var(--card)]"/>
                  
                  {/* Floating safety icons */}
                  <foreignObject x="142" y="102" width="36" height="36">
                    <ShieldCheck className="w-9 h-9 text-emerald-500" />
                  </foreignObject>
                </g>

                {/* Hard Hat representation */}
                <g filter="drop-shadow(0px 4px 10px rgba(166, 110, 78, 0.15))">
                  <circle cx="110" cy="150" r="22" fill="var(--brand-gold-light)" />
                  <foreignObject x="98" y="138" width="24" height="24">
                    <HardHat className="w-6 h-6 text-[var(--brand-gold)]" />
                  </foreignObject>
                </g>

                {/* Checklist clipboard */}
                <g filter="drop-shadow(0px 4px 10px rgba(166, 110, 78, 0.15))">
                  <circle cx="210" cy="150" r="22" fill="white" className="dark:fill-[var(--card)]" stroke="var(--brand-border)" strokeWidth="1"/>
                  <foreignObject x="198" y="138" width="24" height="24">
                    <FileCheck className="w-6 h-6 text-[var(--brand-gold)]" />
                  </foreignObject>
                </g>
              </svg>
            </div>

            {/* Title, subtext, and navigation button */}
            <div className="space-y-4 pt-4">
              <div className="space-y-2 text-left">
                <h2 className="text-xl font-extrabold text-foreground uppercase tracking-tight leading-tight">
                  Stay Compliant &<br />
                  Achieve Project Goals
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Order high-visibility ANSI vests, PPE bundles, and site safety barriers. Get instant verification and tracking.
                </p>
              </div>

              {/* Get Started Button */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] flex items-center justify-center text-white shadow-md transition active-scale"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Consistent Bottom Row: Skip Link (bottom-left) */}
        <div className="flex justify-between items-center pt-4 z-10">
          <button
            onClick={handleSkip}
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition focus:outline-none"
          >
            Skip
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default OnboardingPage;
