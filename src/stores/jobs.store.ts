import { getJobs, getJobByID, getJobsByCategory } from "@/api/jobs.api";
import { defineStore } from "pinia";
import type { IJobsStore } from "./jobs.interface";

export const useJobStore = defineStore("jobs", {
  state: (): IJobsStore & { lastDoc: any; hasMore: boolean } => ({
    isLoadingJobs: false,
    jobs: [],
    isLoadingJobDetails: false,
    jobDetails: null,
    lastDoc: null,
    hasMore: true,
  }),
  getters: {

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
            .map((s: string) => s.trim()),
        };
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingJobDetails = false;
      }

    },

    // fetching jobs basis of category
    async fetchJobsByCategory(category: string) {
      try {
        this.isLoadingJobs = true;
        this.jobs = []; // clear previous jobs before loading
        const res = await getJobsByCategory(category);
        this.jobs = res.jobs;
      } catch (error) {
        console.error("Error fetching jobs by category:", error);
      } finally {
        this.isLoadingJobs = false;
      }
    },
  },
});
