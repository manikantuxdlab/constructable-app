import { useApp } from "../context/AppContext"

/**
 * Custom hook to manage active theme mode and toggle between light and dark styling.
 */
export function useTheme() {
  const { isDarkMode, setIsDarkMode } = useApp();

  return {
    isDarkMode,
    setIsDarkMode,
    toggleTheme: () => setIsDarkMode(!isDarkMode),
  };
}

export default useTheme;
