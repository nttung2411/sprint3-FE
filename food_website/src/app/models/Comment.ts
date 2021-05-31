import {Food} from './Food';
import {Account} from './Account';

export class Comment {
  commentId?: number;
  account: Account;
  commentContent: string;
  commentImage: string;
  commentTime?: Date;
  food: Food;
}
