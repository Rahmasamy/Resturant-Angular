import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service'; // Make sure you have this service
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-details-component',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './product-details-component.component.html',
  styleUrl: './product-details-component.component.scss',
  providers: [ProductService]
})
export class ProductDetailsComponent implements OnInit{
  productId: number | null = null;
  product: any; 
  constructor(private route: ActivatedRoute, private productService: ProductService ) { }
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

  }

