import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);
  private totalQuantitySubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();
  totalQuantity$ = this.totalQuantitySubject.asObservable();

  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = existingProduct.quantity ? existingProduct.quantity + 1 : 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
    this.updateTotalQuantity();
  }

  getCartItems() {
    return this.cartItems;
  }
  removeFromCart(productId: number) {
    const existingProduct = this.cartItems.find(item => item.id === productId);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
      }
      this.cartItemsSubject.next(this.cartItems); // Notify subscribers
      this.updateTotalQuantity();
    }
  }
  updateCartItems(cartItems: any[]) {
    this.cartItems = cartItems;
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
    this.updateTotalQuantity();
  }

  private updateTotalQuantity() {
    const totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.totalQuantitySubject.next(totalQuantity);
  }
}
