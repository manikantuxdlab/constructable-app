export function SplashScreen() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-[var(--brand-gold)] relative select-none font-sans h-full animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col items-center">
        {/* Logo square box container */}
        <div className="w-18 h-18 bg-white rounded-3xl flex items-center justify-center p-3 shadow-md border border-white/10 active-scale">
          <img 
            src="/logo.png" 
            className="w-full h-full object-contain select-none pointer-events-none" 
            alt="Constructables Logo" 
          />
        </div>
        <h1 className="text-xs font-black tracking-[0.25em] text-white mt-5 uppercase">
          Constructables
        </h1>
        <p className="text-[7.5px] text-white/70 font-extrabold tracking-[0.3em] uppercase mt-1">
          Sourcing Simplified
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
