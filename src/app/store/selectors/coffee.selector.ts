import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoffeeState, coffeeAdapter } from '../states/coffee.state';

export const {
  selectIds: _selectCoffeeDataIds,
  selectEntities: _selectCoffeeEntities,
  selectAll: _selectAllCoffee,
  selectTotal: _selectCoffeeTotal
} = coffeeAdapter.getSelectors();

export const selectCoffeesState = createFeatureSelector<CoffeeState>('coffees');

export const selectCoffeeIds = createSelector(
  selectCoffeesState,
  _selectCoffeeDataIds
);

export const selectCoffeeEntities = createSelector(
  selectCoffeesState,
  _selectCoffeeEntities
);

export const selectCoffeeByUid = (uid: string) => createSelector(
  selectCoffeeEntities,
  coffees => coffees[uid]
);

export const selectAllCoffee = createSelector(
  selectCoffeesState,
  _selectAllCoffee
);

export const selectCoffeeError = createSelector(
  selectCoffeesState,
  (state: CoffeeState): boolean => state.error
);

export const selectCoffeeLoading = createSelector(
  selectCoffeesState,
  (state: CoffeeState): boolean => state.loading
);


export const selectCoffeeTotal = createSelector(
  selectCoffeesState,
  (state: CoffeeState): number => state.total
);