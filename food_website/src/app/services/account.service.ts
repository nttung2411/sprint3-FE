import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './authentication/token-storage';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private options: any;
  private isLogout = false;
  baseURL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient,
              private tokenStorage: TokenStorageService) {
    this.setOptions();
  }

  public checkDuplicate(accountName, phone, email, identity): Observable<any> {
    return this.httpClient.get('http://localhost:8080/check-duplicate?accountName=' + accountName + ''
      + '&phone=' + phone + '' + '&email=' + email + '' + '&identity=' + identity);
  }

  public saveAccount(account): Observable<any> {
    console.log(account);
    return this.httpClient.post('http://localhost:8080/save-account', account);
  }

  setOptions() {
    this.options = {
      // tslint:disable-next-line:object-literal-key-quotes
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  get httpOptions() {
    if (this.tokenStorage.getTime() && !this.isLogout) {
      if (this.tokenStorage.getTime().getTime() < new Date().getTime()) {
        this.isLogout = true;
        this.tokenStorage.logOut();
        this.setOptions();
      }
      this.isLogout = false;
    }
    return this.options;
  }

}
