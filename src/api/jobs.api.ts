import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { fireDB } from "@/firebase/config";
import type { IJobDetails } from "@/interface/jobs.interface";

const jobs = collection(fireDB, "jobs");

export async function getJobs() {
    const res = await getDocs(jobs);
    return res.docs.map((r) => r.data() as IJobDetails);
}

export async function getJobByID(id: string) {
    const res = await getDoc(doc(fireDB, "jobs", id));
    if(res.exists()) {
        return res.data() as IJobDetails;
    }else {
        return null;
    }
}