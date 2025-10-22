import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { MatLabel } from "@angular/material/form-field";
import { MatButton } from "@angular/material/button";
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

declare var Razorpay: any;

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css',
})
export class BuyProductComponent implements OnInit{

  isSingleProductCheckout: boolean = false;
  productDetails: Product[]= [];

  orderDetails: OrderDetails={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderProductQuantities: []
  }

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private injector: Injector
  ){}

  ngOnInit(): void {
   this.productDetails= this.activatedRoute.snapshot.data['productDetails'];
  //  this.isSingleProductCheckout= this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
  const checkoutParam = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
  this.isSingleProductCheckout = checkoutParam === 'true';

   this.productDetails.forEach(
    x=> this.orderDetails.orderProductQuantities.push(
      {productId: x.productId, quantity: 1}
    )
   );
   console.log(this.productDetails);
   console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm){
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) =>{
        orderForm.reset();

        const ngZone= this.injector.get(NgZone);
        ngZone.run(
          ()=>{
            this.router.navigate(["/orderConfirm"]);
          }
        );
        
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

createTransactionAndPlaceOrder(orderForm: NgForm){
    let amount= this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (response)=>{
        console.log(response);
        this.openTransactionModal(response, orderForm);
      },
      (error) =>{
        console.log(error);
      }
    );
  }


  openTransactionModal(response: any, orderForm: NgForm){
    var options= {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Devashree Lonkar',
      description: 'Payment of online shopping',
      image: 'https://cdn.pixabay.com/photo/2021/08/13/22/42/dog-6544115_1280.jpg',
      handler: (response: any) => {
        if(response!= null && response.razorpay_payment_id != null){
          this.processResponse(response, orderForm);
        }
        else{
          alert("Payment Failed..");
        }
        
      },
      prefill: {
        name: 'TEST',
        email: 'TEST@GMAIL.COM',
        contact: '74185296'
      },
      notes:{
        address: 'Online Shopping'
      },
      theme:{
        color: '#F37254'
      }
    };

    var razorPayObject= new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any, orderForm:NgForm){
    this.orderDetails.transactionId= resp.razorpay_payment_id;
    this.placeOrder(orderForm);
  }

}
