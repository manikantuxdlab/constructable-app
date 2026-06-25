import { useState } from 'react';
import { X, Star, Phone, Mail, MapPin, Briefcase, Users, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';
import type { Supplier } from '../lib/mockData';
import { QuoteWizard } from './QuoteWizard';

interface SupplierDetailProps {
  supplier: Supplier;
  onClose: () => void;
  onRequestQuoteSubmit: (projectTitle: string, budget: string, description: string) => void;
}

export function SupplierDetail({ supplier, onClose, onRequestQuoteSubmit }: SupplierDetailProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'projects' | 'team' | 'reviews'>('services');
  const [showQuoteWizard, setShowQuoteWizard] = useState(false);

  const handleQuoteSubmitSuccess = (quoteDetails: { projectTitle: string; budget: string; description: string }) => {
    onRequestQuoteSubmit(quoteDetails.projectTitle, quoteDetails.budget, quoteDetails.description);
    setShowQuoteWizard(false);
  };

  return (
    <div className="absolute inset-0 bg-background flex flex-col z-30 animate-[slideIn_0.3s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
      {showQuoteWizard ? (
        <QuoteWizard 
          supplierName={supplier.name} 
          onClose={() => setShowQuoteWizard(false)}
          onSubmitSuccess={handleQuoteSubmitSuccess}
        />
      ) : (
        <>
          {/* Header Cover Image */}
          <div className="relative h-44 bg-muted shrink-0">
            <img 
              src={supplier.projects[0]?.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'}
              alt={supplier.name}
              className="w-full h-full object-cover filter brightness-75"
            />
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition active-scale"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge Category */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-[10px] text-white uppercase font-bold tracking-wider px-2 py-0.5 rounded backdrop-blur-sm">
              {supplier.category.replace('_', ' ')}
            </div>
          </div>

          {/* Supplier Info Profile */}
          <div className="px-5 pt-4 pb-3 border-b border-muted bg-card relative shrink-0">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className={`w-14 h-14 rounded-xl ${supplier.avatarBg} text-white font-bold text-lg flex items-center justify-center shadow-md -mt-10 border-4 border-background shrink-0`}>
                {supplier.avatarText}
              </div>

              {/* Title & Ratings */}
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-foreground truncate flex items-center gap-1.5 leading-tight">
                  {supplier.name}
                  <ShieldCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/20 shrink-0" />
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-amber-500 font-semibold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 mr-0.5" />
                    {supplier.rating}
                  </div>
                  <span className="text-[11px] text-muted-foreground">({supplier.reviewsCount} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {supplier.tags.map((tag) => (
                <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              {supplier.description}
            </p>
          </div>

          {/* Contact Details Quick bar */}
          <div className="px-5 py-2.5 bg-muted/20 border-b border-muted/50 text-[11px] space-y-1.5 shrink-0 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" />
              <span className="truncate">{supplier.address}</span>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" />
                <span>{supplier.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[var(--brand-gold)] shrink-0" />
                <span className="truncate">{supplier.email}</span>
              </div>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-muted bg-card text-xs shrink-0 font-medium">
            {(['services', 'projects', 'team', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-center transition relative capitalize active:bg-muted/10 ${
                  activeTab === tab 
                    ? 'text-[var(--brand-gold)] font-semibold' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-gold)] animate-[stretchIn_0.2s_ease]" />
                )}
              </button>
            ))}
          </div>

          {/* Scrollable Tab Content */}
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            {activeTab === 'services' && (
              <div className="space-y-3 animate-[fadeIn_0.2s_ease-out]">
                <h4 className="text-xs font-bold text-foreground tracking-wider uppercase mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Services Offered
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {supplier.services.map((service, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-2.5 rounded-lg border border-muted hover:border-[var(--brand-gold)]/40 hover:bg-[var(--brand-gold-light)]/20 transition-all text-xs text-foreground group"
                    >
                      <span className="font-medium">{service}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[var(--brand-gold)] transition-transform group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                <h4 className="text-xs font-bold text-foreground tracking-wider uppercase mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Completed Projects
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {supplier.projects.map((proj, i) => (
                    <div key={i} className="rounded-lg overflow-hidden border border-muted bg-card shadow-sm hover:shadow transition group">
                      <div className="h-24 bg-muted relative overflow-hidden">
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white px-1.5 py-0.2 rounded">
                          {proj.year}
                        </span>
                      </div>
                      <div className="p-2 text-[10px]">
                        <p className="font-semibold text-foreground line-clamp-2 leading-tight">{proj.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                <h4 className="text-xs font-bold text-foreground tracking-wider uppercase mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Core Team & Estimators
                </h4>
                <div className="space-y-3">
                  {supplier.team.map((member, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg border border-muted bg-card">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-10 h-10 rounded-full object-cover border border-muted shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-foreground leading-tight">{member.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{member.role}</p>
                      </div>
                      <span className="text-[9px] text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold-light)] px-2 py-0.5 rounded font-medium">
                        Estimator
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
                <h4 className="text-xs font-bold text-foreground tracking-wider uppercase mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Verified Client Reviews
                </h4>
                <div className="space-y-3">
                  {supplier.reviews.map((rev, i) => (
                    <div key={i} className="p-3 rounded-lg border border-muted bg-card space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-semibold text-foreground">{rev.author}</span>
                        <span className="text-[9px] text-muted-foreground">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        "{rev.content}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Call to Action */}
          <div className="p-4 border-t border-muted bg-card flex gap-3 shrink-0">
            <button 
              onClick={() => setShowQuoteWizard(true)}
              className="flex-1 py-2.5 rounded-lg bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white text-xs font-bold transition shadow-sm active-scale text-center cursor-pointer"
            >
              Request Sourcing Quote
            </button>
          </div>
        </>
      )}
    </div>
  );
}
