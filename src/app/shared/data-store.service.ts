import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStore {
  url = 'https://shopping-f9888-default-rtdb.firebaseio.com/recipes.json';
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe((res) => {
      console.log(res);
    });
  }

  fetchRecipe() {
    return this.http.get<Recipe[]>(this.url, {}).pipe(
      // map((recipes) => {
      //   return recipes.map((recipe) => {
      //     return {
      //       ...recipe,
      //       ingredients: recipe.ingredients ? recipe.ingredients : [],
      //     };
      //   });
      // }),
      tap((recipes) => {
        this.recipeService.setRecipe(recipes);
      })
    );
  }
}
