import { MapPin } from "lucide-react"
import { Card } from "../ui/card"

export interface SearchListingItem {
  id: string;
  name: string;
  price: string;
  location: string;
  timeLeft: string;
  image: string;
  buttonStyle: "primary" | "secondary";
  buttonText: string;
}

interface ListingCardProps {
  item: SearchListingItem;
  onClickCTA: () => void;
}

export function ListingCard({ item, onClickCTA }: ListingCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col transition hover:border-[var(--brand-gold)]/30">
      {/* Item Image with absolute Tag */}
      <div className="relative h-36 bg-slate-100 dark:bg-slate-900 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
        <span className="absolute top-2.5 right-2.5 text-[8px] font-bold text-muted-foreground/90 py-0.5 px-2 bg-white/90 dark:bg-black/90 backdrop-blur-xs shadow-xs rounded-none uppercase tracking-wide">
          {item.timeLeft}
        </span>
      </div>

      {/* Body Info */}
      <div className="p-3.5 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xs font-extrabold text-foreground tracking-tight leading-tight flex-1">
            {item.name}
          </h3>
          <span className="text-xs font-bold text-[var(--brand-gold)] shrink-0 leading-tight">
            {item.price}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground select-none">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span>{item.location}</span>
        </div>

        {/* CTA Button */}
        <button
          onClick={onClickCTA}
          className={`w-full py-2.5 text-[9px] font-bold uppercase tracking-widest transition active-scale rounded-none border ${
            item.buttonStyle === "primary"
              ? "bg-[var(--brand-gold)] border-[var(--brand-gold)] text-white hover:bg-[var(--brand-gold-hover)]"
              : "bg-listing-secondary border-listing-secondary text-white hover:bg-listing-secondary-hover"
          }`}
        >
          {item.buttonText}
        </button>
      </div>
    </Card>
  );
}

export default ListingCard;
