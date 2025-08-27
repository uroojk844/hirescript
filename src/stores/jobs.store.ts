import { getJobs, getJobByID, jobsForHome } from "@/api/jobs.api";
import { defineStore } from "pinia";
import type { IJobsStore } from "./jobs.interface";

export const useJobStore = defineStore("jobs", {
  state: (): IJobsStore & { lastDoc: any; hasMore: boolean ;homeJobs: IJobsStore['jobs']; isLoadingHomeJobs: boolean} => ({
    isLoadingJobs: false,
    isLoadingHomeJobs: false,
    jobs: [],
    homeJobs: [],
    isLoadingJobDetails: false,
    jobDetails: null,
    lastDoc: null,
    hasMore: true,
  }),
  getters: {
    gethomejobs: (state) => state.homeJobs,
    getIsHomeJobsLoading: (state) => state.isLoadingHomeJobs,
    getIsLoadingJobs: (state) => state.isLoadingJobs,
    getJobs: (state) => state.jobs,
    getIsLoadingJobDetails: (state) => state.isLoadingJobDetails,
    getJobDetails: (state) => state.jobDetails,
    getHasMore: (state) => state.hasMore,
  },
  actions: {
    
    async fetchJobs(pageSize = 15) {
      if (this.isLoadingJobs || !this.hasMore) return;
      try {
        this.isLoadingJobs = true;
        const { jobs, lastDoc } = await getJobs(pageSize, this.lastDoc);
        if (jobs.length < pageSize) {
          this.hasMore = false; 
        }
        this.jobs.push(...jobs);
        this.lastDoc = lastDoc;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoadingJobs = false;
      }
    },


    async fetchJobById(id: string) {
      try {
        this.isLoadingJobDetails = true;
        const res = await getJobByID(id);
        this.jobDetails = {
          ...res,
          skills: res.skills
            .replace(/\s+/, " ")
            .split(",")
            .map((s: string) => s.trim().toLowerCase()),
        };
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingJobDetails = false;
      }
    },

    async fetchForHome(limitCount = 15) {
  
  this.isLoadingHomeJobs = true;
  try {
    const jobs = await jobsForHome(limitCount);
     
    this.homeJobs = jobs;
    this.hasMore = jobs.length >= limitCount;
    this.lastDoc = null; 
  } catch (err: any) {
    console.error("Error fetching jobs for home:", err);
  } finally {
    this.isLoadingHomeJobs = false;
  }
}

    
  },
});
