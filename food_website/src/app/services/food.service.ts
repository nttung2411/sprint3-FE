import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllFood(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/allfood');
  }

  public getAllFoodByCategory(categoryId): Observable<any> {
    return this.httpClient.get('http://localhost:8080/foodbycategory/' + categoryId);
  }

  public getAllFoodByName(foodName): Observable<any> {
    if (foodName == '') {
      foodName = undefined;
    }
    return this.httpClient.get('http://localhost:8080/foodbyname/' + foodName);
  }

  public getFoodById(foodId): Observable<any> {
    return this.httpClient.get('http://localhost:8080/food-detail/' + foodId);
  }
}
