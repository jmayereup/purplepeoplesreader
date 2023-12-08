import { Injectable, inject } from '@angular/core';
import { PocketbaseService } from './pocketbase.service';
import { AuthService } from './auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, shareReplay } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  db = inject(PocketbaseService);
  auth = inject(AuthService);
  // speak = inject(SpeakService);
  route = inject(ActivatedRoute);

  lessons = {
    results: this.db.getFetchedResults(),
    details: this.db.getItemDetailsState(),
    create: this.db.createItem,
    edit: this.db.updateItem,
    fetchTagResults: (tag: string) => this.db.fetchResults(tag),
    fetchDetails: this.db.fetchDetails
  }

   app = {
    showEdit: false,
    tag: ""
  }

  constructor() {

    this.route.queryParamMap.pipe(takeUntilDestroyed(), distinctUntilChanged(), shareReplay(1)).subscribe(params => {
      const tagParam = (params.get('tag')?.valueOf() || 'A1');
      const editValue = params.get('edit')?.valueOf();
      editValue === 'true' ? this.app.showEdit = true : this.app.showEdit = false;
      if (this.app.tag != tagParam) {
        this.app.tag = tagParam;
        this.lessons.fetchTagResults(this.app.tag || "A1");
      }
    });
 
   }


}
