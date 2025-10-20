import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns= ["Id", "Product Name", "Amount", "Name", "Address", "Contact Number", "Status", "Action"];
  
    dataSource: any[] = [];

    orderStatus: String= 'All';

  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.orderStatus);
  }

  getAllOrderDetailsForAdmin(orderStatusParameter: String){
    this.productService.getAllOrderDetailsForAdmin(orderStatusParameter).subscribe(
      (resp) =>{
        console.log(resp);
        this.dataSource= resp;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId: any){
    this.productService.markAsDelivered(orderId).subscribe(
      (response) =>{
        this.getAllOrderDetailsForAdmin(this.orderStatus);
        console.log(response);
      },
      (error) =>{
        console.log(error);
      }
    );
  }

}
