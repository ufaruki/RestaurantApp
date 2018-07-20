import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantService } from './restaurant/restaurant.service';

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'restaurant', component: RestaurantComponent }
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantComponent
  ],    
  providers: [ RestaurantService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
