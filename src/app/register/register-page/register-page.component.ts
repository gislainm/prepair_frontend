import { Component,inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mregister,Sregister } from 'src/app/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticaUserService } from 'src/app/authentica-user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  errorMessage:string='';
  hide = true;
  uRole='';
  inputDiscipline='';
  education='';
  inputGender='';
  YearInSchool="";
  step2Label:string="Step 2";
  step2State="help";
  animDuration="1000";
  student:boolean=false;
  mentor:boolean=false;
  constructor(private _router:Router, private stateService:AuthenticaUserService){}
  firstFormGroup = inject(FormBuilder).nonNullable.group({
    Firstname:['',[Validators.required]],
    Lastname:['',[Validators.required]],
    email:['',[Validators.email,Validators.required]],
    Password:['',[Validators.required,Validators.minLength(6)]],
    Role:[this.uRole,[Validators.required]]
  })
  secondFormGroupM=inject(FormBuilder).nonNullable.group({
    Company:['',[Validators.required]],
    Job:['',[Validators.required]],
    LevelOfEducation:[this.education,[Validators.required]],
    Discipline:[this.inputDiscipline,[Validators.required]],
    University:['',[Validators.required]]
  })

  secondFormGroupS=inject(FormBuilder).nonNullable.group({
    Major:['',[Validators.required]],
    University:['',[Validators.required]],
    YearInSchool:[this.YearInSchool,[Validators.required]]
  })

  thirdForm = inject(FormBuilder).nonNullable.group({
    Age:['',[Validators.required,Validators.max(120),Validators.min(5)]],
    Bio:['',[Validators.required]],
    Gender:[this.inputGender,[Validators.required]]
  })

  prepFormTwo():void{
    if(this.uRole === "Mentor"){
      this.student=false;
      this.mentor = true;
      this.step2Label = "Career Info";
      this.step2State="career";
    }else if(this.uRole === "Student"){
      this.student = true;
      this.mentor = false;
      this.step2Label = "School Info";
      this.step2State="school";
    }
  }

  registerUser(){
    if(this.uRole === "Mentor"){
      const userInfo = {...this.firstFormGroup.value,...this.secondFormGroupM.value,...this.thirdForm.value};
      const newMentorInfo:{} = {...userInfo,Discipline:[userInfo.Discipline]};
      this.stateService.registerMentor(newMentorInfo as Mregister).subscribe({
        next: (response:any)=>{
          if(response.error){
            this.errorMessage = response.message
          }else{
            this.stateService.user_email = response.data.email as string;
            this._router.navigate(['prepair/login']);
            this.errorMessage = '';
          }
        },
        error:(error:HttpErrorResponse)=>{
          this.errorMessage = error.error.message;
        }

      }
      )
    }else{
      const newStudentInfo:{} = {...this.firstFormGroup.value,...this.secondFormGroupS.value,...this.thirdForm.value};
      this.stateService.registerStudent(newStudentInfo as Sregister).subscribe({
        next: (response:any)=>{
          if(response.error){
            this.errorMessage = response.message
          }else{
            this.stateService.user_email = response.data.email as string;
            this._router.navigate(['prepair/login']);
            this.errorMessage = '';
          }
        },
        error:(error:HttpErrorResponse)=>{
          this.errorMessage = error.error.message;
        }
      }
      )
    }
  }
}
