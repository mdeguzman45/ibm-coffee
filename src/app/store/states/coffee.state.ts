import { Coffee } from '@models/coffee';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CoffeeState extends EntityState<Coffee> {
  error: boolean;
  loading: boolean;
  total: number;
}

export const coffeeAdapter: EntityAdapter<Coffee> = createEntityAdapter<Coffee>({
  selectId: (coffee: Coffee) => coffee.uid
});

export const initialCoffeeState: CoffeeState = coffeeAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0
});