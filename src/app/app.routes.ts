import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { AuthGuard } from './auth.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
// import { authGuard } from './auth.guard';

export const routes: Routes = [
 { path:'',component:HomeComponent},
 { path:'seller-auth',component:SellerAuthComponent},
 { path:'seller-Home',component:SellerHomeComponent},
 { path:"seller-add-product",component:SellerAddProductComponent },
 {path:"seller-update-product/:id",component:SellerUpdateProductComponent}
];
