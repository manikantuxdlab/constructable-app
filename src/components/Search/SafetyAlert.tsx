import { AlertTriangle, X } from "lucide-react"

interface SafetyAlertProps {
  onDismiss: () => void;
}

export function SafetyAlert({ onDismiss }: SafetyAlertProps) {
  return (
    <div className="relative flex bg-quick-rental text-white border-l-4 border-[var(--brand-gold)] p-3.5 rounded-none animate-[fadeIn_0.2s_ease-out]">
      <div className="flex gap-2.5 items-start pr-5">
        <AlertTriangle className="w-4 h-4 text-[var(--brand-gold)] shrink-0 mt-0.5" />
        <div className="space-y-0.5 select-none">
          <h4 className="text-[9px] font-extrabold uppercase tracking-wider text-white">
            Safety First Alert
          </h4>
          <p className="text-[9px] text-slate-300 leading-normal">
            Verify licenses and inspect equipment on-site before completing any transaction. Use our secure escrow for high-value machinery.
          </p>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-0.5 text-slate-400 hover:text-white transition active-scale"
        title="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default SafetyAlert;
