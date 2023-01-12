import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeDetailsComponent } from './components/coffees/coffee-details/coffee-details.component';
import { CoffeeListComponent } from './components/coffees/coffee-list/coffee-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'coffees', pathMatch: 'full' },
  { path: 'coffees', component: CoffeeListComponent },
  { path: 'detail/:id', component: CoffeeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
