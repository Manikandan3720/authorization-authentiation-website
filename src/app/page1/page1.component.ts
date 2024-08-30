//<!-- page1.component.ts -->

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component {
  mobileNumber: string = '9820893282';
  errorMessage: string | null = null;
  studID: number = 0;

  constructor(private _router: Router, private _auth: AuthService) { }


  sendOtp() {
    const sendOtpLogin = {
      iRequestID: 1003,
      sUserName: this.mobileNumber
    };
    this._auth.loginUser(sendOtpLogin).subscribe({
      next: response => {
        console.log('OTP sent:', response.body[0]);
        this.studID = response.body[0].iStuID;
        this.mobileNumber = response.body[0].sMobileNo;
        localStorage.setItem('mobileNumber', this.mobileNumber);
        this._router.navigate(['/page2'], { state: { mobileNumber: this.mobileNumber } });
      },
      error: error => {
        console.log('OTP failed:', error);
      }
    });
  }
  



}

