import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscribe: Subscription;
  editing = false;
  index: number;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscribe = this.slService.startEditing.subscribe((index) => {
      this.editing = true;
      this.index = index;
      const item = this.slService.getIngredient(index);
      this.slForm.setValue(item);
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editing) {
      this.slService.updateIngredient(this.index, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
   this.onClear()
  }

  onClear(){
    this.slForm.reset();
    this.editing = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.index)
    this.onClear()
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
