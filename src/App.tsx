import { useState, useEffect } from "react"
import { ChevronLeft, Star } from "lucide-react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import { useSuppliers } from "./hooks/useSuppliers"
import { CategoriesPage } from "./pages/CategoriesPage"
import { SearchPage } from "./pages/SearchPage"
import { PostPage } from "./pages/PostPage"
import { MessagesPage } from "./pages/MessagesPage"
import { AccountPage } from "./pages/AccountPage"
import { LoginPage } from "./pages/LoginPage"
import { OnboardingPage } from "./pages/OnboardingPage"
import { AppLayout } from "./layouts/AppLayout"
import { SupplierDetail } from "./components/SupplierDetail"
import { MOCK_SUPPLIERS } from "./lib/mockData"
import { CATEGORIES_MAP } from "./constants"
import { SplashScreen } from "./components/SplashScreen"

export function App() {
  const { isAuthenticated, loading } = useAuth()
  const [showSplash, setShowSplash] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const { 
    selectedCategory, 
    setSelectedCategory, 
    selectedSupplier, 
    setSelectedSupplier, 
    submitQuoteRequest 
  } = useSuppliers()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  const categoryDetails = selectedCategory
    ? CATEGORIES_MAP[selectedCategory as keyof typeof CATEGORIES_MAP]
    : null

  const filteredCategorySuppliers = selectedCategory
    ? MOCK_SUPPLIERS.filter(s => s.category === selectedCategory)
    : []

  return (
    <div className="min-h-screen bg-outer-bg text-foreground flex flex-col justify-center items-center p-0 sm:p-6 transition-colors duration-300 relative overflow-hidden font-sans">
      
      {/* Smartphone Container Mock */}
      <div className="w-full h-screen sm:max-w-[365px] sm:h-[780px] bg-background sm:border sm:border-outer-border sm:rounded-2xl sm:shadow-xl overflow-hidden flex flex-col relative z-10">
        
        {loading || showSplash ? (
          <SplashScreen />
        ) : !isAuthenticated && showOnboarding ? (
          <OnboardingPage
            onComplete={() => {
              setShowOnboarding(false);
              localStorage.setItem("onboarding_complete", "true");
            }}
          />
        ) : (
          <>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={
                isAuthenticated ? (
                  <Navigate to="/categories" replace />
                ) : (
                  <LoginPage />
                )
              } />

              {/* Authenticated Shell Route */}
              <Route element={
                isAuthenticated ? (
                  <AppLayout />
                ) : (
                  <Navigate to="/login" replace />
                )
              }>
                <Route path="/search" element={
                  <SearchPage />
                } />
                
                <Route path="/categories" element={
                  selectedCategory ? (
                    <div className="flex flex-col h-full bg-background animate-[fadeIn_0.2s_ease-out]">
                      <header className="px-3 py-2.5 border-b border-border bg-card flex items-center justify-between sticky top-0 z-10 shrink-0">
                        <button 
                          onClick={() => setSelectedCategory(null)}
                          className="flex items-center gap-1 text-xs text-[var(--brand-gold)] font-bold active-scale"
                        >
                          <ChevronLeft className="w-4 h-4" /> Back
                        </button>
                        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider truncate max-w-[200px]">
                          {categoryDetails?.title}
                        </h3>
                        <div className="w-12" /> {/* Spacer */}
                      </header>

                      <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                        <div className="space-y-1">
                          <span className="text-[10px] text-[var(--brand-gold)] font-extrabold uppercase tracking-widest">
                            Available Providers
                          </span>
                          <p className="text-[11px] text-muted-foreground leading-normal">
                            {categoryDetails?.description}
                          </p>
                        </div>

                        <div className="space-y-2.5">
                          {filteredCategorySuppliers.map((supplier) => (
                            <button
                              key={supplier.id}
                              onClick={() => setSelectedSupplier(supplier)}
                              className="w-full flex p-3.5 bg-card border border-border rounded-none text-left hover:border-[var(--brand-gold)]/40 hover:shadow-xs transition active-scale group"
                            >
                              <div className={`w-12 h-12 rounded-none ${supplier.avatarBg} text-white font-bold text-base flex items-center justify-center mr-4 shrink-0`}>
                                {supplier.avatarText}
                              </div>

                              <div className="flex-1 min-w-0 pr-1">
                                <div className="flex justify-between items-start gap-1">
                                  <h4 className="text-xs font-bold text-foreground truncate group-hover:text-[var(--brand-gold)] transition-colors leading-tight">
                                    {supplier.name}
                                  </h4>
                                  <div className="flex items-center text-amber-500 font-bold text-[10px] shrink-0">
                                    <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                                    {supplier.rating}
                                  </div>
                                </div>

                                <p className="text-[10px] text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                                  {supplier.description}
                                </p>

                                <div className="flex flex-wrap gap-1 mt-2.5">
                                  {supplier.tags.slice(0, 2).map((t, idx) => (
                                    <span key={idx} className="text-[8px] bg-brand-gold-light text-brand-gold px-2 py-0.5 rounded">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <CategoriesPage />
                  )
                } />

                <Route path="/post" element={
                  <PostPage />
                } />

                <Route path="/messages" element={
                  <MessagesPage />
                } />

                <Route path="/account" element={
                  <AccountPage />
                } />
                
                <Route path="/" element={<Navigate to="/categories" replace />} />
                <Route path="*" element={<Navigate to="/categories" replace />} />
              </Route>
            </Routes>

            {/* Supplier detail Slide-over */}
            {selectedSupplier && (
              <SupplierDetail
                supplier={selectedSupplier}
                onClose={() => setSelectedSupplier(null)}
                onRequestQuoteSubmit={submitQuoteRequest}
              />
            )}
          </>
        )}

      </div>
    </div>
  )
}

export default App