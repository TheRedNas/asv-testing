import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Post} from "../models/Post";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchPost : BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {

  }

 public getSearchPost(): Observable<Post> {
    return this.searchPost;
  }

  public setSearchPost(post: Post) {
    this.searchPost.next(post);
  }
}
