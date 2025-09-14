import { defineStore } from "pinia";
import {ref} from "vue";
// fetched getInternship api from jobs.api
import { getInternship } from "@/api/jobs.api";
import type { IJobDetails } from "@/interface/jobs.interface";

export const useInternshipStore = defineStore("internshipStore", () => {
  const internships = ref<IJobDetails[]>([]);
  const isLoadingInternships = ref(false);

  // action to fetch internships
  async function fetchInternships() {
    try {
      isLoadingInternships.value = true;
      const res = await getInternship();
      internships.value = res.jobs;
    } catch (err) {
      console.error("Error fetching internships:", err);
    } finally {
      isLoadingInternships.value = false;
    }
  }

  return {
    internships,
    isLoadingInternships,
    fetchInternships,
  };
});
