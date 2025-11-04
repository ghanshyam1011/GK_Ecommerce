import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Correct import
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../service/product.service';
import { products } from '../../data-type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule], // ✅ Fixed imports
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // ✅ 'styleUrls' instead of 'styleUrl'
})
export class HomeComponent {
  popularProducts: products[] | undefined;
  trend : products[] | undefined;

  constructor(private product: ProductService) {}

  ngOnInit() {
    this.product.popularProducts().subscribe((data: products[]) => {
      console.warn("this is the data",data);
      this.popularProducts = data;
    });
    this.product.trendyproducts().subscribe((data)=>{
      this.trend = data;
    })
  }
}
