export interface IUser {
  name: string;
  email: string;
  photoUrl: string;
  bio: string;
  phone: string;
  designation: string;
  skills: string;
  college: {
    collegeName: string;
    collegeEmail: string;
  };
  saved: string[];     // Array of saved job IDs
  visited: string[];   // Array of visited job IDs
  applied: string[];   // Array of applied job IDs
  uid: string;         // Firebase Auth UID
}
