import { Component } from '@angular/core';
import { Category } from '../../model/category';
import { CategoriesService } from '../../services/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private categoryService : CategoriesService) { }

  categories : Category[] = [];

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data as Category[];
    });
  }
}
