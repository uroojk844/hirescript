import type { IJob } from "@/interface/jobs.interface";

export const trendingJobs:IJob[] = [
  {
    id:1,
    title: "Senior UI Designer",
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
    description: "Design and improve user interfaces for our core products.",
    location: "New York, USA",
    type: "Full Time",
    salary: 3234324,
    salaryType: "Annual",
    color: "#e2f5cd",
  },
  {
    id:2,
    title: "Frontend Engineer",
    company: "Meta",
    logo: "https://cdn.pixabay.com/photo/2021/12/14/22/29/meta-6871457_1280.png",
    description:
      "Work on scalable frontend applications for billions of users.",
    location: "Menlo Park, USA",
    type: "Full Time",
    salary: 3423444,
    salaryType: "Annual",
    color: "#e9ecf8",
  },
  {
    id:3,
    title: "Backend Developer",
    company: "Flipkart",
    logo: "https://thumbs.dreamstime.com/b/flipcart-logo-219165303.jpg",
    description:
      "Build robust backend systems for e-commerce platform and enhance the user experience",
    location: "Bangalore, India",
    type: "Full Time",
    salary: 2343244,
    salaryType: "Annual",
    color: "#e4eefa",
  },
];
