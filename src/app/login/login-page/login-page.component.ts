import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticaUserService } from 'src/app/authentica-user.service';
import { IauthUser, Ilogin,Role } from 'src/app/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  hide = true;
  loginForm = inject(FormBuilder).nonNullable.group({
    email:[this.stateService.user_email,[Validators.email,Validators.required]],
    Password:['',[Validators.minLength(6),Validators.required]]
  })
  errorMessage:string = '';

  constructor(private _router:Router,private stateService:AuthenticaUserService){}
  ngOnInit(): void {
  }
  onLogin():void{
    this.errorMessage = '';
    this.stateService.loginUser(this.loginForm.value as Ilogin).subscribe({
      next:(data:any)=>{
        if(data.error){
          this.errorMessage = data.message;
        }else{
          const role = data.data.user.Role;
          const userId = data.data.user._id;
          this.stateService.state.next(data.data as IauthUser);
          this.stateService.accessToken = data.data.accessToken;
          localStorage.setItem('STATE',JSON.stringify(data.data));
          if(role === Role.Mentor){
            this._router.navigate(['prepair','mentor',userId,'home'])
          }else{
            this._router.navigate(['prepair','student',userId,'home'])
          }
        }
      },
      error:(error:HttpErrorResponse)=>{
        this.errorMessage = error.error.message;
      }
    })
  }
  getErrorMessage():string{
    if(this.loginForm.controls['email'].hasError('required')){
      return "Please enter your email"
    }
    return this.loginForm.controls['email'].hasError('email')?'Not a valid email':''
  }

  getPwdErrorMessage():string{
    if(this.loginForm.controls['Password'].hasError('required')){
      return "Please enter your password"
    }
    return this.loginForm.controls['Password'].hasError('minlength')?'Password too short':''
  }
}
