import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getAllProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }
}
