import { Component, inject, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-get-routes',
  standalone: true,
  imports: [],
  templateUrl: './get-routes.component.html',
  styleUrl: './get-routes.component.css'
})
export class GetRoutesComponent implements OnInit {

  db = inject(DbService);
  clipboard = inject(Clipboard);
  allRoutes = this.db.allRoutes;

  ngOnInit() {
    this.db.fetchAllRoutes()
  }

  clipRoutes(text = "none") {
    this.clipboard.copy(text);
  }


}
