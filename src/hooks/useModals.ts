import { useApp } from "../context/AppContext"

/**
 * Custom hook to control settings, quick-access info, and banner campaign modal overlays.
 */
export function useModals() {
  const {
    showSettingsModal,
    setShowSettingsModal,
    quickAccessType,
    setQuickAccessType,
    showBannerModal,
    setShowBannerModal,
  } = useApp();

  return {
    showSettingsModal,
    setShowSettingsModal,
    quickAccessType,
    setQuickAccessType,
    showBannerModal,
    setShowBannerModal,
  };
}

export default useModals;
