import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SignUp, Login } from '../../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  // Reactive flags and error tracking
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  private apiUrl = 'http://localhost:3000/seller'; // ✅ JSON Server endpoint

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Seller Sign Up
  userSignUp(data: SignUp): void {
    this.http.post(this.apiUrl, data, { observe: 'response' })
      .subscribe({
        next: (result) => {
          if (result.body) {
            this.isSellerLoggedIn.next(true);
            localStorage.setItem('seller', JSON.stringify(result.body));
            this.router.navigate(['seller-home']);
          }
        },
        error: (err) => {
          console.error('Signup failed:', err);
        }
      });
  }

  // ✅ Seller Login
  userLogin(data: Login): void {
    this.http.get(`${this.apiUrl}?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe({
        next: (result: any) => {
          if (result && result.body && result.body.length) {
            this.isSellerLoggedIn.next(true);
            localStorage.setItem('seller', JSON.stringify(result.body));
            this.router.navigate(['seller-home']);
            this.isLoginError.emit(false);
          } else {
            this.isLoginError.emit(true);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.isLoginError.emit(true);
        }
      });
  }

  // ✅ Keep seller logged in on refresh
  reloadSeller(): void {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem('seller');
    this.isSellerLoggedIn.next(false);
    this.router.navigate(['/']);
  }
}
