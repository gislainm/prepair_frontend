import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IauthUser } from './user.interface';
import { AuthenticaUserService } from './authentica-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  accessToken!:string;
  constructor(private _router:Router, private stateService:AuthenticaUserService){
    this.stateService.state.subscribe((user:IauthUser)=>{
      this.accessToken = user.accessToken;
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.accessToken){
        this._router.navigate(['prepair','login']);
        return false;
      }
      return true;
  }

}
