import { useEffect, useRef } from "react"
import { ArrowLeft, MoreVertical, Phone, Video, ShieldCheck, CheckCheck } from "lucide-react"
import type { ChatThread } from "../../types"

interface ChatWindowProps {
  thread: ChatThread;
  onBack: () => void;
}

export function ChatWindow({ thread, onBack }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread.messages]);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Active Chat Header */}
      <header className="px-3 py-2 border-b border-muted bg-card flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground active-scale"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className={`w-8 h-8 rounded-lg ${thread.supplierAvatarBg} text-white font-bold text-xs flex items-center justify-center`}>
            {thread.supplierAvatarText}
          </div>

          <div className="min-w-0">
            <h3 className="text-xs font-bold text-foreground truncate flex items-center gap-1">
              {thread.supplierName}
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/10 shrink-0" />
            </h3>
            <span className="text-[9px] text-emerald-500 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online Estimator
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <button className="p-1.5 rounded hover:bg-muted active-scale" title="Phone">
            <Phone className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted active-scale" title="Video">
            <Video className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted active-scale" title="More Options">
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Messages Bubble Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-background">
        <div className="text-center my-2">
          <span className="text-[9px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
            Secure Bid Correspondence Encrypted
          </span>
        </div>

        {thread.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[80%] ${
              msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
            } animate-[fadeIn_0.2s_ease-out]`}
          >
            <div
              className={`p-2.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[var(--brand-gold)] text-white rounded-tr-none"
                  : "bg-card border border-border text-foreground rounded-tl-none shadow-sm"
              }`}
            >
              {msg.text}
            </div>
            
            <div className="flex items-center gap-1.5 mt-1 text-[9px] text-muted-foreground px-1">
              <span>{msg.timestamp}</span>
              {msg.sender === "user" && (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
