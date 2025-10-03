import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price'];

  cartDetails: any[]= [];

  constructor(private productService: ProductService){}

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

}
