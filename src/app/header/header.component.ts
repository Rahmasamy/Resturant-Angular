import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor(private cartService: CartService){}
  totalQuantity: number = 0;
  ngOnInit(): void {
    this.cartService.totalQuantity$.subscribe(quantity => {
      this.totalQuantity = quantity;
    });
  }
}
