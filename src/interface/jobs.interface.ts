type TJobType = "Full Time" | "Part time" | "Contract" | "Internship" 

type TSalaryType = "Annual" | "Monthly"

export interface IJob {
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
