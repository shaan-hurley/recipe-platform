import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { FiltersComponent } from '../filters/filters.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    RecipeCardComponent,
    FiltersComponent,
    ErrorComponent
  ]
})
export class LandingPageComponent implements OnInit {
  featuredRecipes$!: Observable<any[]>;
  mealCategories$!: Observable<any[]>;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchFeaturedRecipes();
    this.mealCategories$ = this.http.get<any>('https://www.themealdb.com/api/json/v1/1/categories.php')
      .pipe(
        map(response => response.categories)
      );
  }

  fetchFeaturedRecipes(query: string = 'American'): void {
    this.featuredRecipes$ = this.http.get<any>(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`)
      .pipe(
        map(response => response.meals),
        catchError(err => {
          this.error = 'Error fetching recipes';
          return of([]);
        })
      );
  }

  onFilter(filter: { type: string, value: string }): void {
    let url = '';
    if (filter.type === 'category') {
      url = filter.value === 'All'
        ? 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American'
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter.value}`;
    } else if (filter.type === 'area') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter.value}`;
    } else if (filter.type === 'ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filter.value}`;
    }

    this.featuredRecipes$ = this.http.get<any>(url)
      .pipe(
        map(response => response.meals),
        catchError(err => {
          this.error = 'Error fetching recipes';
          return of([]);
        })
      );
  }
}
