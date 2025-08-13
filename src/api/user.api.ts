import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { fireDB, auth } from "@/firebase/config";
import type { IUser } from "@/interface/user.interface";
import { useUserStore } from "@/stores/user.store";
export async function saveUser(userData: IUser) {
  try {
    const usersRef = collection(fireDB, "users");
    const q = query(usersRef, where("email", "==", userData.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.warn("Duplicate email found in Firestore:", userData.email);
      return { success: false, message: "Email already registered." };
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const firebaseUser = userCredential.user;

    // Update UID (password will not be stored in Firestore)
    const finalUser: IUser = {
      ...userData,
      uid: firebaseUser.uid,
      password: "", // never store the password in Firestore
    };

    const docRef = await addDoc(usersRef, finalUser);
    console.log("User saved with ID:", docRef.id);

    return {
      success: true,
      message: "User registered successfully.",
      user: finalUser,
    };
  } catch (error: any) {
    console.error("Error saving user:", error);
    let msg = "Error saving user.";
    if (error.code === "auth/email-already-in-use") {
      msg = "Email already registered in Auth.";
    }
    if (error.code === "auth/weak-password") {
      msg = "Password should contain at least 6 characters";
    }
    return { success: false, message: msg };
  }
}

export async function getUserData() {
  const userStore = useUserStore();
  const { setUser } = userStore;
  const user = auth.currentUser?.email;
  const usersRef = collection(fireDB, "users");
  const q = query(usersRef, where("email", "==", user));
  const querySnapshot = await getDocs(q);
  const userData = querySnapshot.docs[0].data() as IUser;
  setUser(userData);
}

export async function loginUser({
  email,
  password,
}: Pick<IUser, "email" | "password">) {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    const usersRef = collection(fireDB, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "User not found in Firestore." };
    }

    const userData = querySnapshot.docs[0].data() as IUser;
    return {
      success: true,
      message: "Login successful.",
      user: userData,
    };
  } catch (error: any) {
    let msg = "Login failed.";
    if (error.code === "auth/user-not-found") msg = "User not found.";
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password"
    ) {
      msg = "Incorrect Email or Password.";
    }
    return { success: false, message: msg };
  }
}
export async function updateBasicDetails(
  uid: string,
  updatedData: Partial<IUser>
) {
  try {
    const userDocRef = doc(fireDB, "users", uid);

    // Check if user exists
    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists()) {
      return { success: false, message: "User not found in Firestore." };
    }

    // Never allow password overwrite here
    const { password, ...safeData } = updatedData;

    await updateDoc(userDocRef, safeData);
    console.log("User updated successfully");

    return { success: true, message: "User updated successfully." };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Error updating user." };
  }
}

export async function persistExperience(
  uid: string,
  updatedData: Partial<IUser>
) {
  try {
    const userRef = doc(fireDB, "users", uid);
    await updateDoc(userRef, {
      experience: updatedData.experience,
    });

    console.log("Experience updated successfully for:", uid);
  } catch (error) {
    console.error("Error updating experience:", error);
  }
}
export async function fetchExperiences(uid: string) {
  try {
    const userRef = doc(fireDB, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      return { success: false, message: "User not found." };
    }

    const data = snap.data();
    if (Array.isArray(data.experience)) {
      return { success: true, experiences: data.experience };
    } else {
      return { success: true, experiences: [] };
    }
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return { success: false, message: "Error fetching experiences." };
  }
}
export async function updateLinkedAccounts(
  uid: string,
  links: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
    github?: string;
    whatsapp?: string;
  }
) {
  try {
    const userDocRef = doc(fireDB, "users", uid);

    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists()) {
      return { success: false, message: "User not found in Firestore." };
    }

    await updateDoc(userDocRef, {
      "socialLinks.facebook": links.facebook || "",
      "socialLinks.linkedin": links.linkedin || "",
      "socialLinks.twitter": links.twitter || "",
      "socialLinks.dribbble": links.dribbble || "",
      "socialLinks.whatsapp": links.whatsapp || "",
    });

    console.log("Linked accounts updated successfully");
    return { success: true, message: "Linked accounts updated successfully." };
  } catch (error) {
    console.error("Error updating linked accounts:", error);
    return { success: false, message: "Error updating linked accounts." };
  }
}
export async function updatePortfolioLinks(
  uid: string,
  links: {
    behance?: string;
    canva?: string;
    github?: string;
    dribble?: string;
  }
) {
  try {
    const userDocRef = doc(fireDB, "users", uid);

    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists()) {
      return { success: false, message: "User not found in Firestore." };
    }

    await updateDoc(userDocRef, {
      "portfolioLinks.behance": links.behance || "",
      "portfolioLinks.canva": links.canva || "",
      "portfolioLinks.github": links.github || "",
      "portfolioLinks.dribbble": links.dribble || "",
    });

    console.log("Portfolio links updated successfully");
    return { success: true, message: "Portfolio links updated successfully." };
  } catch (error) {
    console.error("Error updating portfolio links:", error);
    return { success: false, message: "Error updating portfolio links." };
  }
}
