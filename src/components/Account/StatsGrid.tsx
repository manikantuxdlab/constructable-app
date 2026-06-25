import { Card } from "../ui/card"

interface StatsGridProps {
  postedJobsCount: number;
  quotesCount: number;
  savedBidsCount?: number;
}

export function StatsGrid({ postedJobsCount, quotesCount, savedBidsCount = 3 }: StatsGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="p-3 text-center shadow-xs">
        <span className="text-lg font-black text-[var(--brand-gold)]">{postedJobsCount}</span>
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
          Tenders Live
        </p>
      </Card>
      
      <Card className="p-3 text-center shadow-xs">
        <span className="text-lg font-black text-[var(--brand-gold)]">{quotesCount}</span>
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
          RFQs Sent
        </p>
      </Card>
      
      <Card className="p-3 text-center shadow-xs">
        <span className="text-lg font-black text-[var(--brand-gold)]">{savedBidsCount}</span>
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
          Saved Bids
        </p>
      </Card>
    </div>
  );
}

export default StatsGrid;
