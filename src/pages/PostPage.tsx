import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { CATEGORIES_MAP } from '../constants';
import { TenderForm } from '../components/Post/TenderForm';
import type { TenderFormData } from '../components/Post/TenderForm';
import { SuccessView } from '../components/Post/SuccessView';


export function PostPage() {
  const navigate = useNavigate();
  const { postJob } = useJobs();
  
  const [formData, setFormData] = useState<TenderFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (data: TenderFormData) => {
    setIsSubmitting(true);
    setFormData(data);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const categoryLabel = CATEGORIES_MAP[data.category as keyof typeof CATEGORIES_MAP]?.title || 'SUBCONTRACTORS';
      
      postJob({
        title: data.title,
        category: categoryLabel,
        budget: data.budget,
        description: data.description,
        location: data.location,
      });
    }, 1200);
  };

  const resetForm = () => {
    setFormData(null);
    setIsSuccess(false);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        {!isSuccess && (
          <div className="space-y-1 pb-4">
            <h1 className="text-xl font-bold text-foreground tracking-tight">Post Job Tender / RFQ</h1>
            <p className="text-xs text-muted-foreground leading-normal">
              Fill in the specifications to publish a public sourcing request.
            </p>
          </div>
        )}

        {isSuccess && formData ? (
          <SuccessView
            title={formData.title}
            description={formData.description}
            budget={formData.budget}
            location={formData.location}
            onNavigateToDashboard={() => navigate('/account')}
            onPostAnother={resetForm}
          />
        ) : (
          <TenderForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        )}
      </div>
    </div>
  );
}

