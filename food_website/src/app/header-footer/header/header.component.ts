import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/authentication/token-storage';
import {CartService} from '../../services/cart.service';
import {LengthOfCart} from '../../models/LengthOfCart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  lengthOfCart = new LengthOfCart();

  constructor(private tokenStorage: TokenStorageService,
              private cartService: CartService) {
  }

  ngOnInit() {
    const that = this;
    this.cartService.getLengthOfCart();
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      that.lengthOfCart = that.cartService.lengthOfCart;
    }, 1000);
  }

  get isLogged() {
    return this.tokenStorage.isLogged();
  }

  logout() {
    this.tokenStorage.logOut();
    window.location.reload();
  }
}
