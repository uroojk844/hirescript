import type { Timestamp } from "firebase/firestore";

type TJobType = "Full Time" | "Part time" | "Contract" | "Internship";

type TSalaryType = "Annual" | "Monthly";

interface IMinMax {
  min: number;
  max: number;
}

export type TMinMax = IMinMax | string;

/**
 * Job Card Schema
 */
export interface IJob {
  id: string;
  title: string;

  companyLogo: string;
  company: string;

  jobDescription: string;
  location: string;
  type: TJobType;
  salary: TMinMax;
  salaryType: TSalaryType;
}

/**
 * For job details
 * @type: "Full Time" | "Part time" | "Contract" | "Internship";
 * @website: company website url
 * @salaryType: Annual | Monthly 
 */
export interface IJobDetails extends IJob {
  skills: string[];
  jobRequirements: string;
  experience: TMinMax;
  applyLink: string;
  postedBy?: string;

  companyDescription: string;
  website?: string;

  createdAt: Timestamp;
}
