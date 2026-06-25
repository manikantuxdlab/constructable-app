import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

interface SuccessViewProps {
  title: string;
  description: string;
  budget: string;
  location: string;
  onNavigateToDashboard: () => void;
  onPostAnother: () => void;
}

export function SuccessView({
  title,
  description,
  budget,
  location,
  onNavigateToDashboard,
  onPostAnother,
}: SuccessViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-card border border-border rounded-2xl shadow-sm animate-[scaleIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
      <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-foreground mb-1">Tender Posted Successfully!</h3>
      <p className="text-xs text-muted-foreground max-w-[220px] mb-6">
        Your sourcing request is now live in the project index and has been sent to active suppliers.
      </p>

      <div className="w-full max-w-xs bg-background border border-border rounded-xl p-3.5 text-left mb-6 space-y-1.5">
        <span className="text-[9px] font-bold text-[var(--brand-gold)] uppercase bg-brand-gold-light px-2 py-0.5 rounded">
          Live Tender
        </span>
        <h4 className="text-xs font-bold text-foreground leading-tight pt-1">{title}</h4>
        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="flex justify-between items-center text-[9px] text-muted-foreground pt-2 border-t border-border">
          <span>Budget: {budget}</span>
          <span>Loc: {location}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        <Button
          onClick={onNavigateToDashboard}
          className="w-full text-xs h-9 font-semibold bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white flex items-center justify-center gap-1.5 active-scale"
        >
          Go to Account Dashboard <ArrowRight className="w-3.5 h-3.5" />
        </Button>
        
        <button
          onClick={onPostAnother}
          className="w-full text-xs py-2 text-muted-foreground hover:text-foreground font-medium transition"
        >
          Post Another Listing
        </button>
      </div>
    </div>
  );
}

export default SuccessView;
