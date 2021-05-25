import {Category} from './Category';

export class Food {
  foodId?: number;
  foodName: string;
  price: number;
  description: string;
  registerDate: string;
  count: number;
  enable: number;
  category: Category;
  image: string;
}
