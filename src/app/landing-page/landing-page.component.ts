import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

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
  ]
})
export class LandingPageComponent implements OnInit {
  featuredRecipes$!: Observable<any[]>;
  mealCategories$!: Observable<any[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.featuredRecipes$ = this.http.get<any>('https://www.themealdb.com/api/json/v1/1/filter.php?a=American')
      .pipe(
        map(response => response.meals)
      );

    this.mealCategories$ = this.http.get<any>('https://www.themealdb.com/api/json/v1/1/categories.php')
      .pipe(
        map(response => response.categories)
      );
  }
}
