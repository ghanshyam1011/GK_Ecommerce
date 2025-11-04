import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product.service';
import { products } from '../../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchresult: products[] = [];
  searchVisible: boolean = false;

  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";
          const sellerStore = localStorage.getItem('seller');
          if (sellerStore) {
            const parsedData = JSON.parse(sellerStore);
            const sellerData = Array.isArray(parsedData) ? parsedData[0] : parsedData;
            this.sellerName = sellerData?.name || '';
          }
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProduct(event: KeyboardEvent) {
    const element = event.target as HTMLInputElement;
    const query = element.value.trim();
    if (query.length > 0) {
      this.product.searchproducts(query).subscribe((result) => {
      if(result.length>0){
        result.length=5;
      }
        this.searchresult = result || [];
        this.searchVisible = true;
      });
    } else {
      this.searchVisible = false;
      this.searchresult = [];
    }
  }

  showSearch() {
    this.searchVisible = true;
  }

  hideSearch() {
    // Small timeout to allow click on suggestion before hiding
    setTimeout(() => {
      this.searchVisible = false;
    }, 200);
  }

  selectProduct(item: products) {
    this.searchVisible = false;
    this.route.navigate(['/details', item.id]); // navigate to product page
  }
}
