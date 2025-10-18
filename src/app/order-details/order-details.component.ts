import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns= ["Id", "Product Name", "Amount", "Name", "Address", "Contact Number", "Status"];
  
    dataSource: any[] = [];

  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin();
  }

  getAllOrderDetailsForAdmin(){
    this.productService.getAllOrderDetailsForAdmin().subscribe(
      (resp) =>{
        console.log(resp);
        this.dataSource= resp;
      },
      (error) =>{
        console.log(error);
      }
    );
  }

}
