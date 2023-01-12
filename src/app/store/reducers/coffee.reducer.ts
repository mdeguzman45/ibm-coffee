import { createReducer, on } from "@ngrx/store";
import { getCoffeesFail, getCoffees, getCoffeesSuccess } from "@store/actions/coffee.actions";
import { initialCoffeeState, coffeeAdapter } from "../states/coffee.state";

export const coffeeReducer = createReducer(
  initialCoffeeState,
  on(getCoffees, (state) => ({ ...state, loading: true })),
  on(getCoffeesSuccess, (state, {coffees}) => 
    coffeeAdapter.setAll(coffees, {
      ...state,
      error: false,
      loading: false,
      total: coffees.length
    })
  ),
  on(getCoffeesFail, (state) =>
    coffeeAdapter.removeAll({
      ...state,
      error: true,
      loading: false,
      total: 0
    })
  )
);