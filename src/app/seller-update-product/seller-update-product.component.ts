import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { products  } from '../../data-type';
@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData : undefined | products                ;
constructor(private route : ActivatedRoute,private product:ProductService){}
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
}
}
