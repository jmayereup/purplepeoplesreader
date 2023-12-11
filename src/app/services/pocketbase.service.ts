import { Injectable, inject, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord } from '../shared/pocketbase-types';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  db = new PocketBase('https://blog.teacherjake.com') as TypedPocketBase;
  route = inject(ActivatedRoute);
  router = inject(Router);

  private itemDetails = signal<LessonsResponse | null>(null);
  private fetchedResults = signal<LessonsResponse[] | null>(null);
  private userCreatedLessons = signal<LessonsResponse[] | null>(null);

  constructor() {
  }

  async fetchResults(type: string) {
    console.log('fetching results', type);
    this.db.collection('lessons').getFullList({
      filter: `tags~'${type}' && shareable=true`
    }).then(
      (res: LessonsResponse[]) => {
        this.fetchedResults.set(res);
        return res;
      }
    );
  }

  async fetchUserCreatedLessons(userId: string) {
    console.log('fetching results for', userId);
    await this.db.collection('lessons').getFullList({
      filter: `creatorId='${userId}'`
    }).then(
      res => {
        this.userCreatedLessons.set(res);
        console.log(this.userCreatedLessons());
        return res;
      }
    );
  }

  async fetchDetails(itemId: string) {
    try {
      const res = await this.db.collection('lessons').getOne<LessonsResponse>(itemId);
      this.itemDetails.update(details => details = res as LessonsResponse);
      return this.itemDetails()?.id;
    } catch (error) {
      this.router.navigate(['error'], { queryParams: {}, queryParamsHandling: 'preserve' });
      // Handle the error here, such as logging it or showing an error message to the user
      console.error(error);
      return;
    }
  }


  public getItemDetailsState() {
    return this.itemDetails;
  }

  public getFetchedResults() {
    return this.fetchedResults;
  }

  public getUserCreatedLessons() {
    return this.userCreatedLessons;
  }

  async createItem(lesson: LessonsRecord) {
    const record = await this.db.collection('lessons').create({ ...lesson });
    return record;
  }

  async updateItem(id: string, lesson: LessonsRecord) {
    const record = await this.db.collection('lessons').update(id, { ...lesson });
    return record;
  }

  async deleteItem(id: string) {
    const record = await this.db.collection('lessons').delete(id);
    return record;
  }

}
