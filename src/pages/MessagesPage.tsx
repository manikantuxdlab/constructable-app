import { useChat } from '../hooks/useChat';
import { ChatThreadItem } from '../components/Messages/ChatThreadItem';
import { ChatWindow } from '../components/Messages/ChatWindow';
import { ChatInput } from '../components/Messages/ChatInput';

export function MessagesPage() {
  const { chatThreads, activeThreadId, activeThread, selectThread, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {activeThread ? (
        // Active Thread Chat View
        <div className="flex flex-col h-full bg-background animate-[slideIn_0.25s_cubic-bezier(0.16,1,0.3,1)]">
          <ChatWindow thread={activeThread} onBack={() => selectThread(null)} />
          <ChatInput onSend={(text) => sendMessage(activeThreadId!, text)} />
        </div>
      ) : (
        // Master Thread List View
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          <div className="space-y-1 pb-1">
            <h1 className="text-xl font-bold text-foreground tracking-tight">Messages</h1>
            <p className="text-xs text-muted-foreground leading-normal">
              Manage your active bids, negotiations, and supplier chats.
            </p>
          </div>
          {chatThreads.length === 0 ? (
            <div className="text-center py-12 px-4">
              <span className="text-muted-foreground text-xs">No active conversations.</span>
              <p className="text-[10px] text-muted-foreground mt-1 max-w-[180px] mx-auto">
                Click 'Request Sourcing Quote' on a supplier's profile to open a negotiation channel.
              </p>
            </div>
          ) : (
            chatThreads.map((thread) => (
              <ChatThreadItem
                key={thread.id}
                thread={thread}
                onClick={() => selectThread(thread.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

