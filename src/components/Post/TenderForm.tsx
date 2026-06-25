import { useState } from "react"
import { ClipboardList, PlusCircle } from "lucide-react"
import { Button } from "../ui/button"
import { CATEGORIES_MAP } from "../../constants"

export interface TenderFormData {
  title: string;
  category: string;
  budget: string;
  description: string;
  location: string;
  email: string;
}

interface TenderFormProps {
  onSubmit: (data: TenderFormData) => void;
  isSubmitting: boolean;
}

export function TenderForm({ onSubmit, isSubmitting }: TenderFormProps) {
  const [formData, setFormData] = useState<TenderFormData>({
    title: "",
    category: "subcontractors_foundations",
    budget: "$5,000 - $10,000",
    description: "",
    location: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header prompt */}
      <div className="bg-card border border-border rounded-xl p-3.5 flex items-start gap-3">
        <ClipboardList className="w-5 h-5 text-[var(--brand-gold)] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-foreground">Sourcing Request details</h3>
          <p className="text-[10px] text-muted-foreground leading-normal">
            Describe what subcontractors, testing labs, or bonding you require. Local suppliers will
            review and offer quotes.
          </p>
        </div>
      </div>

      <div className="space-y-3 bg-card border border-border p-4 rounded-xl">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Tender Title *</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Geotechnical soil drill needed for strip mall"
            className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Service Branch *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)]"
          >
            {Object.entries(CATEGORIES_MAP).map(([key, cat]) => (
              <option key={key} value={key}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Estimated Budget Scope
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)]"
          >
            <option value="Under $5,000">Under $5,000</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
            <option value="$10,000 - $25,000">$10,000 - $25,000</option>
            <option value="$25,000 - $50,000">$25,000 - $50,000</option>
            <option value="Over $50,000">Over $50,000</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Job Location (City, State) *
          </label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Denver, CO"
            className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Scope description & Specifics *
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide concrete specs, access details, timing requirements, required licensing, etc..."
            className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Contact Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. tenders@mycompany.com"
            className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-xs h-10 font-bold bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white flex items-center justify-center gap-1.5 shadow-sm active-scale cursor-pointer"
      >
        <PlusCircle className="w-4 h-4" />{" "}
        {isSubmitting ? "Posting Live Tender..." : "Post Sourcing Request"}
      </Button>
    </form>
  );
}

export default TenderForm;
