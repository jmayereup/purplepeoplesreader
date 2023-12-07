import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import PocketBase from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord, LessonsLanguageOptions } from './shared/pocketbase-types';
import { Observable, ObservableInput, distinctUntilChanged, from, map, shareReplay, startWith } from 'rxjs';
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
  showEdit = false;
  fetchedResults = signal<LessonsResponse[] | null>(null);
  
  // ([{title: "none", content: "none", shareable: false, imageUrl: "", creatorEmail: "",
  //   tags: [], language: LessonsLanguageOptions.English, vocabulary: ""}]);


  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(), distinctUntilChanged(), shareReplay(1)).subscribe(params => {
      const typeParam = (params.get('tag')?.valueOf() || 'A1');
      const editValue = params.get('edit')?.valueOf();
      editValue === 'true' ? this.showEdit = true : this.showEdit = false;
      if (this.typeParam != typeParam) {
        this.typeParam = typeParam;
        this.fetchResults(this.typeParam);
      }
    });

  }

  async fetchResults(type: string = 'A1') {
    try {
      console.log('fetching results');
      let results: LessonsResponse[];
      this.db.collection('lessons').getFullList({
        filter: `tags~'${type}'`
      }).then(
        res => {
          this.fetchedResults.set(res);
          return;
        }
      );
      return;
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

  async createItem(lesson: LessonsRecord, creatorID: string) {
    const record = await this.db.collection('lessons').create({...lesson, 'creatorId': creatorID});
    return record;
  }

  async updateItem(id: string, lesson: LessonsRecord, creatorID: string) {
    const record = await this.db.collection('lessons').update(id, { ...lesson, 'creatorId': creatorID });
    return record;
  }

}
