import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public getScreenWidth:any;
  constructor(private spinner:NgxSpinnerService){

  }
  ngOnInit(): void {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },2000);
    this.getScreenWidth = window.innerWidth;
  }
}
