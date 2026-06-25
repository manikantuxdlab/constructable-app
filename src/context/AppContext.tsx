import * as React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { jobsService, chatService } from "../services/api"
import type { Supplier, ChatThread, JobListing, Message } from "../types"

interface AppContextType {
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  chatThreads: ChatThread[];
  setChatThreads: React.Dispatch<React.SetStateAction<ChatThread[]>>;
  activeThreadId: string | null;
  setActiveThreadId: (tid: string | null) => void;
  postedJobs: JobListing[];
  quotesCount: number;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;
  selectedSupplier: Supplier | null;
  setSelectedSupplier: (supplier: Supplier | null) => void;
  
  // Modals state
  showLocModal: boolean;
  setShowLocModal: (show: boolean) => void;
  showSettingsModal: boolean;
  setShowSettingsModal: (show: boolean) => void;
  quickAccessType: "rentals" | "safety" | null;
  setQuickAccessType: (type: "rentals" | "safety" | null) => void;
  showBannerModal: boolean;
  setShowBannerModal: (show: boolean) => void;

  // Actions
  handleRequestQuoteSubmit: (projectTitle: string, budget: string, description: string) => void;
  handlePostSubmit: (newJob: { title: string; category: string; budget: string; description: string; location: string }) => void;
  handleDeleteJob: (jobId: string) => void;
  handleSelectThread: (threadId: string | null) => void;
  handleSendMessage: (threadId: string, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentLocation, currentLocationSet] = useState("Denver, CO")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([])
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)
  const [postedJobs, setPostedJobs] = useState<JobListing[]>([])
  const [quotesCount, setQuotesCount] = useState(1)
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)

  // Modals state
  const [showLocModal, setShowLocModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [quickAccessType, setQuickAccessType] = useState<"rentals" | "safety" | null>(null)
  const [showBannerModal, setShowBannerModal] = useState(false)

  // Custom setter to guard state mutation issues
  const setCurrentLocation = (loc: string) => {
    currentLocationSet(loc);
  };

  // Fetch initial data asynchronously on mount
  useEffect(() => {
    let active = true;
    const fetchInitialData = async () => {
      try {
        const jobs = await jobsService.getPostedJobs()
        const threads = await chatService.getChatThreads()
        const count = await chatService.getQuotesCount()
        if (active) {
          setPostedJobs(jobs)
          setChatThreads(threads)
          setQuotesCount(count)
        }
      } catch (err) {
        console.error("Failed to load initial data", err)
      }
    }
    fetchInitialData()
    return () => {
      active = false;
    };
  }, [])

  // Sync dark class on body
  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDarkMode])

  // Actions
  const handleRequestQuoteSubmit = async (projectTitle: string, budget: string, description: string) => {
    if (!selectedSupplier) return

    try {
      const newCount = await chatService.incrementQuotesCount()
      setQuotesCount(newCount)

      const systemMsgText = `📢 RFP Quote Request Submitted!\n\n• Project: ${projectTitle}\n• Budget Range: ${budget}\n• Requirements: ${description}`

      const existingThread = chatThreads.find(t => t.supplierId === selectedSupplier.id)
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: "user",
        text: systemMsgText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      let targetThreadId = ""
      let updatedThreads: ChatThread[] = []

      if (existingThread) {
        targetThreadId = existingThread.id
        updatedThreads = chatThreads.map(t => {
          if (t.id === existingThread.id) {
            return {
              ...t,
              lastMessage: `Quote Request: ${projectTitle}`,
              lastTimestamp: "Just now",
              unread: false,
              messages: [...t.messages, newMsg],
            }
          }
          return t
        })
      } else {
        targetThreadId = `chat-${selectedSupplier.id}`
        const newThread: ChatThread = {
          id: targetThreadId,
          supplierId: selectedSupplier.id,
          supplierName: selectedSupplier.name,
          supplierAvatarBg: selectedSupplier.avatarBg,
          supplierAvatarText: selectedSupplier.avatarText,
          lastMessage: `Quote Request: ${projectTitle}`,
          lastTimestamp: "Just now",
          unread: false,
          messages: [newMsg],
        }
        updatedThreads = [newThread, ...chatThreads]
      }

      setChatThreads(updatedThreads)
      await chatService.saveChatThreads(updatedThreads)

      setSelectedSupplier(null)
      setSelectedCategory(null)
      setActiveThreadId(targetThreadId)

      // Trigger simulated supplier response after delay
      setTimeout(async () => {
        const responseMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "supplier",
          text: `Hello! Thank you for requesting a bid for "${projectTitle}". Our Estimating Team has received the specs and we are preparing a proposal based on your budget of ${budget}. We will get back to you with terms shortly.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        const currentThreads = await chatService.getChatThreads()
        const finalThreads = currentThreads.map(t => {
          if (t.id === targetThreadId) {
            return {
              ...t,
              lastMessage: `We are preparing a proposal...`,
              lastTimestamp: "Just now",
              unread: true,
              messages: [...t.messages, responseMsg],
            }
          }
          return t
        })

        setChatThreads(finalThreads)
        await chatService.saveChatThreads(finalThreads)
      }, 1800)
    } catch (err) {
      console.error("Failed to submit quote request", err)
    }
  }

  const handlePostSubmit = async (newJob: { title: string; category: string; budget: string; description: string; location: string }) => {
    try {
      const addedJob = await jobsService.addJobListing(newJob)
      setPostedJobs(prev => [addedJob, ...prev])
    } catch (err) {
      console.error("Failed to post job listing", err)
    }
  }

  const handleDeleteJob = async (jobId: string) => {
    try {
      await jobsService.deleteJobListing(jobId)
      setPostedJobs(prev => prev.filter(j => j.id !== jobId))
    } catch (err) {
      console.error("Failed to delete job listing", err)
    }
  }

  const handleSelectThread = async (tid: string | null) => {
    setActiveThreadId(tid)
    if (tid) {
      const updatedThreads = chatThreads.map(t => t.id === tid ? { ...t, unread: false } : t)
      setChatThreads(updatedThreads)
      await chatService.saveChatThreads(updatedThreads)
    }
  }

  const handleSendMessage = async (tid: string, text: string) => {
    try {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: "user",
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      const updatedThreads = chatThreads.map(t => {
        if (t.id === tid) {
          return {
            ...t,
            lastMessage: text,
            lastTimestamp: "Just now",
            unread: false,
            messages: [...t.messages, newMsg],
          }
        }
        return t
      })

      setChatThreads(updatedThreads)
      await chatService.saveChatThreads(updatedThreads)

      setTimeout(async () => {
        const supplierText = `Thanks for confirming the details. Our dispatch team is checking schedule windows and we will coordinate via email or this chat by tomorrow morning.`
        const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "supplier",
          text: supplierText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        const currentThreads = await chatService.getChatThreads()
        const finalThreads = currentThreads.map(t => {
          if (t.id === tid) {
            return {
              ...t,
              lastMessage: "Thanks for confirming...",
              lastTimestamp: "Just now",
              unread: true,
              messages: [...t.messages, replyMsg],
            }
          }
          return t
        })

        setChatThreads(finalThreads)
        await chatService.saveChatThreads(finalThreads)
      }, 1600)
    } catch (err) {
      console.error("Failed to send message", err)
    }
  }

  return (
    <AppContext.Provider value={{
      currentLocation,
      setCurrentLocation,
      isDarkMode,
      setIsDarkMode,
      chatThreads,
      setChatThreads,
      activeThreadId,
      setActiveThreadId,
      postedJobs,
      quotesCount,
      selectedCategory,
      setSelectedCategory,
      selectedSupplier,
      setSelectedSupplier,
      showLocModal,
      setShowLocModal,
      showSettingsModal,
      setShowSettingsModal,
      quickAccessType,
      setQuickAccessType,
      showBannerModal,
      setShowBannerModal,
      handleRequestQuoteSubmit,
      handlePostSubmit,
      handleDeleteJob,
      handleSelectThread,
      handleSendMessage,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context;
}

