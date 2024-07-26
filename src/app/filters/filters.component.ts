import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class FiltersComponent implements OnInit {
  categories: string[] = [
    'All', 'Beef', 'Chicken', 'Dessert', 'Lamb', 'Pasta', 'Miscellaneous', 'Pork',
    'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat'
  ];
  areas$!: Observable<string[]>;
  ingredients$!: Observable<string[]>;

  selectedCategory: string = 'All';
  selectedArea: string = 'All';
  selectedIngredient: string = 'All';

  @Output() filter = new EventEmitter<{ type: string, value: string }>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.areas$ = this.http.get<any>('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .pipe(map(response => response.meals.map((meal: any) => meal.strArea)));

    this.ingredients$ = this.http.get<any>('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .pipe(map(response => response.meals.map((meal: any) => meal.strIngredient)));
  }

  onFilterCategory(category: string): void {
    this.selectedCategory = category;
    this.filter.emit({ type: 'category', value: category });
  }

  onFilterArea(area: string): void {
    this.selectedArea = area;
    this.filter.emit({ type: 'area', value: area });
  }

  onFilterIngredient(ingredient: string): void {
    this.selectedIngredient = ingredient;
    this.filter.emit({ type: 'ingredient', value: ingredient });
  }
}
