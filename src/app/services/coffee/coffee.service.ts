import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Coffee } from '@models/coffee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  // private coffeeUrl = 'https://random-data-api.com/api/coffee/random_coffee?size=10';
  private coffeeUrl = `${environment.coffeeApiURL}?size=${environment.coffeeSize}`;

  constructor(
    private http: HttpClient,
  ) { }

  getCoffees(): Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.coffeeUrl)
    .pipe(
      // tap((coffees) => console.table(coffees)),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(() => error)
      })
    );
  }
}