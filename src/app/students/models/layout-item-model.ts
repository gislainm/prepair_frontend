import { Gender,Role } from "src/app/user.interface";
export interface LayoutItem {
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
  cols: number;
  rows: number;
}
