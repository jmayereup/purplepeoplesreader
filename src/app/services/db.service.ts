import { Injectable, signal } from '@angular/core';
import PocketBase from 'pocketbase';
import { TypedPocketBase, LessonsResponse, LessonsRecord, Playlist, LessonsLanguageOptions } from '../shared/pocketbase-types';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = new PocketBase('https://www.purplepeoplesreader.com') as TypedPocketBase;

  allLessons = signal<LessonsResponse[] | null>(null);
  baseUrl = `https://www.purplepeoplesreader.com/`;

  constructor() {
    
   }

  async fetchAllLessons(lang: string = 'English') {
    this.db.collection('lessons').getFullList({
      filter: `language='${lang}' && shareable=true`,
      sort:'-created',
    }).then(
      (res: LessonsResponse[]) => {
        this.allLessons.set(res);
        console.log('lessonlist', res);}
    );

  }

}
