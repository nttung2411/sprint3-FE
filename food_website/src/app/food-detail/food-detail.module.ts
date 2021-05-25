import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import {RatingModule} from 'ng-starrating';



@NgModule({
  declarations: [FoodDetailComponent],
  imports: [
    CommonModule,
    RatingModule
  ]
})
export class FoodDetailModule { }
