import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];

  cartDetails: any[]= [];

  constructor(private productService: ProductService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response: any) =>{
        console.log(response);
        //this.cartDetails= response;
        this.cartDetails = response.products ?? [];  
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  checkout(){

     this.router.navigate(['/buyProduct',{
      isSingleProductCheckout: false, id: 0
    }]);
    
    // this.productService.getProductDetails(false, 0).subscribe(
    //   (resp: any) =>{
    //     console.log(resp);
    //   },
    //   (err) =>{
    //     console.log(err);
    //   }
    // )
  }

  delete(productId: any){
    this.productService.deleteCartItem(productId).subscribe(
      (resp: any) =>{
         console.log("Deleted product:", productId);
        this.getCartDetails();
      },
      (err) =>{
        console.log(err);
      }
    );
  }
}
