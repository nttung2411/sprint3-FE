import {Food} from './Food';

export class Comment {
  commentId?: number;
  commentContent: string;
  commentImage: string;
  commentTime?: Date;
  food: Food;
}
