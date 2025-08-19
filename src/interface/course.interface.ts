export interface ICourse {
  id: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  courseOutline: string;
}

export interface ICourseDetails extends ICourse {
  language: string;
  duration: string;
  description: string;
  overview: string;
  courseContent: string;
  link: string;
  registeredStudents: any[];
  reviews: any[];
}