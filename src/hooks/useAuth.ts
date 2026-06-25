import { useAuth as useAuthContext } from "../context/AuthContext"

/**
 * Custom hook to consume user authentication state and operations.
 */
export function useAuth() {
  const context = useAuthContext();
  
  return {
    isAuthenticated: context.isAuthenticated,
    userProfile: context.userProfile,
    loading: context.loading,
    login: context.login,
    signUp: context.signUp,
    loginWithGoogle: context.loginWithGoogle,
    logout: context.logout,
  };
}

export default useAuth;
