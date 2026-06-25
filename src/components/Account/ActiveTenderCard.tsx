import { Trash2 } from "lucide-react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import type { JobListing } from "../../types"

interface ActiveTenderCardProps {
  job: JobListing;
  onDelete: (id: string) => void;
}

export function ActiveTenderCard({ job, onDelete }: ActiveTenderCardProps) {
  return (
    <Card className="p-3 flex items-start justify-between gap-3 shadow-xs animate-[fadeIn_0.2s_ease-out]">
      <div className="min-w-0 flex-1">
        <span className="text-[8px] font-bold text-[var(--brand-gold)] uppercase tracking-wider bg-[var(--brand-gold-light)] px-1.5 py-0.5 rounded">
          {job.category}
        </span>
        <h4 className="text-xs font-bold text-foreground truncate mt-1 leading-tight">
          {job.title}
        </h4>
        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
          {job.description}
        </p>
        <div className="flex gap-3 text-[9px] text-muted-foreground mt-2 font-medium">
          <span>Budget: {job.budget}</span>
          <span>Location: {job.location}</span>
        </div>
      </div>
      
      <Button
        onClick={() => onDelete(job.id)}
        variant="destructive"
        size="icon-xs"
        className="shrink-0"
        title="Delete Tender"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </Card>
  );
}

export default ActiveTenderCard;
