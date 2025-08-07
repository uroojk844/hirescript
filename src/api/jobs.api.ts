import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { fireDB } from "@/firebase/config";
import type { IJobDetails } from "@/interface/jobs.interface";
import { useSortByTime } from "@/composables/use-sort-by-time";

const jobs = useSortByTime(collection(fireDB, "jobs"));

export async function getJobs() {
  const res = await getDocs(jobs);
  return res.docs.map((r) => {
    return { ...r.data(), id: r.id } as unknown as IJobDetails;
  });
}

export async function getJobByID(id: string) {
  const res = await getDoc(doc(fireDB, "jobs", id));
  return res.data() as IJobDetails;
}

export async function searchJobs(title: string, location?: string) {
  if (!title.trim()) {
    throw new Error("Search title is required");
  }

  const res = await getDocs(jobs);
  const allJobs = res.docs.map((r) => {
    return { ...r.data(), id: r.id } as unknown as IJobDetails;
  });

  const titleLower = title.toLowerCase().trim();
  const locationLower = location?.toLowerCase().trim();

  const searchTokens = titleLower.split(/\s+/).filter(Boolean);

  return allJobs.filter((job) => {
    const jobTitle = job.title?.toLowerCase() || "";
    const jobLocation = job.location?.toLowerCase() || "";
    const jobDescription = job.description?.toLowerCase() || "";
    const jobType = job.type?.toLowerCase() || "";

    const titleMatches = searchTokens.every(
      (token) =>
        jobTitle.includes(token) ||
        jobDescription.includes(token) ||
        jobType.includes(token)
    );

    const locationMatches = locationLower
      ? jobLocation.includes(locationLower)
      : true;

    return titleMatches && locationMatches;
  });
}
