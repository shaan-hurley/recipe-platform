import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipes/:id', component: RecipeDetailComponent },
];
