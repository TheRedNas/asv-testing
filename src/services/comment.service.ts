import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/models/Comment';
import {CsudInterface} from "../models/interfaces/CsudInterface";

@Injectable({
  providedIn: 'root'
})
export class CommentService implements CsudInterface {

  comment: Comment[] | undefined;

  constructor() { }
  create(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  show(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  update(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): void {
    throw new Error('Method not implemented.');
  }

  getComments(amount: number, offset: number): void {
    throw new Error('Method not implemented.');
  }

  GetCommentById(id: string): void {
    throw new Error('Method not implemented.');
  }
}
