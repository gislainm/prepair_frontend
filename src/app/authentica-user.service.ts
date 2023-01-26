import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin,Mregister,Sregister,IauthUser,Role,Gender,User } from './user.interface';
import { BehaviorSubject } from 'rxjs';

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
  public MentorToMessage!:(User|null);
  constructor(private http:HttpClient) { }
  loginUser(user:Ilogin){
    return this.http.post('http://localhost:8080/prepair/login',user);
  }
  registerStudent(user:Sregister){
    return this.http.post('http://localhost:8080/prepair/signup',user);

  }
  registerMentor(user:Mregister){
    return this.http.post('http://localhost:8080/prepair/signup',user);
  }
  updateUserInfo(user:any){
    return this.http.put('http://localhost:8080/prepair/updateUserInfo',user);
  }
  updateUserPwd(user:any){
    return this.http.put('http://localhost:8080/prepair/updateUserPwd',user);
  }
  getMentors(disc:string){
    return this.http.get(`http://localhost:8080/prepair/getMentors/${disc}`);
  }
  getChatRooms(user_id:string){
    return this.http.get(`http://localhost:8080/prepair/getRooms/${user_id}`);
  }
  sendMessage(message:{ receiver: string,sender: string,messageBody: string}){
    return this.http.post('http://localhost:8080/prepair/sendMessage',message);
  }
}
