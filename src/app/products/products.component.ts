import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { NgFor } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, StarRatingComponent, HttpClientModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        // Initialize quantity for each product
        this.products = data.recipes.map(product => ({ ...product, quantity: 0 }));
        this.updateProductQuantities();
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );

    this.cartService.cartItems$.subscribe(() => {
      this.updateProductQuantities();
    });
  }

  updateProductQuantities() {
    const cartItems = this.cartService.getCartItems();
    this.products = this.products.map(product => {
      const cartItem = cartItems.find(item => item.id === product.id);
      if (cartItem) {
        product.quantity = cartItem.quantity;
      }
      return product;
    });
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  public viewDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}
