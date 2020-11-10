import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from './cart.component';
import { ProductComponent } from './product/product.component';
import {MatButtonModule, MatIconModule, MatTableModule} from '@angular/material';



@NgModule({
  declarations: [
    CartComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [
    CartComponent
  ]
})
export class CartModule { }
