import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import PocketBase from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord } from './shared/pocketbase-types';
import { Observable, distinctUntilChanged, from, map, shareReplay, startWith } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  db = new PocketBase('https://blog.teacherjake.com') as TypedPocketBase;
  route = inject(ActivatedRoute);
  router = inject(Router);

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
    try {
      console.log('fetching results');
      return from(this.db.collection('lessons').getFullList({
        filter: `tags~'${type}'`
      })).pipe(
        map((res) => res),
        shareReplay(1)
      ) as Observable<LessonsResponse[]>;
    } catch (error: any) {
      console.log(error.response.message);
      return;
    }
  }

  async fetchDetails(itemId: string): Promise<void> {
    try {
      const res = await this.db.collection('lessons').getOne<LessonsResponse>(itemId);
      this.itemDetails.update(details => details = res as LessonsResponse);
    } catch (error) {
      this.router.navigate(['error'], { queryParams: {}, queryParamsHandling: 'preserve' });
      // Handle the error here, such as logging it or showing an error message to the user
      console.error(error);
    }
  }


  getItemState() {
    return this.itemDetails as WritableSignal<LessonsResponse>;
  }

  async createItem(lesson: LessonsRecord) {
    const record = await this.db.collection('lessons').create(lesson);
    return record;
  }

  async updateItem(id: string, lesson: LessonsRecord) {
    const record = await this.db.collection('lessons').update(id, { ...lesson });
    return record;
  }

}
