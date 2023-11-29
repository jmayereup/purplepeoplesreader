import { Injectable, signal } from '@angular/core';

import  PocketBase  from 'pocketbase';
import { INIT_POST_ITEM, PostItem, PostResponseData, Pagination } from './shared/posts';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  pb = new PocketBase('https://blog.teacherjake.com');
  itemDetails = signal<PostItem>(INIT_POST_ITEM);
  
  constructor() {}

  fetchResults() {
    return from(this.pb.collection('posts').getList(1,50)).pipe(
      map((res) => res.items)
    ) as Observable<PostItem[]>;
  }

  fetchDetails(itemId: string) {
    return this.pb.collection('posts').getOne(itemId, { expand: "tags",}).then((res) => this.itemDetails.set(res as PostItem));
  }
  

}
