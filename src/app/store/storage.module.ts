import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { CoffeeEffects } from "./effects/coffee.effects";
import { reducers } from ".";


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge:25, logOnly: environment.production }),
    EffectsModule.forRoot([CoffeeEffects])
  ],
  providers: [],
  bootstrap: []
})
export class StorageModule { }