import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {
  }

  public checkDuplicate(accountName, phone, email, identity): Observable<any> {
    return this.httpClient.get('http://localhost:8080/check-duplicate?accountName=' + accountName + ''
      + '&phone=' + phone + '' + '&email=' + email + '' + '&identity=' + identity);
  }

  public saveAccount(account): Observable<any> {
    return this.httpClient.post('http://localhost:8080/save-account', account);
  }
}
