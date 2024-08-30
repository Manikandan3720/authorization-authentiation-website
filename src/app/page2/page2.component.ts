//<!-- page2.component.ts -->

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  mobileNumber: string;
  otp: string = '';
  errorMessage: string | null = null;
  

  constructor(private _router: Router, private _auth: AuthService) {
    const navigation = this._router.getCurrentNavigation();
    this.mobileNumber = navigation?.extras?.state?.['mobileNumber'] || localStorage.getItem('mobileNumber') || '';
   }

   ngOnInit(): void {
    this.setHeadersAndLogin();
  }

  verifyOtp() {
    const verifyOtpLogin = {
      iRequestID: 1004,
      iStuID: 20, 
      sMobileNo: this.mobileNumber, 
      sOTP: this.otp
    };

    this._auth.loginUser(verifyOtpLogin).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('OTP verified successfully:', response);
        const rft = response.headers.get('rft');
        const rfid = response.headers.get('rfid');
        if (rft && rfid) {
          localStorage.setItem('rft', rft);
          localStorage.setItem('rfid', rfid);
          this.setHeadersAndLogin();
        } else {
          console.error('rft and rfid header missing in the response');
        }
      },
      error: (error) => {
        console.error('OTP verification failed:', error);
      }
    });
  }

  private setHeadersAndLogin(): void {
    const rft = localStorage.getItem('rft');
    const rfid = localStorage.getItem('rfid');
    console.log('rft:', rft, 'rfid:', rfid);
    if (!rft || !rfid) {
      console.error('rft and rfid missing from local storage');
      return;
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'rft': rft,
      'rfid': rfid,
    });
    
    this._auth.loginUser({ iRequestID: 1005 }, headers).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Header set successfully:', response);
        const ast = response.headers.get('ast');
        if (ast) {
          sessionStorage.setItem('ast', ast);
          this._router.navigate(['/page3']);
        } else {
          console.error('ast header missing in the response');
        }
      },
      error: (error) => {
        console.error('Header set failed:', error);
      }
    });
  }
}
