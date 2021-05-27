import {Account} from '../../models/Account';

export class JwtResponse {
    jwtToken: string;
    account: Account;
    roles: string[];
    constructor(jwtToken: string) {
        this.jwtToken = jwtToken;
    }
}
