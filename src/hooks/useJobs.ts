import { useApp } from "../context/AppContext"

/**
 * Custom hook to manage active job tenders and RFQs.
 */
export function useJobs() {
  const { postedJobs, handlePostSubmit, handleDeleteJob } = useApp();

  return {
    jobs: postedJobs,
    postJob: handlePostSubmit,
    deleteJob: handleDeleteJob,
  };
}

export default useJobs;
