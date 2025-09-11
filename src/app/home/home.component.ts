import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  productDetails: Product[] | undefined;

constructor(private productService: ProductService,
  private imageProcessingService: ImageProcessingService
){}

  ngOnInit(): void {
    this.getAllProducts();
    }

  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) =>{
        console.log(resp);
        this.productDetails= resp;
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }
  
}
