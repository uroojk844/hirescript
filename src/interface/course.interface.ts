export interface ICourse {
    id: string,
    poster: string,
    title: string,
    outline: string[],
    price: number,
    rating: number,
    platform: string,
}

export interface ICourseDetails extends ICourse {
    language: string,
    duration: string,
}