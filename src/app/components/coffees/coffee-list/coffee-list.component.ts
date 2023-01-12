import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GlobalState } from "../../../store/states/global.state";
import { Store, select } from "@ngrx/store";
import { selectAllCoffee, selectCoffeeByUid, selectCoffeeError, selectCoffeeLoading, selectCoffeeTotal } from 'src/app/store/selectors/coffee.selector';
import { getCoffees } from '@store/actions/coffee.actions';
import { Coffee } from '@models/coffee';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CoffeeDetailsComponent } from '../coffee-details/coffee-details.component';

@Component({
  selector: 'coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss']
})
export class CoffeeListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource!: MatTableDataSource<Coffee>;
  public noData: Coffee[] = [<Coffee>{}];
  public displayedColumns: string[] = [
    "blend_name",
    "intensifier",
    // "notes",
    // "origin",
    "variety",
    "operations"
  ];

  public coffeeTotal!: number;
  private subscription: Subscription = new Subscription();
  public loading!: boolean;
  public error$!: Observable<boolean>;

  constructor(
    public store: Store<GlobalState>,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    // subscribe to selectors
    this.store.pipe(select(selectAllCoffee))
      .subscribe((coffees) => this.initializeData(coffees));

    this.store.pipe(select(selectCoffeeTotal))
      .subscribe((total) => (this.coffeeTotal = total));

    this.subscription.add(
      this.store.pipe(select(selectCoffeeLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      })
    );

    this.error$ = this.store.pipe(select(selectCoffeeError));
  }

  ngAfterViewInit(): void {
    this.loadCoffees();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadCoffees(): void {
    this.store.dispatch(getCoffees());
  }

  private initializeData(coffees: Coffee[]): void {
    // console.log(`[initializeData] ${coffees}`);
    this.dataSource = new MatTableDataSource(
      coffees.length ? coffees : this.noData
    );
    this.dataSource.paginator = this.paginator
  }

  showCoffeeDetails(coffee: Coffee) {
  const dialogRef = this.dialog.open(CoffeeDetailsComponent, 
    { data:
      {
        item: coffee,
      }
    });
  }

  public retry(): void {
    this.loadCoffees();
  }
}
