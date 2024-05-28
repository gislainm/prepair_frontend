import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin,Mregister,Sregister,IauthUser,Role,Gender,User } from './user.interface';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const INIT_STATE={
  accessToken:'',
  user:{
  _id: '',
  Firstname:'',
  Lastname: '',
  email: '',
  Password: '',
  Role: Role.Student,
  Active: true,
  Age: 0,
  Bio: '',
  Gender: Gender.Other,
  Image: '',
  University: '',
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticaUserService {
  state:BehaviorSubject<IauthUser> = new BehaviorSubject(INIT_STATE);
  user_email:string='';
  accessToken:string = '';
  private baseURL = environment.apiURL
  public MentorToMessage!:(User|null);
  constructor(private http:HttpClient) { }
  loginUser(user:Ilogin){
    console.log(this.baseURL)
    return this.http.post(`${this.baseURL}prepair/login`, user);
  }
  registerStudent(user:Sregister){
    return this.http.post(`${this.baseURL}prepair/signup`, user);

  }
  registerMentor(user:Mregister){
    return this.http.post(`${this.baseURL}prepair/signup`, user);
  }
  updateUserInfo(user:any){
    return this.http.put(`${this.baseURL}prepair/updateUserInfo`, user);
  }
  updateUserPwd(user:any){
    return this.http.put(`${this.baseURL}prepair/updateUserPwd`, user);
  }
  getMentors(disc:string){
    return this.http.get(`${this.baseURL}prepair/getMentors/${disc}`);
  }
  getChatRooms(user_id:string){
    return this.http.get(`${this.baseURL}prepair/getRooms/${user_id}`);
  }
  sendMessage(message:{ receiver: string,sender: string,messageBody: string,senderName:string,receiverEmail:string}){
    return this.http.post(`${this.baseURL}prepair/sendMessage`, message);
  }
}
