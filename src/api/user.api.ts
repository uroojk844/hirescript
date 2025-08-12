import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { fireDB, auth } from "@/firebase/config";
import type { IUser } from "@/interface/user.interface";



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
    if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
      msg = "Incorrect Email or Password.";
    }
    return { success: false, message: msg };
  }
}

// export async function updateUserProfile(data, user) {
//   try {
//     const userRef = doc(fireDB, "users", user.uid);
//     const userSnap = await getDoc(userRef);

//     const updatePayload = {
//       name: data.fullname || "",
//       phoneNumber: data.phone || "",
//       skills: data.skills || "",
//       bio: data.bio || "",
//       designation: data.designation || "",
//     };

//     if (userSnap.exists()) {
//       await updateDoc(userRef, updatePayload);
//     } else {
//       // create the document first
//       await setDoc(userRef, updatePayload);
//     }

//     return {
//       success: true,
//       user: {
//         ...user,
//         ...updatePayload,
//       },
//     };
//   } catch (error:any) {
//     console.error("Error updating user profile:", error);
//     return {
//       success: false,
//       message: error.message,
//     };
//   
