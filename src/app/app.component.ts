import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, HttpClientModule,HeaderComponent,ProductsComponent,AboutComponent,RouterModule,RouterLink] // Import dependencies here
})
export class AppComponent {
  title = 'ecm';

}

