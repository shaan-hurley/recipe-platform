import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { FiltersComponent } from '../filters/filters.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
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
export class RecipeListComponent implements OnInit {
  recipes$!: Observable<any[]>;
  error = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes$ = this.route.queryParams.pipe(
      switchMap(params => this.fetchRecipes(params['search'] || ''))
    );
  }

  fetchRecipes(query: string = ''): Observable<any[]> {
    const url = query
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    return this.http.get<any>(url).pipe(
      map(response => response.meals || []),
      map(meals => {
        this.error = meals.length === 0;
        return meals;
      })
    );
  }


  onFilter(category: string): void {
    if (category === 'All') {
      this.recipes$ = this.fetchRecipes();
    } else {
      this.recipes$ = this.http.get<any>(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).pipe(
        map(response => response.meals)
      );
    }
  }
}
