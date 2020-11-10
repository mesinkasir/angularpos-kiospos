import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PointOfSalesModule} from './point-of-sales/point-of-sales.module';
import {TimeService} from './services/time.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    PointOfSalesModule
  ],
  providers: [TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
