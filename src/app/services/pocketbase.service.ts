import { Injectable, inject, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord } from '../shared/pocketbase-types';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  db = new PocketBase('https://www.purplepeoplesreader.com') as TypedPocketBase;
  route = inject(ActivatedRoute);
  router = inject(Router);

  private itemDetails = signal<LessonsResponse | null>(null);
  private fetchedResults = signal<LessonsResponse[] | null>(null);
  private allResults = signal<LessonsResponse[] | null>(null);
  private userCreatedLessons = signal<LessonsResponse[] | null>(null);

  constructor() {
  }

  async fetchTagResults(type: string = 'A1', lang: string = 'English') {
    console.log('fetching results', type, lang);
    this.db.collection('lessons').getFullList({
      filter: `tags~'${type}' && language='${lang}' && shareable=true`,
    }).then(
      (res: LessonsResponse[]) => {
        this.fetchedResults.set(res);
        return res;
      }
    );
  }

  async fetchAllResults() {
    console.log('fetching results');
    this.db.collection('lessons').getFullList({
      filter: `shareable=true`,
    }).then(
      (res: LessonsResponse[]) => {
        this.allResults.set(res);
        return res;
      }
    );
  }

  async fetchUserCreatedLessons(userId: string) {
    if (!userId) return;
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

  public getAllResults() {
    return this.allResults;
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

  async updateLinesRead(points: number, id: string, currentLinesRead: number) {
    const newTotal = currentLinesRead + points;
    const record = await this.db.collection('users').update(id, { linesRead: newTotal });
    return record;
  }

  async addToPlaylist(id: string, title: string, userId: string, playlist: [{ id: string, title: string, points?: string }] | undefined) {
    if (!playlist){
      const newPlaylist = [{ id: id, title: title }];
      const record = await this.db.collection('users').update(userId, { playlist: newPlaylist });
      return record;
    }
    const newPlaylist = [...playlist, { id: id, title: title }];
    const record = await this.db.collection('users').update(userId, { playlist: newPlaylist });
    return record;
  }

  async removeLessonFromPlaylist(id: string, userId: string, playlist: [{ id: string, title: string, points?: string }] | undefined) {
    if (!playlist) return;
    const newPlaylist = playlist.filter((lesson) => lesson.id !== id);
    const record = await this.db.collection('users').update(userId, { playlist: newPlaylist });
    return record;
  }

}
