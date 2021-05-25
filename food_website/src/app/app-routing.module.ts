import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page/home-page.component';
import {CartComponent} from './cart/cart/cart.component';
import {MenuComponent} from './menu/menu/menu.component';
import {FoodDetailComponent} from './food-detail/food-detail/food-detail.component';


const routes: Routes = [
  {path: '' , component: HomePageComponent},
  {path: 'cart' , component: CartComponent},
  {path: 'menu' , component: MenuComponent},
  {path: 'food-detail/:id' , component: FoodDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
