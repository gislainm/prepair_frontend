import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticaUserService } from './authentica-user.service';
import { IauthUser,Role,Gender } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend';
  accessToken:string='';
  Role:string = '';
  role_router!:string;
  state!:IauthUser;
  user_name!:string;
  photo!:string;
  user_id!:string;
  constructor(private _router:Router, private stateService:AuthenticaUserService){
    this.stateService.state.subscribe((state:IauthUser)=>{
      this.state = state;
      this.accessToken = this.state.accessToken;
      this.Role=this.state.user.Role;
      this.role_router = this.state.user.Role.toLowerCase();
      this.user_id = this.state.user._id;
      this.user_name= this.state.user.Firstname + " "+this.state.user.Lastname;
      this.photo = this.state.user.Image;
    })
  }
  logout() {
    this.stateService.state.next({
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
    });
    localStorage.clear();
    this._router.navigate(['prepair','login']);
  }
}
