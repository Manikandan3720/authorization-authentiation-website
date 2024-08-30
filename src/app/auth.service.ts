//<!-- auth.service.ts -->

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authtest = 'https://limitlesseducare.com/training/authtest';

  constructor(private _router:Router, private http: HttpClient) { }


loginUser(data: any, headers?: HttpHeaders): Observable<HttpResponse<any>> {
  const options = {
    observe: 'response' as const,
    headers: headers || new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  };
  return this.http.post<any>(this._authtest, data, options);
}

loggedIn(): boolean  {
  return !!sessionStorage.getItem('ast');
}

logoutUser(): void {
  localStorage.removeItem('rft');
  localStorage.removeItem('rfid');
  localStorage.removeItem('mobileNumber')
  sessionStorage.removeItem('ast');
  this._router.navigate(['/page1']);
}

reLoginWithRftAndRfid(): Promise<boolean> {
  return new Promise((resolve) => {
    const rft = localStorage.getItem('rft');
    const rfid = localStorage.getItem('rfid');

    if (!rft || !rfid) {
      this._router.navigate(['/page1']);
      resolve(false);
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'rft': rft,
      'rfid': rfid,
    });

    this.loginUser({ iRequestID: 1005 }, headers).subscribe({
      next: (response: HttpResponse<any>) => {
        const ast = response.headers.get('ast');
        if (ast) {
          sessionStorage.setItem('ast', ast);
          this._router.navigate(['/page3']);
          resolve(true);
        } else {
          console.error('ast header missing in the response');
          this._router.navigate(['/page1']);
          resolve(false);
        }
      },
      error: (error) => {
        console.error('Re-login failed:', error);
        this._router.navigate(['/page1']);
        resolve(false);
      }
    });
  });
}
}