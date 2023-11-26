import { Injectable } from '@angular/core';

import  PocketBase  from 'pocketbase';
import { PostItem, PostResponseData, Pagination } from './shared/posts';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  pb = new PocketBase('https://blog.teacherjake.com');
  
  constructor() {}

  fetchResults() {
    return from(this.pb.collection('posts').getList(1,50)).pipe(
      map((res) => res.items)
    ) as Observable<PostItem[]>;
  }

  fetchDetails(itemId: string) {
    return from(this.pb.collection('posts').getOne(itemId)) as Observable<PostItem>
  }
  

}
