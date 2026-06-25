import React, { useState } from 'react';
import { Calendar, DollarSign, Upload, User, Phone, Mail, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

interface QuoteWizardProps {
  supplierName: string;
  onClose: () => void;
  onSubmitSuccess: (quoteDetails: {
    projectTitle: string;
    budget: string;
    description: string;
  }) => void;
}

export function QuoteWizard({ supplierName, onClose, onSubmitSuccess }: QuoteWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectTitle: '',
    description: '',
    location: '',
    startDate: 'ASAP',
    budget: '$5,000 - $10,000',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [files, setFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files).map(f => f.name);
      setFiles(prev => [...prev, ...fileList]);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto-advance or call callback after delay
      setTimeout(() => {
        onSubmitSuccess({
          projectTitle: formData.projectTitle || 'General Sourcing Request',
          budget: formData.budget,
          description: formData.description || 'No description provided.',
        });
      }, 1500);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-muted flex items-center justify-between bg-card">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--brand-gold)]">Request Quote</span>
          <h3 className="font-semibold text-foreground text-sm line-clamp-1">{supplierName}</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded bg-muted/50 active-scale"
        >
          Cancel
        </button>
      </div>

      {/* Progress Indicator */}
      {!isSuccess && (
        <div className="px-6 py-3 bg-muted/20 border-b border-muted/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 w-full">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    step === num 
                      ? 'bg-[var(--brand-gold)] text-white scale-110 shadow-sm' 
                      : step > num 
                        ? 'bg-[var(--brand-gold)]/20 text-[var(--brand-gold)]' 
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div 
                    className={`flex-1 h-0.5 rounded transition-all duration-500 ${
                      step > num ? 'bg-[var(--brand-gold)]' : 'bg-muted'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-[fadeIn_0.4s_ease-out]">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mb-4 text-emerald-500 animate-[scaleIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-foreground mb-1">Quote Request Sent!</h4>
            <p className="text-xs text-muted-foreground max-w-[240px] mb-6">
              Your RFP has been dispatched. {supplierName} will respond in the Messages tab shortly.
            </p>
            <div className="w-full bg-muted/30 border border-muted/50 rounded-lg p-3 text-left text-xs mb-4">
              <p className="font-semibold text-foreground mb-1">{formData.projectTitle || 'Untitled Project'}</p>
              <p className="text-muted-foreground line-clamp-2 mb-2">{formData.description || 'No description'}</p>
              <div className="flex justify-between text-[11px] text-muted-foreground pt-2 border-t border-muted/50">
                <span>Budget: {formData.budget}</span>
                <span>Timeline: {formData.startDate}</span>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* STEP 1: Project Details */}
            {step === 1 && (
              <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Step 1: Project Details</h4>
                  <p className="text-xs text-muted-foreground mb-3">Tell us what you need for this job.</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Project Title *</label>
                    <input 
                      type="text"
                      name="projectTitle"
                      required
                      value={formData.projectTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. Foundation Pour for Warehouse"
                      className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Scope & Requirements *</label>
                    <textarea 
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Detail concrete strength, yardage, access conditions, or specific legal/testing terms needed..."
                      className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Site Location *</label>
                    <input 
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Chicago, IL or ZIP code"
                      className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Budget & Timeline */}
            {step === 2 && (
              <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Step 2: Timeline & Budget</h4>
                  <p className="text-xs text-muted-foreground mb-3">Provide pricing range and schedule alignment.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Expected Start Date
                    </label>
                    <select
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)]"
                    >
                      <option value="ASAP">ASAP (Within 1 week)</option>
                      <option value="1-2 Weeks">Within 1-2 weeks</option>
                      <option value="3-4 Weeks">Within a month</option>
                      <option value="Flexible">Flexible / Sourcing stage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Estimated Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)]"
                    >
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="Over $50,000">Over $50,000</option>
                    </select>
                  </div>

                  {/* Simulated File Upload */}
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-foreground mb-1">Attachments (Blueprints, RFQ PDFs)</label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center cursor-pointer hover:border-[var(--brand-gold)]/50 transition bg-card relative">
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleFileUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1.5" />
                      <p className="text-[11px] text-foreground font-medium">Click to select files or drag & drop</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">PDF, DWG, PNG up to 25MB</p>
                    </div>

                    {files.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {files.map((filename, i) => (
                          <div key={i} className="flex items-center justify-between bg-muted/30 px-2 py-1 rounded text-[10px] text-foreground">
                            <span className="truncate max-w-[180px]">{filename}</span>
                            <span className="text-[9px] text-emerald-500 font-medium">Uploaded</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Contact & Submit */}
            {step === 3 && (
              <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Step 3: Contact Information</h4>
                  <p className="text-xs text-muted-foreground mb-3">Provide coordinates for the estimator to contact you.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Your Full Name *
                    </label>
                    <input 
                      type="text"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Email Address *
                    </label>
                    <input 
                      type="email"
                      name="contactEmail"
                      required
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. john@yourcompany.com"
                      className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[var(--brand-gold)]" /> Phone Number *
                    </label>
                    <input 
                      type="tel"
                      name="contactPhone"
                      required
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. (555) 019-2834"
                      className="w-full px-3 py-2 text-xs border border-muted rounded bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--brand-gold)] focus:border-[var(--brand-gold)]"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      {/* Navigation Buttons */}
      {!isSuccess && (
        <div className="p-4 border-t border-muted bg-card flex justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={step === 1 || isSubmitting}
            className="text-xs h-9 px-3 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>

          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="text-xs h-9 px-4 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white font-medium flex items-center gap-1 ml-auto active-scale"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.contactName || !formData.contactEmail || !formData.contactPhone}
              className="text-xs h-9 px-5 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-white font-semibold flex items-center gap-1.5 ml-auto active-scale"
            >
              {isSubmitting ? 'Sending...' : 'Submit Request'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
