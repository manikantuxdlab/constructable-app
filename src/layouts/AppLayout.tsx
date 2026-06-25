import { Outlet, useNavigate, useLocation as useRouteLocation } from "react-router-dom"
import { Search, Compass, Mail, User, PlusSquare, MapPin, Settings, Check, AlertTriangle } from "lucide-react"
import { useLocation } from "../hooks/useLocation"
import { useChat } from "../hooks/useChat"
import { useSuppliers } from "../hooks/useSuppliers"
import { useModals } from "../hooks/useModals"

export function AppLayout() {
  const navigate = useNavigate()
  const routeLocation = useRouteLocation()
  
  const { currentLocation, setCurrentLocation, showLocModal, setShowLocModal } = useLocation()
  const { activeThreadId, selectThread, unreadCount } = useChat()
  const { selectedCategory, setSelectedCategory, setSelectedSupplier } = useSuppliers()
  const {
    showSettingsModal,
    setShowSettingsModal,
    quickAccessType,
    setQuickAccessType,
    showBannerModal,
    setShowBannerModal,
  } = useModals()

  // Parse path to active tab
  const path = routeLocation.pathname.substring(1)
  const activeTab = (["search", "categories", "post", "messages", "account"] as const).includes(path as any)
    ? (path as "search" | "categories" | "post" | "messages" | "account")
    : "categories"

  // Navigation tab definitions with Lucide Icons
  const tabs = [
    { id: "search", label: "Search", icon: Search },
    { id: "categories", label: "Categories", icon: Compass },
    { id: "post", label: "Post", icon: PlusSquare },
    { id: "messages", label: "Messages", icon: Mail },
    { id: "account", label: "Account", icon: User },
  ] as const

  return (
    <>
      {/* Consistent App-wide Header */}
      {!(activeTab === "messages" && activeThreadId !== null) && 
       !(activeTab === "categories" && selectedCategory !== null) && (
        <header className="px-4 py-3 border-b border-border bg-card flex items-center justify-between sticky top-0 z-10 shrink-0 select-none">
          {/* Left Side: Map Pin & Location */}
          <button 
            onClick={() => setShowLocModal(true)}
            className="flex items-center gap-1.5 text-xs text-foreground font-semibold hover:opacity-85 transition active-scale cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[var(--brand-gold)]" />
            <span className="uppercase tracking-wide text-[10px]">{currentLocation}</span>
          </button>
          
          {/* Center: SITESUPPLY title */}
          <h2 className="text-xs font-black tracking-widest text-[var(--brand-gold)] uppercase">
            SITESUPPLY
          </h2>
          
          {/* Right Side: Settings Cog */}
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="p-1 text-muted-foreground hover:text-foreground transition active-scale"
          >
            <Settings className="w-4 h-4" />
          </button>
        </header>
      )}

      {/* Dynamic App Content Screen Area */}
      <div className="flex-1 min-h-0 relative flex flex-col">
        <Outlet />
      </div>

      {/* Navigation Bottom Tab Bar */}
      <nav className="h-16 border-t border-border bg-card px-3 flex justify-around items-center shrink-0 z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => {
                navigate(`/${tab.id}`)
                setSelectedCategory(null)
                setSelectedSupplier(null)
                if (tab.id !== "messages") {
                  selectThread(null)
                }
              }}
              className={`flex flex-col items-center justify-center transition-all duration-200 active-scale ${
                isActive 
                  ? "bg-brand-gold-light text-[var(--brand-gold)] rounded-xl px-4 py-2 shrink-0 scale-105" 
                  : "text-muted-foreground hover:text-foreground py-2 px-3"
              }`}
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {/* Messages Badge count */}
                {tab.id === "messages" && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-[9px] font-bold mt-1 tracking-wide ${isActive ? "block" : "block opacity-80"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>


      {/* LOCATION SELECTOR MODAL */}
      {showLocModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-background border border-border rounded-none p-5 max-w-xs w-full shadow-lg space-y-4 animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)]">
            <div>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Set Active District</h3>
              <p className="text-[11px] text-muted-foreground">Select project radius zone for local pricing.</p>
            </div>
            
            <div className="space-y-1.5">
              {['Denver, CO', 'Houston, TX', 'Chicago, IL', 'Boston, MA', 'New York, NY'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setCurrentLocation(loc)
                    setShowLocModal(false)
                  }}
                  className={`w-full text-xs font-semibold p-2.5 rounded-none border text-left flex justify-between items-center active-scale ${
                    currentLocation === loc
                      ? "bg-[var(--brand-gold-light)] text-[var(--brand-gold)] border-[var(--brand-gold)]/30 font-bold"
                      : "bg-card text-foreground border-muted hover:border-muted-foreground/30"
                  }`}
                >
                  {loc}
                  {currentLocation === loc && <Check className="w-3.5 h-3.5 text-[var(--brand-gold)]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-background border border-border rounded-none p-5 max-w-xs w-full shadow-lg space-y-4 animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Site Settings</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Configuration panel</p>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="text-xs text-muted-foreground hover:text-foreground px-2 py-0.5 rounded bg-muted/50"
              >
                Close
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-muted/20 border border-muted rounded-none">
                <p className="font-bold text-foreground">SITESUPPLY Core</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Vite + React 19 + Tailwind v4</p>
                <p className="text-[10px] text-muted-foreground">Version 1.0.4 - Premium Build</p>
              </div>
              <div className="p-3 bg-muted/20 border border-muted rounded-none space-y-1 text-muted-foreground">
                <p className="font-semibold text-foreground text-[10px] uppercase tracking-wider">Verification Checklist</p>
                <p className="text-[10px]">&bull; Subcontractor index verified</p>
                <p className="text-[10px]">&bull; Messaging websockets simulated</p>
                <p className="text-[10px]">&bull; RFQ dispatch state tracking</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ACCESS MODAL */}
      {quickAccessType && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-background border border-border rounded-none p-5 max-w-xs w-full shadow-lg space-y-4 animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex justify-between items-start">
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-[var(--brand-gold)]">
                {quickAccessType === "rentals" ? "Hot Jobsite rentals" : "Safety Bundles"}
              </span>
              <button 
                onClick={() => setQuickAccessType(null)}
                className="text-[10px] text-muted-foreground hover:text-foreground font-semibold px-2 py-0.5 rounded bg-muted/50 active-scale"
              >
                Close
              </button>
            </div>

            {quickAccessType === "rentals" ? (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-foreground">Premium Construction Machinery</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Fast delivery on telehandlers, scissor lifts, excavation machinery, and aggregate screening devices. Contact matching service below.
                </p>
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs p-2 bg-muted/30 rounded-none">
                    <span>Lull / Telehandler (10k lb)</span>
                    <span className="font-bold text-[var(--brand-gold)]">$380/day</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2 bg-muted/30 rounded-none">
                    <span>Caterpillar Excavator 320</span>
                    <span className="font-bold text-[var(--brand-gold)]">$850/day</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setQuickAccessType(null)
                    navigate("/search")
                  }}
                  className="w-full py-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white text-xs font-bold rounded-none transition active-scale"
                >
                  Search Excavators Directory
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-foreground">Bulk PPE & Safety Packages</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Ensure full OSHA compliance with pre-packaged kits containing ANSI high-vis vests, Class E hard hats, protective eyewear, and hearing protection.
                </p>
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs p-2 bg-muted/30 rounded-none">
                    <span>Standard Crew Pack (10 Vests/Hats)</span>
                    <span className="font-bold text-[var(--brand-gold)]">$245</span>
                  </div>
                  <div className="flex justify-between items-center text-xs p-2 bg-muted/30 rounded-none">
                    <span>First-Aid Station Type III Class A</span>
                    <span className="font-bold text-[var(--brand-gold)]">$115</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setQuickAccessType(null)
                    navigate("/search")
                  }}
                  className="w-full py-2 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white text-xs font-bold rounded-none transition active-scale"
                >
                  Search Safety Equipment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BANNER CAMPAIGN MODAL */}
      {showBannerModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-background border border-border rounded-none p-5 max-w-sm w-full shadow-lg space-y-4 animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex justify-between items-start">
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-[var(--brand-gold)]">Featured Event</span>
              <button 
                onClick={() => setShowBannerModal(false)}
                className="text-[10px] text-muted-foreground hover:text-foreground font-semibold px-2 py-0.5 rounded bg-muted/50 active-scale"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground">CONSTRUCTABLES 2024 Marketplace Campaign</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect with vetted premium contractors offering optimized lead times for structural foundation, geotech testing, and AIA legal consultation services.
              </p>
              <div className="p-3 bg-[var(--brand-gold-light)] border border-[var(--brand-gold)]/20 rounded-none flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[var(--brand-gold)] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-foreground">Exclusive Rates</p>
                  <p className="text-[9px] text-muted-foreground">Up to 15% reduction on initial retainer agreements filed during this cycle.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowBannerModal(false)
                  navigate("/search")
                }}
                className="w-full py-2.5 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white text-xs font-bold rounded-none transition active-scale text-center block"
              >
                Browse Featured Suppliers
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
