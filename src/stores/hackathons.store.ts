import { defineStore } from "pinia";
import { ref } from "vue";
// fetched the getHackthons api from jobs.api
import { getHackathons } from "@/api/jobs.api";
import type { IJobDetails } from "@/interface/jobs.interface";

export const useHackathonStore = defineStore("hackathonStore", () => {
    const hackathons = ref<IJobDetails[]>([]);
    const isLoadingHackathons = ref(false);

    // action to fetch the hackathons
    async function fetchHackathons() {
        try {
            isLoadingHackathons.value = true;
            const res = await getHackathons();
            hackathons.value = res.jobs;

        } catch (err) {
            console.error("Error fetching hackathons:", err);
        } finally {
            isLoadingHackathons.value = false;
        }
    }
    
    return { hackathons, isLoadingHackathons, fetchHackathons };
});
