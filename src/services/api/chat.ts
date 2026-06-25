import { INITIAL_CHAT_THREADS } from "../../lib/mockData"
import type { ChatThread } from "../../types"
import { apiClient } from "./client"

const CHAT_THREADS_KEY = "sitesupply_chat_threads"
const QUOTES_COUNT_KEY = "sitesupply_quotes_count"

const getMockThreads = (): ChatThread[] => {
  if (typeof window === "undefined") return [];
  const threads = localStorage.getItem(CHAT_THREADS_KEY);
  if (!threads) {
    localStorage.setItem(CHAT_THREADS_KEY, JSON.stringify(INITIAL_CHAT_THREADS));
    return INITIAL_CHAT_THREADS;
  }
  return JSON.parse(threads);
};

const getMockQuotesCount = (): number => {
  if (typeof window === "undefined") return 1;
  const count = localStorage.getItem(QUOTES_COUNT_KEY);
  if (!count) {
    localStorage.setItem(QUOTES_COUNT_KEY, "1");
    return 1;
  }
  return parseInt(count, 10);
};

export const chatService = {
  /**
   * Fetch all message threads
   */
  getChatThreads: async (): Promise<ChatThread[]> => {
    return apiClient.get<ChatThread[]>("/chats", () => getMockThreads());
  },

  /**
   * Save the state of threads (for local mock syncing)
   */
  saveChatThreads: async (threads: ChatThread[]): Promise<void> => {
    return apiClient.post<void>("/chats/save", threads, () => {
      localStorage.setItem(CHAT_THREADS_KEY, JSON.stringify(threads));
    });
  },

  /**
   * Retrieve total number of bids/quotes submitted
   */
  getQuotesCount: async (): Promise<number> => {
    return apiClient.get<number>("/quotes/count", () => getMockQuotesCount());
  },

  /**
   * Increment sent quote metrics counter
   */
  incrementQuotesCount: async (): Promise<number> => {
    return apiClient.post<number>("/quotes/increment", {}, () => {
      const count = getMockQuotesCount();
      const newCount = count + 1;
      localStorage.setItem(QUOTES_COUNT_KEY, newCount.toString());
      return newCount;
    });
  }
};

export default chatService;
