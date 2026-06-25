import type { ChatThread } from "../../types"

interface ChatThreadItemProps {
  thread: ChatThread;
  onClick: () => void;
}

export function ChatThreadItem({ thread, onClick }: ChatThreadItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center p-3 bg-card border border-border rounded-xl text-left hover:border-[var(--brand-gold)]/30 transition active-scale relative group"
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-lg ${thread.supplierAvatarBg} text-white font-bold text-xs flex items-center justify-center mr-3 shrink-0`}>
        {thread.supplierAvatarText}
      </div>

      {/* Body Content */}
      <div className="flex-1 min-w-0 pr-6">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-foreground truncate group-hover:text-[var(--brand-gold)] transition-colors">
            {thread.supplierName}
          </h4>
          <span className="text-[9px] text-muted-foreground shrink-0">{thread.lastTimestamp}</span>
        </div>
        <p className={`text-[10px] truncate mt-1 ${thread.unread ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
          {thread.lastMessage}
        </p>
      </div>

      {/* Unread indicator */}
      {thread.unread && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500" />
      )}
    </button>
  );
}

export default ChatThreadItem;
