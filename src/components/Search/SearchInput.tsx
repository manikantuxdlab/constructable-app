import { Search, X } from "lucide-react"

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search materials, tools, services..."
        className="w-full pl-9 pr-9 py-2.5 text-xs bg-card border border-border rounded-none text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)] placeholder:text-muted-foreground/60 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-3 p-0.5 text-muted-foreground hover:text-foreground transition active-scale"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
