import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Restaurant } from './restaurant.model';
import { ApiResult } from './apiResult.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RestaurantService {
  private restaurantApiUrl = 'http://localhost:3100/api/restaurant';

  constructor(private httpClient: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    let data =  this.httpClient.get<Restaurant[]>(this.restaurantApiUrl)
    .pipe(
      tap(restaurant => console.log(`retrieved restaurants`))
    );

    return data;
  }  

  saveRestaurant(restaurant: Restaurant): Observable<Restaurant> {    
    return this.httpClient.post<Restaurant>(this.restaurantApiUrl, restaurant, httpOptions)
    .pipe(
      tap(res => this.transform(res, restaurant))
    );    
  }

  transform(res: Restaurant, restaurant: Restaurant) {
    let stringifiedResult: string;
    let parsedResult: ApiResult;

    stringifiedResult = JSON.stringify(res);
    parsedResult = JSON.parse(stringifiedResult);

    //update newly created restaurant id property with the id returned from the api
    restaurant.id = parsedResult._id; 
  }
}
