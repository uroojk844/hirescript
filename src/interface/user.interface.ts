export interface IUser {
  name: string;
  profilePhotoUrl: string;
  email: string;
  password: string;
  designation: string;
  coverPhotoUrl: string;
  bio: string;
  skills: string[];
  education: {
    college: string;
    city: string;
    state: string;
    mail: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  socialLinks: {
    facebook: string;
    dribble: string;
    twitter: string;
    whatsapp: string;
    linkedin: string;
  };
  jobs: {
    savedJobs: string[];
    appliedJobs: string[];
  };
  portfolioLinks: {
    behance: string;
    dribble: string;
    canva: string;
    github: string;
  };
  experience: any[];
  portfolio: any[];
  uid: string;
}
