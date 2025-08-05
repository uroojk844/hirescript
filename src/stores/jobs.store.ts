import { getJobs, getJobByID } from "@/api/jobs.api";
import { defineStore } from "pinia";
import type { IJobsStore } from "./jobs.interface";

export const useJobStore = defineStore("jobs", {
  state: (): IJobsStore => ({
    isLoadingJobs: false,
    jobs: [],

    isLoadingJobDetails: false,
    jobDetails: null,
  }),
  getters: {
    getIsLoadingJobs(state) {
      return state.isLoadingJobs;
    },
    getJobs(state) {
      return state.jobs;
    },
    getIsLoadingJobDetails(state) {
      return state.isLoadingJobDetails;
    },
    getJobDetails(state) {
      return state.jobDetails;
    },
  },
  actions: {
    async fetchJobs() {
      try {
        this.isLoadingJobs = true;
        this.jobs = await getJobs();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingJobs = false;
      }
    },
    async fetchJobById(id: string) {
      try {
        this.isLoadingJobDetails = true;
        this.jobDetails = await getJobByID(id);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingJobDetails = false;
      }
    },
  },
});
