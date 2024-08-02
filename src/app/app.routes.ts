import { Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details-component/product-details-component.component';

export const routes: Routes = [
    {path:'',component:BannerComponent},
    {path:'about', component:AboutComponent},
    {path:'products' , component:ProductsComponent},
    { path: 'product/:id', component: ProductDetailsComponent }
];
