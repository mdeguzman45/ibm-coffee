import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CoffeeListComponent } from './coffee-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockCoffees } from '@mock-datas/coffee.mock';
import { GlobalState, initialGlobalState } from 'src/app/store/states/global.state';
import { Coffee } from '@models/coffee';
import { selectAllCoffee, selectCoffeeError, selectCoffeeLoading, selectCoffeeTotal } from 'src/app/store/selectors/coffee.selector';
import { CoffeeState } from 'src/app/store/states/coffee.state';
import { MemoizedSelector } from '@ngrx/store';
import { CoffeeActionType, getCoffees } from '@store/actions/coffee.actions';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoffeeDetailsComponent } from '../coffee-details/coffee-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  coffees: {
  error: false,
  loading: false, 
  total: mockCoffees.length,
  ids: coffeeIds,
  entities: coffeeEntities
}};

describe('CoffeeListComponent', () => {
  let component: CoffeeListComponent;
  let fixture: ComponentFixture<CoffeeListComponent>;
  let store: MockStore<GlobalState>;
  const initialState: GlobalState = initialGlobalState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeListComponent, CoffeeDetailsComponent ],
      imports: [
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule
      ],
      providers: [
        provideMockStore({
          initialState: loadedState,
          selectors: [
            { selector: selectAllCoffee, value: mockCoffees },
            { selector: selectCoffeeError, value: false },
            { selector: selectCoffeeLoading, value: false },
            { selector: selectCoffeeTotal, value: mockCoffees.length }
          ]
        }),
        FormBuilder
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callFake(() => {});
    spyOn(store, 'select').and.callThrough();
    fixture = TestBed.createComponent(CoffeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 rows of coffees', fakeAsync(() => {
    const expectedAction = { type: CoffeeActionType.GET_COFFEES };

    component.ngAfterViewInit();
    fixture.detectChanges();
   
    tick(); // flush the observables
    const coffeeListHtml: HTMLElement = fixture.debugElement.nativeElement;
    let coffeeRows = coffeeListHtml.querySelectorAll('mat-row');

    expect(coffeeRows.length).toEqual(5);
  }));

  it('should open a modal for coffee details', () => {
    const coffeeListHtml: HTMLElement = fixture.debugElement.nativeElement;
    let coffeeRows = coffeeListHtml.querySelectorAll('mat-row');

    const firstRow = coffeeRows[0];
    const rowOperationButtons = firstRow.querySelectorAll('button');
    expect(rowOperationButtons.length).toEqual(1);

    const viewCoffeeDetailsButton = rowOperationButtons[0];
    viewCoffeeDetailsButton.click();

    fixture.detectChanges();
    const modalDialog = document.getElementsByTagName('mat-dialog-container')[0];
    expect(modalDialog).toBeTruthy();
  });
});
