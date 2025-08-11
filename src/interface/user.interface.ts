export interface IUser {
  name: string;
  profilePhotoUrl: string;
  email: string;
  password: string;
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
    instagram: string;
    dribbble: string;
    mail: string;
    whatsapp: string;
  };
  portfolioLinks: {
    behance: string;
    dribbble: string;
    canva: string;
    github: string;
  };
  experience: any[];
  portfolio: any[];
  uid: string;
}
