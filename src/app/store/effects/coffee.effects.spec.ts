import { TestBed } from "@angular/core/testing";
import { MockCoffeeService } from "@mock-datas/coffee.service.mock";
import { Action } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { CoffeeService } from "@services/coffee/coffee.service";
import { Observable, of } from "rxjs";
import { GlobalState, initialGlobalState } from "../states/global.state";
import { CoffeeEffects } from "./coffee.effects";
import { getCoffees, getCoffeesSuccess } from "@store/actions/coffee.actions";
import { mockCoffees } from "@mock-datas/coffee.mock";


describe('CoffeeEffect', () => {
  let actions$: Observable<any>;
  let effects: CoffeeEffects;
  let store: MockStore<GlobalState>;
  const initialState: GlobalState = initialGlobalState;
  
  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [
        CoffeeEffects,
        {
          provide: CoffeeService,
          useClass: MockCoffeeService
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState })
      ]
    });

    effects = TestBed.inject(CoffeeEffects);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should handle get coffees success', (done) => {
    actions$ = of(getCoffees)

    effects.loadCoffee$.subscribe(res => {
      expect(res).toEqual(getCoffeesSuccess(mockCoffees));
      done();
    });
  });
});
