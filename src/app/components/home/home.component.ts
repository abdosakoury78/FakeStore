import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private productService : ProductsService) { }

  products : Product[] = [];

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data as Product[];
    })
  }
}
