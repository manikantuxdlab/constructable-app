import { Landmark, Microscope, Compass, Home, ChevronRight, Shield, Construction, Info } from 'lucide-react';
import { CATEGORIES_MAP } from '../constants';
import { useSuppliers } from '../hooks/useSuppliers';
import { useModals } from '../hooks/useModals';

export function CategoriesPage() {
  const { setSelectedCategory } = useSuppliers();
  const { setQuickAccessType, setShowBannerModal } = useModals();

  
  // Icon resolver based on iconName
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'landmark':
        return <Landmark className="w-6 h-6 text-white" />;
      case 'microscope':
        return <Microscope className="w-6 h-6 text-white" />;
      case 'drafting-compass':
        return <Compass className="w-6 h-6 text-white" />;
      case 'home':
        return <Home className="w-6 h-6 text-white" />;
      default:
        return <Construction className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Main Scroll Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {/* Industry Categories Header */}
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-foreground tracking-tight">Industry Categories</h1>
          <p className="text-xs text-muted-foreground leading-normal">
            Select a core service branch to browse specialized suppliers and contractors.
          </p>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {Object.values(CATEGORIES_MAP).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="w-full flex items-center p-3.5 bg-card border border-border rounded-none text-left transition-all hover:scale-[1.01] hover:border-[var(--brand-gold)]/40 hover:shadow-xs active-scale group"
            >
              {/* Category Icon Wrapper */}
              <div className="w-12 h-12 bg-[var(--brand-gold)] rounded-none flex items-center justify-center mr-4 shrink-0">
                {renderCategoryIcon(cat.iconName)}
              </div>


              {/* Text content */}
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider leading-tight group-hover:text-[var(--brand-gold)] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  {cat.subtitle}
                </p>
              </div>

              {/* Chevron */}
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-[var(--brand-gold)] transition-colors group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>

        {/* Quick Access */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-extrabold text-[var(--brand-gold)] uppercase tracking-wider">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Hot Jobsite card */}
            <button
              onClick={() => setQuickAccessType('rentals')}
              className="relative h-24 rounded-none bg-quick-rental text-left p-3.5 overflow-hidden active-scale hover:opacity-95 transition group"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider">HOT JOBSITE</span>
                <span className="text-xs font-bold text-white tracking-wide mt-1">Heavy Rentals</span>
              </div>
              {/* Decorative icon backdrop */}
              <Construction className="absolute bottom-1 right-1 w-12 h-12 text-white/10 group-hover:scale-110 transition duration-300 pointer-events-none" />
            </button>

            {/* Safety card */}
            <button
              onClick={() => setQuickAccessType('safety')}
              className="relative h-24 rounded-none bg-quick-safety text-left p-3.5 overflow-hidden active-scale hover:opacity-95 transition group"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <span className="text-[9px] font-bold text-white/50 uppercase tracking-wider">SAFETY</span>
                <span className="text-xs font-bold text-white tracking-wide mt-1">PPE Bundles</span>
              </div>
              {/* Decorative icon backdrop */}
              <Shield className="absolute bottom-1 right-1 w-12 h-12 text-white/10 group-hover:scale-110 transition duration-300 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Banner Section */}
        <button
          onClick={() => setShowBannerModal(true)}
          className="w-full relative h-40 rounded-none overflow-hidden active-scale group text-left block"
        >
          <img 
            src="/constructables_banner.png" 
            alt="Constructables 2024"
            className="w-full h-full object-cover filter brightness-[0.4] group-hover:scale-[1.02] transition duration-500"
          />
          <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">CONSTRUCTABLES 2024</h3>
            <p className="text-[10px] text-white/75 mt-0.5 font-light">Premium Sourcing for Modern Builders</p>
          </div>
          <div className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white p-1 rounded-full backdrop-blur-sm transition">
            <Info className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </div>
  );
}
