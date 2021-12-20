import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Company } from 'src/models/Company';
import { Category } from 'src/models/enums/Category';
import { Freelancer } from 'src/models/Freelancer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private it: number = 1;
  private healthcare: number = 2;

  constructor(private http: HttpClient) { }

  apiUrl: string = 'enter-your-api-url';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // Create
  createUser(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/create-task`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

  // Read
  showUser() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Update
  updateUser(id: string, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update-task/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.error)
    )
  }

  // Delete
  deleteUser(id: string): Observable<any> {
    var API_URL = `${this.apiUrl}/delete-task/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.error)
    )
  }

  // Handle Errors 
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getUserCompany(): Observable<Company> {
    return this.http.get<Company>("./assets/tempDataForCompanyProfile.json");
  }

  getUserFreelancer(): Observable<Freelancer> {
    return this.http.get<Freelancer>("./assets/tempDataForFreelancerProfile.json");
  }

  postUserFreelancer(freelancer: Freelancer): never {
    throw new Error("Not implemeted yet, needs to be connected to non-localhost server apparently");
  }
  
  public defineCategory(category: number): Category {
    switch (category) {
      case this.it: {
        return Category.IT;
      }
      case this.healthcare: {
        return Category.Healthcare;
      }
      default: {
        return Category.NA;
      }
    }
  }
}
