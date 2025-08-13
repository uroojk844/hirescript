type TJobType = "Full Time" | "Part time" | "Contract" | "Internship";

type TSalaryType = "Annual" | "Monthly";

export interface IJob {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  description: string;
  experience: string;
  location: string;
  type: TJobType;
  salary: number;
  salaryType: TSalaryType;
  color?: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt: string;
  jobDescription: string; 
  jobRequirements: string;
  companyDescription: string;
  applyLink: string;
}

export interface IJobDetails extends IJob {
  postedBy?: string;
  skills: string[];
  about?: string;
  website?: string;
}
