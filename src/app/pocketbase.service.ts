import { Injectable, signal } from '@angular/core';

import  PocketBase  from 'pocketbase';
import { TypedPocketBase, LessonsResponse } from './shared/pocketbase-types';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  pb = new PocketBase('https://blog.teacherjake.com') as TypedPocketBase;
  itemDetails = signal<any>("");
  
  constructor() {
    
  }

  fetchResults() {
    return from(this.pb.collection('lessons').getList(1,50)).pipe(
      map((res) => res.items)
    ) as Observable<LessonsResponse[]>;
  }

  async fetchDetails(itemId: string) {
    const res = this.pb.collection('lessons')
      .getOne<LessonsResponse>(itemId).then(
         res => this.itemDetails.update(details => details = res as LessonsResponse)
      );
  }
  

}
