import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  constructor(private toastr:ToasterService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id} = res
      // get details of perticular product
      
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
