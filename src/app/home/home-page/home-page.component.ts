import { Component, OnInit,HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  columnNum=3;
  rowHeight = '35em';
  missionSpan = 1
  public getScreenWidth:any;

  constructor(private spinner:NgxSpinnerService, private router:Router){
    if(window.innerWidth<1000){
      this.columnNum = 2;
      this.rowHeight = '1:2';
      this.missionSpan = 2;
    }else{
      this.columnNum = 3;
      this.rowHeight = '35em';
      this.missionSpan = 1;
    }
  }
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },3000);
    this.getScreenWidth = window.innerWidth;
  }

  @HostListener('window:resize',['$event'])
  onWindowResize(){
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth<1000){
      this.columnNum = 2;
      this.rowHeight = '1:2';
      this.missionSpan = 2;
    }else{
      this.columnNum = 3;
      this.rowHeight = '35em';
      this.missionSpan = 1;
    }
  }

  navigateToLogin(){
    this.router.navigate(['prepair','login'])
  }
  navigateToRegister(){
    this.router.navigate(['prepair','register'])
  }
}
