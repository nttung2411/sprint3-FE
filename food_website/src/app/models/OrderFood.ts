import {Account} from './Account';
import {Food} from './Food';

export class OrderFood {
  orderFoodId?: number;
  quantity: number;
  account: Account;
  food: Food;
}
