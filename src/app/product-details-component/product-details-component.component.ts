import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../product.service'; // Make sure you have this service
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details-component',
  standalone: true,
  imports: [HttpClientModule,RouterLink],
  templateUrl: './product-details-component.component.html',
  styleUrl: './product-details-component.component.scss',
  providers: [ProductService]
})
export class ProductDetailsComponent implements OnInit{
  productId: number | null = null;
  product: any; 
  constructor(private route: ActivatedRoute, private productService: ProductService,private cartService:CartService ) { }
  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;
      if (this.productId) {
        this.productService.getProductById(this.productId).subscribe(
          (data: any) => {
            this.product = data; // Adjust based on API response
          },
          (error) => {
            console.error('Error fetching product details', error);
          }
        );
      }
    });

  }
  addToCart(){
    if (this.product){
      this.cartService.addToCart(this.product);
    }
  }
  increaseQuantity() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
  
  decreaseQuantity() {
    if (this.product && this.product.quantity > 0) {
      this.cartService.removeFromCart(this.product.id);
    }
  }
  }
 

