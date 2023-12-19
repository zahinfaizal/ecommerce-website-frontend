import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any = []
  constructor (private api:ApiService,private toastr:ToasterService){}

  ngOnInit(): void {
    this.api.getAllProductsApi().subscribe
    ((res:any)=>{
      this.allProducts = res
      // console.log(this.allProducts);
    })
  }
  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.toastr.showSuccess("proceed to add item to wishlist")
    }else{
      this.toastr.showWarning("Operation denied.. PLease login")
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      this.toastr.showSuccess("proceed to add item to cart")
    }else{
      this.toastr.showWarning("Operation denied.. PLease login")
    }
  }
  
  

}
