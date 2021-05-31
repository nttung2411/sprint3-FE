import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './authentication/token-storage';
import {AccountService} from './account.service';
import {Observable, of} from 'rxjs';
import {LengthOfCart} from '../models/LengthOfCart';
import {OrderFood} from '../models/OrderFood';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  httpOption: any;
  lengthOfCart = new LengthOfCart();
  cart = new Array<OrderFood>();

  constructor(private httpClient: HttpClient,
              private accountService: AccountService,
              private tokenStorageService: TokenStorageService) {
    this.httpOption = this.accountService.httpOptions;
  }

  public saveFoodToCart(orderFood): Observable<any> {
    this.lengthOfCart.lengthOfCart++;
    this.cart.push(orderFood);
    return this.httpClient.post('http://localhost:8080/save-order', orderFood, this.httpOption);
  }

  public getAllFoodToCart(accountId): Observable<any> {
    return this.httpClient.get('http://localhost:8080/foodsCart/' + accountId, this.httpOption);
  }

  public removeOrderFood(orderFoodId): Observable<any> {
    this.lengthOfCart.lengthOfCart--;
    this.cart = this.cart.filter(orderFood => orderFood.orderFoodId !== orderFoodId);
    return this.httpClient.delete('http://localhost:8080/remove-order/' + orderFoodId, this.httpOption);
  }

  public getLengthOfCart() {
    this.getAllFoodToCart(this.tokenStorageService.getAccount().accountId).subscribe(data => {
      if (data != null) {
        this.cart = data;
        this.lengthOfCart.lengthOfCart = data.length;
      } else {
        this.cart = null;
        this.lengthOfCart.lengthOfCart = 0;
      }
      console.log(this.lengthOfCart);
      return this.lengthOfCart;
    });
  }

  public getCart() {
    return this.cart;
  }
}
