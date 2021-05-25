import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private httpClient: HttpClient) {
  }

  public savePoint(rate): Observable<any> {
    return this.httpClient.post('http://localhost:8080/save-rate' , rate);
  }
}
