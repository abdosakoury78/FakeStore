import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }
}
