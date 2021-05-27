import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageModule} from './home-page/home-page.module';
import {HeaderFooterModule} from './header-footer/header-footer.module';
import {CartModule} from './cart/cart.module';
import {HttpClientModule} from '@angular/common/http';
import {MenuModule} from './menu/menu.module';
import {FoodDetailModule} from './food-detail/food-detail.module';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageModule,
    CartModule,
    HttpClientModule,
    HeaderFooterModule,
    MenuModule,
    LoginModule,
    RegisterModule,
    FoodDetailModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
