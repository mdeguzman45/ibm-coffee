import { mockCoffee, mockCoffees } from "@mock-datas/coffee.mock";
import { Coffee } from "@models/coffee";
import { selectAllCoffee, selectCoffeeByUid, selectCoffeeEntities, selectCoffeeError, selectCoffeeIds, selectCoffeeLoading, selectCoffeesState, selectCoffeeTotal } from "./coffee.selector";

const coffeeIds = mockCoffees.map((coffee) => coffee.uid);
const coffeeEntities = mockCoffees.reduce(
  (entities: { [id: string]: Coffee }, coffee: Coffee) => {
    return {
      ...entities,
      [coffee.uid]: coffee,
    };
  }, {});

// for now lets just test the loaded successful
const loadedState = {
  error: false,
  loading: false, 
  total: mockCoffees.length,
  ids: coffeeIds,
  entities: coffeeEntities
}

describe('selectAllCoffee selector', () => {
  it('should return coffees section from state', () => {
    const coffees = selectAllCoffee.projector(loadedState);
    expect(coffees.length).toEqual(5);
  });
});

describe('selectCoffeeEntities selector', () => {
  it('should return coffee entities section from state', () => {
    const coffeeEntitiesResult = selectCoffeeEntities.projector(loadedState);
    expect(coffeeEntitiesResult).toEqual(coffeeEntities);
  });
});

describe('selectCoffeeIds selector', () => {
  it('should return coffee uids section from state', () => {
    const coffeeUidsResult = selectCoffeeIds.projector(loadedState);
    expect(coffeeUidsResult).toEqual(coffeeIds);
  });
});

describe('selectCoffeeByUid selector', () => {
  it('should return a coffee by uid section from state', () => {
    const coffee = selectCoffeeByUid('3bc5c688-9870-4624-85a9-7d7042ca644b').projector(coffeeEntities);
    expect(coffee).toEqual(mockCoffee);
  });
});

describe('selectCoffeeError selector', () => {
  it('should return error state section from state', () => {
    const errorResult = selectCoffeeError.projector(loadedState);
    expect(errorResult).toEqual(false);
  });
});

describe('selectCoffeeLoading selector', () => {
  it('should return loading state section from state', () => {
    const loadingResult = selectCoffeeLoading.projector(loadedState);
    expect(loadingResult).toEqual(false);
  });
});

describe('selectCoffeeTotal selector', () => {
  it('should return total state section from state', () => {
    const totalResult = selectCoffeeTotal.projector(loadedState);
    expect(totalResult).toEqual(mockCoffees.length);
  });
});
