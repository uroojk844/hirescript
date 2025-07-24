type TJobType = "Full Time" | "Part time" | "Contract" | "Internship";

type TSalaryType = "Annual" | "Monthly";

export interface IJob {
  id: number;
  title: string;
  company: string;
  logo: string;
  description: string;
  location: string;
  type: TJobType;
  salary: number;
  salaryType: TSalaryType;
  color?: string;
}

export interface IJobDetails extends IJob {
  postedBy?: string;
  skills: string[];
  about?:string,
  website?: string
}
