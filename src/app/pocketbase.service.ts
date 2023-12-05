import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import  PocketBase  from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord } from './shared/pocketbase-types';
import { Observable, distinctUntilChanged, from, map, shareReplay } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  db = new PocketBase('https://blog.teacherjake.com') as TypedPocketBase;
  route = inject(ActivatedRoute);
  
  itemDetails = signal<any>("");
  typeParam = "";
  fetchedResults: any;
  

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(), distinctUntilChanged(), shareReplay(1)).subscribe(params => {
      const typeParam = (params.get('tag')?.valueOf() || 'A1');
      if (this.typeParam != typeParam) {
        this.typeParam = typeParam;
        this.fetchedResults = this.fetchResults(this.typeParam);
      }
    });
   
  }

  fetchResults(type: string = 'A1') {
    console.log('fetching results');
    return from(this.db.collection('lessons').getFullList({
      filter: `tags~'${type}'`
    })).pipe(
      map((res) => res)
    ) as Observable<LessonsResponse[]>;
  }

  async fetchDetails(itemId: string) {
    const res = this.db.collection('lessons')
      .getOne<LessonsResponse>(itemId).then(
         res => this.itemDetails.update(details => details = res as LessonsResponse)
      );
  }
  
  getItemState() {
    return this.itemDetails as WritableSignal<LessonsResponse>;
  }

  async createItem(lesson: LessonsRecord) {
    const record = await this.db.collection('lessons').create(lesson);
    return record;
  }

}
