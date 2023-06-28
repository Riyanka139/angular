import { Injectable } from '@angular/core';
// import { Resolve } from "@angular/router";
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { DataStore } from '../shared/data-store.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolver {
  constructor(
    private dataStore: DataStore,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRoute, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStore.fetchRecipe();
    }
    return recipes;
  }
}
