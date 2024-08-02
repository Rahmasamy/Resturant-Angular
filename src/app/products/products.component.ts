import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { NgFor } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor,StarRatingComponent, HttpClientModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  products: any[] = []; // Adjust type if necessary

  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data.recipes; 
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
  public viewDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}
