import { Component, } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { merge, Observable } from 'rxjs';
import { Layout } from '../models/layout-model';
import { AuthenticaUserService } from 'src/app/authentica-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IauthUser, Role, User } from 'src/app/user.interface';
import { LayoutItem } from '../models/layout-item-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-mentor',
  templateUrl: './find-mentor.component.html',
  styleUrls: ['./find-mentor.component.scss' ],
  providers: []
})
export class FindMentorComponent {
 cardsLayout: Observable<Layout>
 selectedDisc!:string;
 noMentorsFound:boolean = true;
 foundMentors:any[]=[];
 searchPrompt:string = 'Select a discipline to see available mentors';
 user_Id!:string;
 role!:Role;

 constructor(private breakpointObserver: BreakpointObserver, private stateService:AuthenticaUserService,private _router:Router ) {
  this.cardsLayout = merge(
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.XSmall, Breakpoints.Small]).pipe(
      map(({ matches }) => {
        if (matches) {
          return this.getHandsetLayout();
        }
        return this.getDefaultLayout();
      })),
    this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
      map(({ matches }) => {
        if (matches) {
          return this.getTabletLayout();
        }
        return this.getDefaultLayout();
      })),
    this.breakpointObserver.observe(Breakpoints.Web).pipe(
      map(({ matches }) => {
        if (matches) {
          return this.getWebLayout();
        }
        return this.getDefaultLayout();
      }))
  );
 }

 getHandsetLayout():any {
  if(this.foundMentors.length>0){
    const cardItems:LayoutItem[] =this.foundMentors.map(item=>{
      const newItem = {...item,cols:1,rows:1}
      return newItem;
    })
     return {
       name: 'Handset',
       gridColumns: 1,
       layoutItem:cardItems
  }
  };
 }

 getTabletLayout(): any {
  if(this.foundMentors.length>0){
    const cardItems:LayoutItem[] =this.foundMentors.map(item=>{
      const newItem = {...item,cols:1,rows:1}
      return newItem;
    })
     return {
       name: 'Tablet',
       gridColumns: 3,
       layoutItem:cardItems
  }
   };
 }

 getWebLayout():any {
  if(this.foundMentors.length>0){
    const cardItems:LayoutItem[] =this.foundMentors.map(item=>{
      const newItem = {...item,cols:1,rows:1}
      return newItem;
    })
     return {
       name: 'Web',
       gridColumns: 5,
       layoutItem:cardItems
  }
   };
 }

 getDefaultLayout():any {
  if(this.foundMentors.length>0){
    const cardItems:LayoutItem[] =this.foundMentors.map(item=>{
      const newItem = {...item,cols:1,rows:1}
      return newItem;
    })
     return {
       name: 'default',
       gridColumns: 1,
       layoutItem:cardItems
  }
   };
 }
 LoadCardLayout(){
  this.cardsLayout = merge(
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.XSmall, Breakpoints.Small]).pipe(
      map(({ matches }) => {
        if (matches) {
          return this.getHandsetLayout();
        }
        return this.getDefaultLayout();
      })),
    this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
      map(({ matches }) => {
        if (matches) {
          return this.getTabletLayout();
        }
        return this.getDefaultLayout();
      })),
    this.breakpointObserver.observe(Breakpoints.Web).pipe(
      map(({ matches }) => {
        if (matches) {
          return this.getWebLayout();
        }
        return this.getDefaultLayout();
      }))
  );
 }
 searchMentor(){
  this.stateService.getMentors(this.selectedDisc).subscribe({
    next:(data:any)=>{
      if(data.error){
        this.searchPrompt = data.message;
        this.noMentorsFound = true
      }else{
        const foundMentorsArr = data.data;
        if(foundMentorsArr.length === 0){
          this.searchPrompt = 'No mentor found in this discipline, try a different related field';
          this.noMentorsFound = true
        }else{
          this.foundMentors = foundMentorsArr;
          this.noMentorsFound = false;
        }
      }
      this.LoadCardLayout()
    },
    error:(error:HttpErrorResponse)=>{
      console.log(error);
    }
  })
 }
 contactMentor(card:any){
  this.stateService.MentorToMessage = card as User;
  this.stateService.state.subscribe((state:IauthUser)=>{
    this.user_Id = state.user._id;
    this.role = state.user.Role;
  })
  this._router.navigate(['prepair',this.role.toLowerCase(),this.user_Id,'messages'])
 }
}
