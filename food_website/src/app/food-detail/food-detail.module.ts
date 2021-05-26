import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import {RatingModule} from 'ng-starrating';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [FoodDetailComponent],
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FoodDetailModule { }
