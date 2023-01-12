import { Injectable } from "@angular/core";
import { Coffee } from "@models/coffee";
import { Observable, of } from "rxjs";
import { mockCoffees } from "./coffee.mock";

@Injectable()
export class MockCoffeeService {
  constructor() { }

  getCoffees(): Observable<Coffee[]> {
    return of(mockCoffees);
  }
}