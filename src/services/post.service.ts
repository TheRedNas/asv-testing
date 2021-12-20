import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Post } from 'src/models/post';
import { CsudInterface } from '../models/csudinterface';

@Injectable({
  providedIn: 'root'
})
export class PostService implements CsudInterface {

  postUrl = 'assets/searchData.json';
  post: Post[] | undefined;

  constructor(private http: HttpClient) { }
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

  getPosts(amount: number, offset: number, filters:Object): Observable<any> {
    return this.http.get(this.postUrl,{})
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  GetPostById(id: string): void {
    throw new Error('Method not implemented.');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
