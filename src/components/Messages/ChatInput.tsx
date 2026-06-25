import { useState } from "react"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSend: (text: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSend(inputText.trim());
    setInputText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-muted bg-card flex gap-2 shrink-0"
    >
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type details, ask about scheduling..."
        className="flex-1 px-3 py-2 text-xs bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)]"
      />
      <button
        type="submit"
        disabled={!inputText.trim()}
        className="w-9 h-9 rounded-xl bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition active-scale cursor-pointer"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}

export default ChatInput;
