import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path:'prepair',
    loadChildren:()=>import('./home/home.module').then((m)=>m.HomeModule)
  },
  {
    path:'prepair/login',
    loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)
  },
  {
    path:'prepair/register',
    loadChildren:()=>import('./register/register.module').then((m)=>m.RegisterModule)
  },
  {
    path:'prepair/student/:studentId',
    canActivate:[AuthGuard],
    loadChildren:()=>import('./students/students.module').then((m)=>m.StudentsModule)
  },
  {
    path:'prepair/mentor/:mentorId',
    canActivate:[AuthGuard],
    loadChildren:()=>import('./mentors/mentors.module').then((m)=>m.MentorsModule)
  },
  {
    path:'',
    redirectTo:'prepair',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
