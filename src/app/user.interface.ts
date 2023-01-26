export enum Role{
  Student="Student",
  Mentor="Mentor"
}
export enum Gender{
  Male="Male",
  Female="Female",
  Other="Other"
}
export interface Ilogin{
  email:string,
  Password:string
}

export interface Mregister{
  Firstname: string,
  Lastname: string,
  email: string,
  Password: string,
  Role: Role,
  Gender: Gender,
  Age: number,
  Discipline: string[],
  Bio: string,
  University: string,
  Company: string,
  Job: string,
  LevelOfEducation: string,
}

export interface Sregister{
  Firstname: string,
  Lastname: string,
  email: string,
  Password: string,
  Role: Role,
  Gender: Gender,
  Age: number,
  Bio: string,
  University: string,
  Major: string,
  YearInSchool: string,
}

export interface User{
  _id: string,
  Firstname:string,
  Lastname: string,
  email: string,
  Password: string,
  Role: Role,
  Mentors?: any[],
  Mentees?:any[],
  Discipline?: any[],
  Active: boolean,
  Address?: string,
  Age: number,
  Bio: string,
  Gender: Gender,
  Image: string,
  Major?: string,
  University: string,
  YearInSchool?: string,
  Company?: string,
  Job?: string,
  LevelOfEducation?: string,
}

export interface IauthUser{
  accessToken:string,
  user:User
}

export interface loginResponse{
  error:boolean,
  message: string|null,
  data:IauthUser|null
}
