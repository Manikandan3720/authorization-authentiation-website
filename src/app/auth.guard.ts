//<!-- auth.guard.ts -->

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthService) { }
  canActivate(): boolean  | Promise<boolean>{
    if(this._auth.loggedIn()) {
      return true;
    }
    else if (localStorage.getItem('rft') && localStorage.getItem('rfid')) {
      // If rft and rfid are present, initiate login process
      return this._auth.reLoginWithRftAndRfid();
    }

  else {
    this._router.navigate(['/page1']);
    return false;
  }
}

  }
  
