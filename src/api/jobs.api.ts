import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { auth, fireDB } from "@/firebase/config";
import type { IJobDetails } from "@/interface/jobs.interface";
import { useUserStore } from "@/stores/user.store";

const jobs = collection(fireDB, "jobs");
/**
 * Paginated getJobs
 * @param pageSize - number of jobs to load per page
 * @param lastDoc - last fetched doc for pagination
 */
//Adnan -> bold -> <p><strong>Adnan</strong></p>
// adnan 
//<p>adnan</p>

export async function getJobs(pageSize = 15, lastDoc: any = null) {
  let q = query(jobs, orderBy("createdAt", "desc"), limit(pageSize));

  if (lastDoc) {
    q = query(
      jobs,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(pageSize)
    );
  }

  const res = await getDocs(q);
  const docs = res.docs.map((r) => {
    return { ...r.data(), id: r.id } as IJobDetails;
  });

  return {
    jobs: docs,
    lastDoc: res.docs.length ? res.docs[res.docs.length - 1] : null,
  };
}

export async function getJobByID(id: string) {
  const res = await getDoc(doc(fireDB, "jobs", id));
  return { ...res.data(), id } as any;
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
    const jobDescription = job.jobDescription?.toLowerCase() || "";
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

export const shareJob = async (job:IJobDetails) => {
  const shareData = {
    title: `${job.title} at ${job.company}`,
    text: `Check out this ${job.title} job at ${job.company}!`,
    url: `https://www.hirescript.tech/#/jobs/${job.id}`,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
    }
  } catch (err: any) {
    throw err;
  }
};

export async function applyJob(jobID: string) {
  const uid = auth.currentUser?.uid
  if (uid) {
    const userRef = doc(fireDB, "users", uid);
    await updateDoc(userRef, {
      'jobs.appliedJobs': arrayUnion(jobID),
    });
    useUserStore().updateAppliedJobs(jobID);
  } else {
    console.error("User ID is required!");
  }
}


export async function getHackathons() {
  const q = query(
    jobs,
    where("type", "==", "Hackathon"),
  );

  const res = await getDocs(q);
  const docs = res.docs.map((r) => {
    return { ...r.data(), id: r.id } as IJobDetails;
  });

  return {
    jobs: docs,
  };
}

export async function getInternship() {
  const q = query(
    jobs,
    where("type", "==", "Internship"),
  );

  const res = await getDocs(q);
  const docs = res.docs.map((r) => {
    return { ...r.data(), id: r.id } as IJobDetails;
  });

  return {
    jobs: docs,
  };
}

// fething jobs by category if category is present
export async function getJobsByCategory(category: string) {
  const q = query(
    jobs,
    where("type", "==", category)
  );

  const res = await getDocs(q);
  const docs = res.docs.map((r) => {
    return { ...r.data(), id: r.id } as IJobDetails;
  });

  return {
    jobs: docs,
  };
}




