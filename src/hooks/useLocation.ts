import { useApp } from "../context/AppContext"

/**
 * Custom hook to control active geographical district and modal state.
 */
export function useLocation() {
  const {
    currentLocation,
    setCurrentLocation,
    showLocModal,
    setShowLocModal,
  } = useApp();

  return {
    currentLocation,
    setCurrentLocation,
    showLocModal,
    setShowLocModal,
  };
}

export default useLocation;
