import { Component, ViewChild, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

import { Restaurant } from './restaurant.model';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  private cuisines: string [] = [ "Select Cuisine", "Desi", "Continental", "Chinese", "Thai" ];
  private restaurant: Restaurant = new Restaurant("", "", this.cuisines[0], "");
  private submitted = false;
  private rowData: Restaurant[];  

  @ViewChild('agGrid') agGrid: AgGridModule;

  private columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Cuisine', field: 'cuisine' },
    { headerName: 'Address', field: 'address' }
  ];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {

  }  

  onSubmit() {
    this.submitted = true;
    this.restaurantService.saveRestaurant(this.restaurant)
    .subscribe(restaurant => {       
      this.agGrid.api.updateRowData({ add: [this.restaurant] });     
    });
  }

  onGridReady(params) {
    this.agGrid.api = params.api;    
    this.restaurantService.getRestaurants()
    .subscribe(restaurants => params.api.setRowData(restaurants));      
  }
}
