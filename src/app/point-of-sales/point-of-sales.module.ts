import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PointOfSalesComponent} from './point-of-sales.component';
import {HeaderComponent} from '../ui/header/header.component';
import {CartModule} from './cart/cart.module';
import {AppComponent} from '../app.component';
import {GridSystemComponent} from '../ui/grid-system/grid-system.component';
import {GridItemComponent} from '../ui/grid-system/grid-item/grid-item.component';
import { PosClickDirective } from './directives/pos-click.directive';
import {PosService} from './services/pos.service';



@NgModule({
  declarations: [
    PointOfSalesComponent,
    HeaderComponent,
    GridSystemComponent,
    GridItemComponent,
    PosClickDirective
  ],
  imports: [
    CommonModule,
    CartModule
  ],
  exports: [
  ],
  providers: [
    PosService
  ]
})
export class PointOfSalesModule { }
