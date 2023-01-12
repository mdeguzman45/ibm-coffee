import { HttpErrorResponse } from "@angular/common/http";
import { Coffee } from "@models/coffee";
import { createAction, props } from "@ngrx/store";

export enum CoffeeActionType {
  GET_COFFEES = "[Coffees] Get Coffees",
  GET_COFFEES_SUCCESS = "[Coffees] Get Coffees success",
  GET_COFFEES_FAIL = "[Coffees] Get Coffees fail",
}

export const getCoffees = createAction(CoffeeActionType.GET_COFFEES);
export const getCoffeesSuccess = createAction(
  CoffeeActionType.GET_COFFEES_SUCCESS,
  (coffees: Coffee[]) => ({ coffees })
  // props<{ coffees: ReadonlyArray<Coffee> }>()
);
export const getCoffeesFail = createAction(
  CoffeeActionType.GET_COFFEES_FAIL,
  props<{ error: HttpErrorResponse }>()
);