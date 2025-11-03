import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { products } from '../../data-type';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // ✅ ADD THIS
import { faCoffee, faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router"; // ✅ Import icons

@Component({
  selector: 'app-seller-home',
  standalone: true, // ✅ since you are importing modules directly
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterLink], // ✅ ADD FontAwesomeModule here
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'] // ✅ Fix typo (styleUrls instead of styleUrl)
})
export class SellerHomeComponent {
  productList: undefined | products[];
  productMessage: undefined | string;

  faCoffee = faCoffee;
  faTrash = faTrash; // example if you want trash icon for delete
  edit = faEdit;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product deleted successfully!";
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
