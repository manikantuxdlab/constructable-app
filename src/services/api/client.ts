import { CONFIG } from "../../config"

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Base API client.
 * In a real application, you would configure Axios or Fetch here:
 * 
 * import axios from 'axios';
 * export const httpClient = axios.create({
 *   baseURL: CONFIG.API_BASE_URL,
 *   headers: { 'Content-Type': 'application/json' }
 * });
 * 
 * We use this interface to easily toggle between mock operations and actual network calls.
 */
export const apiClient = {
  get: async <T>(url: string, mockFallback: () => T): Promise<T> => {
    if (CONFIG.USE_MOCK_DATA) {
      await delay(400); // simulate network request latency
      return mockFallback();
    }
    
    // Real integration example:
    const response = await fetch(`${CONFIG.API_BASE_URL}${url}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json() as Promise<T>;
  },

  post: async <T>(url: string, data: any, mockFallback: () => T): Promise<T> => {
    if (CONFIG.USE_MOCK_DATA) {
      await delay(500); // simulate network request latency
      return mockFallback();
    }

    // Real integration example:
    const response = await fetch(`${CONFIG.API_BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json() as Promise<T>;
  },

  delete: async <T>(url: string, mockFallback: () => T): Promise<T> => {
    if (CONFIG.USE_MOCK_DATA) {
      await delay(400);
      return mockFallback();
    }

    // Real integration example:
    const response = await fetch(`${CONFIG.API_BASE_URL}${url}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json() as Promise<T>;
  }
};
