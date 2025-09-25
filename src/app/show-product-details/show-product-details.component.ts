import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit{

  showLoadMoreProductButton= false;

  pageNumber: number=0;

  showTable= false;

  productDetails: Product[]= [];

  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price','Images','Edit','Delete'];

constructor(private productService: ProductService,
  public imagesDialog: MatDialog,
  private imageProcessingService: ImageProcessingService,
  private router: Router
){}

  ngOnInit(): void {
   this.getAllProducts();
  }

  public getAllProducts(){
    this.showTable= false;
    this.productService.getAllProducts(this.pageNumber)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) =>{
        console.log(resp);
        //this.productDetails= resp;
        this.showTable=true;
         if(resp.length == 12){
          this.showLoadMoreProductButton= true;
        }
        else{
          this.showLoadMoreProductButton= false;
        }
        resp.forEach(p => this.productDetails?.push(p));
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }

  deleteProduct(productId:any){
    this.productService.deleteProduct(productId).subscribe(
      (resp) =>{
        this.getAllProducts();
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }

  showImages(product: Product){
    console.log("----->",product,product.productImages);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data:{
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId: any){
    this.router.navigate(['/addNewProduct', {productId: productId}]);
  }

  public loadMoreProducts(){
    this.pageNumber= this.pageNumber +1;
    this.getAllProducts();
  }

}
