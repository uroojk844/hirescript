import { defineStore } from "pinia";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore";
import { fireDB } from "@/firebase/config";
import type { ICourse, ICourseDetails } from "@/interface/course.interface";

export const useCourseStore = defineStore("course", {
  state: () => ({
    courses: [] as ICourse[],
    loading: false
  }),

  actions: {
    async fetchCourses() {
      this.loading = true;
      try {
        const q = query(collection(fireDB, "courses"));
        const snapshot = await getDocs(q);
        const data: ICourse[] = [];
        snapshot.forEach((docSnap) => {
          data.push({ id: docSnap.id, ...(docSnap.data() as Omit<ICourse, "id">) });
        });
        this.courses = data;
      } catch (e) {
        console.error("Error:", e);
      } finally {
        this.loading = false;
      }
    },

    async fetchCourseById(id: string): Promise<ICourseDetails | null> {
      try {
        const docRef = doc(fireDB, "courses", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { id: docSnap.id, ...(docSnap.data() as Omit<ICourseDetails, "id">) };
        }
        return null;
      } catch (err) {
        console.error("Error fetching Course:", err);
        throw err;
      }
    }
  }
});
