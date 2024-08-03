import { Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details-component/product-details-component.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:'',component:BannerComponent},
    {path:'about', component:AboutComponent},
    {path:'products' , component:ProductsComponent},
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
