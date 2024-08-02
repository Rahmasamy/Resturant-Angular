import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './Product.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private apiUrl="https://dummyjson.com/recipes"
  constructor(private http: HttpClient) { }
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl)
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
