import {Component, OnInit} from '@angular/core';
import {FoodService} from '../../services/food.service';
import {Food} from '../../models/Food';
import {TokenStorageService} from '../../services/authentication/token-storage';
import {CartService} from '../../services/cart.service';
import {OrderFood} from '../../models/OrderFood';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  foodsList = new Array<Food>();
  foodsListTemp = new Array<Food>();
  foodNameToSearch: string;

  constructor(private foodService: FoodService,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.getAllFood();
  }

  getAllFood() {
    this.foodService.getAllFood().subscribe(data => {
      this.foodsList = data;
      this.foodsListTemp = data;
    });
  }

  getSort(event) {
    const value = event.target.value;
    if (value === 'nothing') {
      this.getAllFood();
    } else if (value < 4) {
      this.foodService.getAllFoodByCategory(value).subscribe(data => this.foodsList = data);
    } else if (value == 4) {
      this.foodsList = this.foodsListTemp;
      this.foodsList.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
    } else if (value == 5) {
      this.foodsList = this.foodsListTemp;
      this.foodsList.sort((firstItem, secondItem) => firstItem.price - secondItem.price);
    }
  }

  searchFoodByName() {
    this.foodService.getAllFoodByName(this.foodNameToSearch).subscribe(data => this.foodsList = data);
  }

  get isLogged() {
    return this.tokenStorageService.isLogged();
  }

  addToCart(foodToAdd: Food) {
    for (const orderFoodOfCart of this.cartService.cart) {
      if (orderFoodOfCart.food.foodId === foodToAdd.foodId) {
        orderFoodOfCart.quantity++;
        return;
      }
    }
    const orderFood: OrderFood = {
      quantity: 1,
      food: foodToAdd,
      account: this.tokenStorageService.getAccount(),
    };
    this.cartService.saveFoodToCart(orderFood).subscribe();
  }
}
