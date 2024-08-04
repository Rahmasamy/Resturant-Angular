import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartItems:any[]=[]
  constructor(private cartService:CartService){}
 
  ngOnInit():void{
    
    this.cartItems=this.cartService.getCartItems();
    console.log(this.cartItems);
  }
  deleteFromCart(id:any){
    const index = this.cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartService.updateCartItems(this.cartItems);
    }
  }
  plusProduct(item:any){
    if(item.quantity){
     item.quantity=item.quantity+1
    }
    else {
      item.quantity=1
    }
    this.cartService.updateCartItems(this.cartItems);
  }
  minusproduct(item:any){
    if (item.quantity && item.quantity > 1) {
      item.quantity =item.quantity- 1;
    }
    this.cartService.updateCartItems(this.cartItems);
  }
}
