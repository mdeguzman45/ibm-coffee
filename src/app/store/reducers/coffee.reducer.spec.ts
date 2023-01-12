import { HttpErrorResponse } from "@angular/common/http";
import { mockCoffees } from "@mock-datas/coffee.mock";
import { Coffee } from "@models/coffee";
import { getCoffees, getCoffeesFail, getCoffeesSuccess } from "@store/actions/coffee.actions";
import { CoffeeState, initialCoffeeState } from "../states/coffee.state";
import { coffeeReducer } from "./coffee.reducer";

interface EntityElement {
  id: string;
}

const addElementToEntities = <T extends EntityElement>(payload: T[]): { [id: string]: T } => {
  const reducedEntities = payload.reduce(
    (entities: { [id: string]: T }, element: T) => {
      return {
        ...entities,
        [element.id]: element,
      };
    }, {});

  return reducedEntities;
};

describe('CoffeeReducer', () => {
  let initialState: CoffeeState;
  beforeEach(async () => {
    initialState = initialCoffeeState; 
  });

  it('reducer default state', () => {
    const initialAction = {
      type: 'unknown'
    };

    const state = coffeeReducer(initialState, initialAction);
    expect(state).toBe(initialState);
  });

  it('should load coffee success', () => {
    const getCoffeeSuccessAction = getCoffeesSuccess(mockCoffees);
    const coffeeIds = mockCoffees.map((coffee) => coffee.uid);
    const coffeeEntities = mockCoffees.reduce(
      (entities: { [id: string]: Coffee }, coffee: Coffee) => {
        return {
          ...entities,
          [coffee.uid]: coffee,
        };
      }, {});

    const expectedState = {
      error: false,
      loading: false, 
      total: mockCoffees.length,
      ids: coffeeIds,
      entities: coffeeEntities
    }
    
    const state = coffeeReducer(initialCoffeeState, getCoffeeSuccessAction);
    expect(state).toEqual(expectedState);
    expect(state).not.toBe(expectedState);
  });

  it('should handle failed loading coffees', () => {
    const mockErrorResponse = new HttpErrorResponse({status: 400, statusText: 'Bad Request'});
    const getCoffeesFailAction = getCoffeesFail(mockErrorResponse);
    const expectedState = {
      ids: [],
      entities: {},
      error: true,
      loading: false,
      total: 0
    };

    const state = coffeeReducer(initialCoffeeState, getCoffeesFailAction);
    expect(state).toEqual(expectedState);
  });

});