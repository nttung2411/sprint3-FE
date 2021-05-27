import {User} from './User';

export class Account {
  accountId?: number;
  accountName: string;
  accountPassword: string;
  enable: number;
  user: User;
}
