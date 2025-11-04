import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { products  } from '../../data-type';
import { RouterModule } from '@angular/router';@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule,RouterModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData : undefined | products;
  productMessage: undefined | string;              ;
constructor(private route : ActivatedRoute,private product:ProductService,private router: Router){}
ngOnInit(): void{
  let productid = this.route.snapshot.paramMap.get('id')
  console.warn(productid)
  productid &&this.product.getProduct(productid).subscribe ((data)=>{
      console.warn(data);
      this.productData = data;
  })
}
submit(data:products){
  console.warn(data)
  if(this.productData){
    data.id = this.productData.id //forcefully push kiya hai
  }
  this.product.updateproduct(data).subscribe((result)=>{
    if(result){
      this.productMessage="Product has updated"
    }
  });
  setTimeout(()=>{
    // this.productMessage=undefined;
    this.router.navigate(['/seller-Home']);
  }, 2000);
}
}
