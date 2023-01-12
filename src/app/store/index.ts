import { ActionReducerMap } from '@ngrx/store';
import { coffeeReducer } from './reducers/coffee.reducer';
import { GlobalState } from './states/global.state';

export const reducers: ActionReducerMap<GlobalState> = {
  coffees: coffeeReducer
};