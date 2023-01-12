import { CoffeeState, initialCoffeeState } from './coffee.state';

export interface GlobalState {
  coffees: CoffeeState;
}

export const initialGlobalState: GlobalState = {
  coffees: initialCoffeeState
};