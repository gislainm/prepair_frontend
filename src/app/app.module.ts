import { APP_INITIALIZER,NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthenticaUserService } from './authentica-user.service';
import { IauthUser } from './user.interface';


const refreshToken = (stateService:AuthenticaUserService)=>{
  return ()=>{
    const stored_state = localStorage.getItem('STATE');
    if(stored_state){
      const sStateValue:IauthUser = JSON.parse(stored_state);
      stateService.state.next(sStateValue);
      stateService.accessToken = sStateValue.accessToken;
    }
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
//Material imports
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide:APP_INITIALIZER,
    useFactory:refreshToken,
    deps:[AuthenticaUserService],
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
