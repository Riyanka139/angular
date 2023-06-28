import { EventEmitter } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService{
 private ingredients:Ingredient[] = [new Ingredient('Apples', 2), new Ingredient('Banana',5)];
 ingredientChanged = new Subject<Ingredient[]>()
 startEditing = new Subject<number>()

 getIngredients(){
    return this.ingredients.slice();
 }

 getIngredient(index){
   return this.ingredients[index]
 }

 addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
   this.ingredients.push(...ingredients);
   this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number,newIngredient: Ingredient){
   this.ingredients[index] = newIngredient;
   this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
   this.ingredients.splice(index,1);
   this.ingredientChanged.next(this.ingredients.slice());
  }
}