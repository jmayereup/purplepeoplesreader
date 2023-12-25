import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent {

  store = inject(StoreService);
  routes;
  fetchedRoutes = this.store.lessons.all;
  
  constructor() {
    this.routes = this.store.lessons.all();
  
  }

  fetchAll() {
    this.store.lessons.fetchAllResults();
  }
//fetch routes from pocketbase for prerendering

  

}
