import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  pageNumber: number=0;
  productDetails: Product[] = [];

  showLoadButton= false;

  currentSearchKey: string = "";

constructor(private productService: ProductService,
  private imageProcessingService: ImageProcessingService,
  private router: Router
){}

  ngOnInit(): void {
    this.getAllProducts(0, "");
    }

  searchByKeyword(searchkeyword: any){
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(0, searchkeyword);
    this.currentSearchKey = searchkeyword;
  }

  public getAllProducts(pageNumber: number, searchkey: string=""){
    this.productService.getAllProducts(pageNumber, searchkey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) =>{
        console.log(resp);
        if(resp.length == 12){
          this.showLoadButton= true;
        }
        else{
          this.showLoadButton= false;
        }
        resp.forEach(p => this.productDetails?.push(p));
        //this.productDetails= resp;
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }

  showProductDetails(productId: any){
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }

  public loadMoreProducts(){
    this.pageNumber= this.pageNumber +1;
     this.getAllProducts(this.pageNumber, this.currentSearchKey);
    //this.getAllProducts();
  }

 

  
}
