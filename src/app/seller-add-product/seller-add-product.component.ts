import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { products } from '../../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true, // ✅ Required if using 'imports' array
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'] // ✅ must be 'styleUrls' (plural)
})
export class SellerAddProductComponent {
  addproductMessage?: string;

  constructor(private product: ProductService) {}

  ngOnInit(): void {}

  submit(data: products): void {
    this.product.addproduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addproductMessage = 'Product was successfully added! ✅';
        setTimeout(() => (this.addproductMessage = ''), 3000); // clears message after 3s
      }
    });
  }
}
