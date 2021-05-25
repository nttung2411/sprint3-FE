import {Component, OnInit} from '@angular/core';
import {FoodService} from '../../services/food.service';
import {Food} from '../../models/Food';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  foodsList = new Array<Food>();
  foodNameToSearch: string;

  constructor(private foodService: FoodService) {
  }

  ngOnInit() {
    this.getAllFood();
  }

  getAllFood() {
    this.foodService.getAllFood().subscribe(data => {
      this.foodsList = data;
    });
  }

  getSort(event) {
    const value = event.target.value;
    if (value === 'nothing') {
      this.getAllFood();
    } else if (value < 4) {
      this.foodService.getAllFoodByCategory(value).subscribe(data => this.foodsList = data);
    } else if (value == 4) {
      this.foodsList.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
    } else if (value == 5) {
      this.foodsList.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
    }
  }

  searchFoodByName() {
    this.foodService.getAllFoodByName(this.foodNameToSearch).subscribe(data => this.foodsList = data);
  }
}
