import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType :string='default';
  sellerName :string = '';
  constructor(private route:Router){}
  ngOnInit():void{
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        console.warn(val.url)
        if(localStorage.getItem('seller') && val.url.includes('seller')){
            // console.warn("in seller area")
            this.menuType="seller"
            if(localStorage.getItem('seller')){
             let sellerStore = localStorage.getItem('seller');
                if (sellerStore) {
                  let parsedData = JSON.parse(sellerStore);
                  let sellerData = Array.isArray(parsedData) ? parsedData[0] : parsedData;
                  this.sellerName = sellerData?.name || '';
                }

            }
        }else{
          // console.warn("outside seller")
          this.menuType='default'
        }

      }
    })
   }

   logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
   }
}
