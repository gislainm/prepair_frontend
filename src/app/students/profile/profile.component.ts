import { Component,inject,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticaUserService } from 'src/app/authentica-user.service';
import { IauthUser,Role,Gender,User } from 'src/app/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  hide = true;
  selectedTab:string="account";
  roleC!:Role;
  Username!:string;
  genderC!:Gender;
  YearInSchoolC!:string;
  user_email!:string;
  user_Imange!:string;
  errorMessage:string = '';
  male:boolean=this.genderC==="Male"? true:false;
  female:boolean= this.genderC==="Female"? true:false;
  stud:boolean=this.roleC === "Student"?true:false;
  ment:boolean=this.roleC === "Mentor"?true:false;
  constructor(private stateService:AuthenticaUserService){}
  accountForm=inject(FormBuilder).nonNullable.group({
    Firstname:['',[Validators.required]],
    Lastname:['',[Validators.required]],
    email:['',[Validators.email,Validators.required]],
    Age:[0,[Validators.max(120),Validators.min(5),Validators.required]],
    Bio:['',[Validators.required]],
    Gender:[''],
    Role:['']
  })

  passwordForm = inject(FormBuilder).nonNullable.group({
    oldPassword:['',[Validators.required,Validators.minLength(6)]],
    newPassword:['',[Validators.required,Validators.minLength(6)]]
  })

  educationForm = inject(FormBuilder).nonNullable.group({
    Major:['',[Validators.required]],
    University:['',[Validators.required]],
    YearInSchool:['']
  })

  updateAccount():void{
    const email = this.user_email;
    const Updates = {...this.accountForm.value,Role:this.roleC,Gender:this.genderC}
    this.stateService.updateUserInfo({email,Updates}).subscribe({
      next:(data:any)=>{
        if(data.error){
          this.errorMessage = data.message;
        }else{
          const updatedUser:User = data.data as User;
          const accessToken:string = this.stateService.accessToken as string;
          this.stateService.state.next({accessToken:accessToken,user:updatedUser} as IauthUser);
          localStorage.setItem('STATE',JSON.stringify({accessToken:accessToken,user:updatedUser}));
        }
      },
      error:(error:HttpErrorResponse)=>{
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
      }
    })
  }

  updatePassword():void{
    const email = this.user_email;
    const formInput = {...this.passwordForm.value}
    const oldPwd = formInput.oldPassword;
    const newPwd = formInput.newPassword;
    this.stateService.updateUserPwd({email,oldPwd,newPwd}).subscribe({
      next:(data:any)=>{
        if(data.error){
          this.errorMessage = data.message;
        }else{
          const updatedUser:User = data.data as User;
          const accessToken:string = this.stateService.accessToken as string;
          console.log({accessToken,updatedUser});
          this.stateService.state.next({accessToken:accessToken,user:updatedUser} as IauthUser);
          localStorage.setItem('STATE',JSON.stringify({accessToken:accessToken,user:updatedUser}));
        }
      },
      error:(error:HttpErrorResponse)=>{
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
      }
    })
  }
  updateEducation():void{
    const email = this.user_email;
    const Updates={...this.educationForm.value,YearInSchool:this.YearInSchoolC};
    this.stateService.updateUserInfo({email,Updates}).subscribe({
      next:(data:any)=>{
        if(data.error){
          this.errorMessage = data.message;
        }else{
          const updatedUser:User = data.data as User;
          const accessToken:string = this.stateService.accessToken as string;
          this.stateService.state.next({accessToken:accessToken,user:updatedUser} as IauthUser);
          localStorage.setItem('STATE',JSON.stringify({accessToken:accessToken,user:updatedUser}));
        }
      },
      error:(error:HttpErrorResponse)=>{
        this.errorMessage = error.error.message;
        console.log(this.errorMessage);
      }
    })
  }

  ngOnInit(): void {
    this.stateService.state.subscribe((state:IauthUser)=>{
      this.user_Imange = state.user.Image;
      this.roleC = state.user.Role;
      this.genderC = state.user.Gender;
      this.user_email = state.user.email
      this.YearInSchoolC = state.user.YearInSchool as string;
      this.Username = state.user.Firstname + " " + state.user.Lastname;
      this.accountForm.get('Firstname')!.patchValue(state.user.Firstname);
      this.accountForm.get('Lastname')!.patchValue(state.user.Lastname);
      this.accountForm.get('Age')!.patchValue(state.user.Age);
      this.accountForm.get('Bio')!.patchValue(state.user.Bio);
      this.accountForm.get('email')!.patchValue(state.user.email);
      this.educationForm.get('Major')!.patchValue(state.user.Major as string);
      this.educationForm.get('University')!.patchValue(state.user.University);
      this.educationForm.get('YearInSchool')!.patchValue(this.YearInSchoolC)
    })
  }
  selectAccount():void{
    this.selectedTab = 'account';
  }
  selectPassword():void{
    this.selectedTab='password';
  }
  selectEducationCareer():void{
    this.selectedTab='education-career';
  }
}
