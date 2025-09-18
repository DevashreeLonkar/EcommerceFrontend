import { Component, OnInit } from '@angular/core';
import { MatLabel } from "@angular/material/form-field";
import { MatButton } from "@angular/material/button";
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css',
})
export class BuyProductComponent implements OnInit{

  productDetails: Product[]= [];

  orderDetails: OrderDetails={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantities: []
  }

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ){}
  ngOnInit(): void {
   this.productDetails= this.activatedRoute.snapshot.data['productDetails'];

   this.productDetails.forEach(
    x=> this.orderDetails.orderProductQuantities.push(
      {productId: x.productId, quantity: 1}
    )
   );
   console.log(this.productDetails);
   console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm){
    this.productService.placeOrder(this.orderDetails).subscribe(
      (resp) =>{
        orderForm.reset();
      },
      (err) =>{
        console.log(err);
      }
    )
  }

  getQuantityForProduct(productId: number){
    const filteredProduct= this.orderDetails.orderProductQuantities.filter(
      (productuantity)=> productuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId: number, productDiscountedPrice: number){
    const filteredProduct= this.orderDetails.orderProductQuantities.filter(
      (productuantity)=> productuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuatityChanged(q: number, productId: number){
    this.orderDetails.orderProductQuantities.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity= q;
  }

getCalculatedGrandTotal() {
  let grandTotal = 0;

  this.orderDetails.orderProductQuantities.forEach(productQuantity => {
    const product = this.productDetails.find(
      p => p.productId === productQuantity.productId
    );

    if (product) {
      grandTotal += product.productDiscountedPrice * productQuantity.quantity;
    }
  });

  return grandTotal;
}


}
