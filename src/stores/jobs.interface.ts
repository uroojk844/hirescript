import type { IJobDetails } from "@/interface/jobs.interface";

export interface IJobsStore {
  isLoadingJobs: boolean;
  jobs: IJobDetails[];
  
  isLoadingJobDetails: boolean,
  jobDetails: IJobDetails | null,
}
