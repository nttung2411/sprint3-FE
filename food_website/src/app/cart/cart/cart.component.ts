import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {OrderFood} from '../../models/OrderFood';
import {TokenStorageService} from '../../services/authentication/token-storage';
import {Account} from '../../models/Account';
import {isNumber, isString} from 'util';
import {Food} from '../../models/Food';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderFoodList = new Array<OrderFood>();
  account: Account;
  quantity: number;
  grandTotal = 0;
  orderToRemove: OrderFood;

  constructor(private cartService: CartService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.account = this.tokenStorageService.getAccount();
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      that.getAllOrderFoodList();
    }, 1000);
  }

  getAllOrderFoodList() {
    this.orderFoodList = this.cartService.cart;
    if (this.orderFoodList != null) {
      for (const orderFood of this.orderFoodList) {
        this.grandTotal += orderFood.food.price * orderFood.quantity;
      }
    }
  }

  changeQuantity(index) {
    const newQuantity: number = +(document.getElementById('idToChange' + index) as HTMLInputElement).value;
    this.orderFoodList[index].quantity = newQuantity;
    this.cartService.cart[index].quantity = newQuantity;
    console.log(this.cartService.cart);
    this.grandTotal = 0;
    for (const orderFood of this.orderFoodList) {
      this.grandTotal += orderFood.food.price * orderFood.quantity;
    }
  }

  removeOrder() {
    this.cartService.removeOrderFood(this.orderToRemove.orderFoodId).subscribe();
    document.getElementById('close').click();
    this.orderFoodList = this.cartService.cart;
    this.grandTotal = 0;
    if (this.orderFoodList != null) {
      for (const orderFood of this.orderFoodList) {
        this.grandTotal += orderFood.food.price * orderFood.quantity;
      }
    }
  }

  sendFoodToRemove(orderFood: OrderFood) {
    this.orderToRemove = orderFood;
  }
}
