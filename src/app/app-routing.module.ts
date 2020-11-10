import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PointOfSalesComponent} from './point-of-sales/point-of-sales.component';


const routes: Routes = [
  { path: '**', redirectTo: 'pos', pathMatch: 'full' },
  { path: 'pos', component: PointOfSalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
