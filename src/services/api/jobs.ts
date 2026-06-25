import { SEED_JOBS } from "../../lib/mockData"
import type { JobListing } from "../../types"
import { apiClient } from "./client"

const POSTED_JOBS_KEY = "sitesupply_posted_jobs"

const getMockJobs = (): JobListing[] => {
  if (typeof window === "undefined") return [];
  const jobs = localStorage.getItem(POSTED_JOBS_KEY);
  if (!jobs) {
    localStorage.setItem(POSTED_JOBS_KEY, JSON.stringify(SEED_JOBS));
    return SEED_JOBS;
  }
  return JSON.parse(jobs);
};

export const jobsService = {
  /**
   * Retrieve active public tenders
   */
  getPostedJobs: async (): Promise<JobListing[]> => {
    return apiClient.get<JobListing[]>("/jobs", () => getMockJobs());
  },

  /**
   * Post a new job tender / RFQ
   */
  addJobListing: async (jobData: { 
    title: string; 
    category: string; 
    budget: string; 
    description: string; 
    location: string; 
  }): Promise<JobListing> => {
    return apiClient.post<JobListing>("/jobs", jobData, () => {
      const jobs = getMockJobs();
      const newJob: JobListing = {
        id: `job-${Date.now()}`,
        title: jobData.title,
        category: jobData.category,
        budget: jobData.budget,
        description: jobData.description,
        location: jobData.location,
        postedDate: "Just now",
        proposalsCount: 0,
      };
      localStorage.setItem(POSTED_JOBS_KEY, JSON.stringify([newJob, ...jobs]));
      return newJob;
    });
  },

  /**
   * Delete an active tender
   */
  deleteJobListing: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/jobs/${id}`, () => {
      const jobs = getMockJobs();
      const updatedJobs = jobs.filter((j) => j.id !== id);
      localStorage.setItem(POSTED_JOBS_KEY, JSON.stringify(updatedJobs));
    });
  }
};

export default jobsService;
