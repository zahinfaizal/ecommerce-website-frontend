import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

 product:any = {}

  constructor(private toastr:ToasterService,private route:ActivatedRoute,private api:ApiService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id} = res
      // get details of perticular product
      this.getProductDetails(id)
      
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.toastr.showSuccess("proceed to add item to wishlist")
    }else{
      this.toastr.showWarning("Operation denied.. PLease login")
    }
  }
  getProductDetails(id:any){
    this.api.getProductAPI(id).subscribe({
      next:(res:any)=>{
        this.product = res
      },
      error:(err)=>{
        console.log(err.error);
        
      }
    })
    }
  

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      this.toastr.showSuccess("proceed to add item to cart")
    }else{
      this.toastr.showWarning("Operation denied.. PLease login")
    }
  }
  

}
