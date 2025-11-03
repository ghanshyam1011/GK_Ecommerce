import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SellerService } from '../service/seller.service';
import { SignUp } from '../../data-type';
import { Login } from '../../data-type';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showlogin = false;
  authError:string = '';

  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }
  Login(data: Login):void{
    this.authError="";
    console.warn(data)
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
          this.authError="User Email or password is not correct";
      }
    })
  }

  openlogin() {
    this.showlogin = true;
  }

  openSignUp() {
    this.showlogin = false;
  }
}
