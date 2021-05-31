import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './authentication/token-storage';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  httpOptions: any;

  constructor(private httpClient: HttpClient,
              private accountService: AccountService) {
    this.httpOptions = this.accountService.httpOptions;
  }

  public saveComment(comment): Observable<any> {
    return this.httpClient.post('http://localhost:8080/save-comment', comment, this.httpOptions);
  }

  public getAllCommentOfFood(foodId): Observable<any> {
    return this.httpClient.get('http://localhost:8080/get-comment/' + foodId);
  }
}
