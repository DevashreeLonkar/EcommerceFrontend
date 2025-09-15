import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';
import { map, Observable } from 'rxjs';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
   
    const id= route.paramMap.get("id");
    const isSingleProductCheckout= route.paramMap.get("isSingleProductCheckout");
    return this.productService.getProductDetails(
        isSingleProductCheckout === 'true', // convert string|null → boolean
        id!
      ).pipe(
        map((products: Product[]) =>
          products.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      );
  }
}
