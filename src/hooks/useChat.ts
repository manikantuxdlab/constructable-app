import { useApp } from "../context/AppContext"

/**
 * Custom hook to manage active chat threads, sending messages, and notifications.
 */
export function useChat() {
  const { 
    chatThreads, 
    activeThreadId, 
    handleSelectThread, 
    handleSendMessage 
  } = useApp();

  const activeThread = chatThreads.find((t) => t.id === activeThreadId);
  const unreadCount = chatThreads.filter((t) => t.unread).length;

  return {
    chatThreads,
    activeThreadId,
    activeThread,
    unreadCount,
    selectThread: handleSelectThread,
    sendMessage: handleSendMessage,
  };
}

export default useChat;
