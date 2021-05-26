import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  public saveComment(comment): Observable<any> {
    console.log(comment);
    return this.httpClient.post('http://localhost:8080/save-comment' , comment);
  }
}
