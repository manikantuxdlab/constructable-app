import type { UserProfile } from "../../types"
import { apiClient } from "./client"

export const authService = {
  /**
   * Log in user
   */
  login: async (email: string, name: string): Promise<UserProfile> => {
    return apiClient.post<UserProfile>(
      "/auth/login",
      { email, name },
      () => {
        // Mock payload returned in mock state
        return { email, name };
      }
    );
  },

  /**
   * Log out user
   */
  logout: async (): Promise<void> => {
    return apiClient.post<void>(
      "/auth/logout",
      {},
      () => {
        // Mock cleanup action
      }
    );
  }
};

export default authService;
