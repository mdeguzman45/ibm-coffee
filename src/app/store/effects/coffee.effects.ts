import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { CoffeeService } from "@services/coffee/coffee.service";
import { getCoffeesFail, getCoffees, getCoffeesSuccess } from "@store/actions/coffee.actions";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

@Injectable()
export class CoffeeEffects{
  constructor(
    private action$: Actions,
    private coffeeService: CoffeeService
  ) { }

  loadCoffee$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCoffees),
      switchMap(() =>
        this.coffeeService.getCoffees().pipe(
          map((coffees) => getCoffeesSuccess(coffees)),
          catchError((error: HttpErrorResponse) => of(getCoffeesFail(error)))
        )
      )
    )
  );
}