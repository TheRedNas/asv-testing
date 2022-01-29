import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Post} from 'src/models/post';
import {CsudInterface} from "../models/interfaces/CsudInterface";

@Injectable({
  providedIn: 'root'
})
export class PostService implements CsudInterface {

  private readonly createPostURI = "https://func-freeboard-westeu-01.azurewebsites.net/api/CreatePostHttpTrigger?code=ov8hB894kGXPYJEh/lpVTYhUf2mUJHBVZCNg2YolpAFOgbKt67zeZA==";
  private readonly getPostsURI = "https://func-freeboard-westeu-01.azurewebsites.net/api/GetPostsHttpTrigger?code=j5gxigUIzRnDveJyZhcccBzrwOof0zI/OxrRUymzQZmtuffXRlfQxg==";
  private readonly searchPostsURI = "https://func-freeboard-westeu-01.azurewebsites.net/api/SearchPostHttpTrigger?code=A4YlrQVP6JiX2VhyDfFuw3cE5DIBcurjyEFVoWlEUImO80UNaaijbA==";
  private readonly getPostByIdURI = "https://func-freeboard-westeu-01.azurewebsites.net/api/GetPostHttpTrigger?code=I8umnZWAUIEcfsd4qGkHk48uIHassj8D7Vi8JV/7G1DXVObgau335A=="
  private _success: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  localhostURL = "http://localhost:7071/api/";
  postUrl = 'assets/searchData.json';

  constructor(private http: HttpClient) {

  }

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

  getPosts(amount: number, offset: number, filters: Object): Observable<any> {
    return this.http.get(this.getPostsURI, {})
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  public getPostsFromAzure(queryParams?: any): Observable<Post[]> {
    let appendix = '&';
    if (queryParams) appendix += this.serialize(queryParams)
    
    return this.http.get<Post[]>(this.getPostsURI+appendix)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public searchPostsFromAzure(queryParams?: any): Observable<Post[]> {
    let appendix = '&';
    if (queryParams) appendix += this.serialize(queryParams)
    
    return  this.http.get<Post[]>(this.searchPostsURI+appendix)
    .pipe(
      retry(2),
      catchError((err: HttpErrorResponse) => {
        return this.getPostsFromAzure()
      }),
    );
  }

  public getPostByIdFromAzure(queryParams: any): Observable<Post> {
    let appendix = '&';
    if (queryParams) appendix += this.serialize(queryParams)
    
    return  this.http.get<Post>(this.getPostByIdURI+appendix)
    .pipe(
      retry(2),
      catchError(this.handleError),
    );
  }

  public createPost(post: Post, accessToken: string, accountId?: string,) {
    this.http.post(`${this.createPostURI}&accountId=${accountId}`, JSON.stringify(post), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`
      })
    })
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
        }, () => {
          this._success.next(true);
        }
      );
  }

  serialize = function(obj: any) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  public getPost(rowKey: string, partitionKey: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.localhostURL + 'GetPostHttpTrigger');
  }

  public getPostbyUser(accountId: string): Observable<Post> {
    return this.http.get<Post>(`${this.localhostURL}GetPostsByUserHttpTrigger?accountId=${accountId}`);
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

  public getSucces() {
    return this._success
  }

}
