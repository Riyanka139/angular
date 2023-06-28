import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 ingredients:Ingredient[];
 private ingChangedsub: Subscription;

 constructor(private slService:ShoppingListService){}

 ngOnInit(){
  this.ingredients = this.slService.getIngredients();
 this.ingChangedsub = this.slService.ingredientChanged.subscribe((ingredients)=>{this.ingredients = ingredients})
 }

 ngOnDestroy(): void {
   this.ingChangedsub.unsubscribe();
 }

 onEdit(index: number){
  this.slService.startEditing.next(index);
 }
 
}
