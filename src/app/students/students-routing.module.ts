import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessageComponent } from './message/message.component';
import { FindMentorComponent } from './find-mentor/find-mentor.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'find-mentor',
    component:FindMentorComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'messages',
    component:MessageComponent
  },
  {
    path:'*',
    redirectTo:'home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
