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
