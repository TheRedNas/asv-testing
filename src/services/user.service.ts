import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Company} from 'src/models/Company';
import {Category} from 'src/models/enums/Category';
import {AuthService} from "./auth.service";
import {Client} from '@microsoft/microsoft-graph-client';
import {GraphAuthProvider} from "../providers/graph-auth-provider";
import {b2cPolicies} from "../app/auth-config";
import {User} from "../models/user";
import {Freelancer} from "../models/Freelancer";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private it: number = 2;
  private healthcare: number = 1;

  private graphClient: Client = Client.initWithMiddleware({
    authProvider: new GraphAuthProvider(this.httpClient)
  });

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }

  // private static graphApiToken: string = "";
  // _headers: HttpHeaders = new HttpHeaders();

  apiUrl: string = 'enter-your-api-url';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  /**
   * Retrieves a user from Graph API.
   * @param accountId The localAccountId of the user to be retrieved; undefined for the active account.
   * @returns Promise<User> A Company if the requested user is a company; A Freelancer if the requested user is a freelancer.
   */
  public async getUser(accountId: string | undefined): Promise<User | undefined> {
    if (accountId === undefined) {
      // If accountId is undefined and user is not logged in, return.
      if (this.authService.accountId === undefined) return undefined;

      // If accountId is undefined and the user is logged in,
      // get the accountId of the active user.
      accountId = this.authService.accountId;
    }

    try {
      // Get the user.
      let graphUser = await this.graphClient
        .api("/users/" + accountId)
        .select(`displayName,mail,givenName,surname,jobTitle,companyName,mobilePhone,streetAddress,${b2cPolicies.extensionPrefix}IsCompany,${b2cPolicies.extensionPrefix}Category,${b2cPolicies.extensionPrefix}Skillset,${b2cPolicies.extensionPrefix}Links,${b2cPolicies.extensionPrefix}ProfilePicture,${b2cPolicies.extensionPrefix}Description`)
        .get();

      let user: User;

      if (graphUser.extension_e3e3770b8d1645428529d235ba3dd302_IsCompany === "true") {
        user = new Company(
          graphUser.mail,
          graphUser.extension_e3e3770b8d1645428529d235ba3dd302_ProfilePicture,
          this.defineCategory(graphUser.extension_e3e3770b8d1645428529d235ba3dd302_Category),
          graphUser.companyName,
          graphUser.extension_e3e3770b8d1645428529d235ba3dd302_Description,
          JSON.parse(graphUser.extension_e3e3770b8d1645428529d235ba3dd302_Links),
          graphUser.mobilePhone,
          graphUser.streetAddress
        );
      } else {
        user = new Freelancer(
          graphUser.mail,
          graphUser.extension_e3e3770b8d1645428529d235ba3dd302_ProfilePicture,
          this.defineCategory(graphUser.extension_e3e3770b8d1645428529d235ba3dd302_Category),
          graphUser.givenName,
          graphUser.surname,
          graphUser.jobTitle,
          JSON.parse(graphUser.extension_e3e3770b8d1645428529d235ba3dd302_Links),
          JSON.parse(graphUser.extension_e3e3770b8d1645428529d235ba3dd302_Skillset),
          graphUser.mobilePhone,
          graphUser.streetAddress,
        );
      }

      return user;
    } catch (Exception) {  }

    return undefined;
  }

  /**
   * Checks if the user has not entered an email address that is already in use.
   * @param emailAddress The email address in question.
   * @returns Promise<boolean> true if the email address is not in use; false if it is.
   */
  public async validateEmailAddress(emailAddress: string) : Promise<boolean> {
    try {
      return await this.graphClient.api("/users")
        .select("displayName")
        .filter(`identities/any(c:c/issuerAssignedId eq '${emailAddress}' and c/issuer eq '${b2cPolicies.issuer}')`)
        .get().then(x => x.value.length == 0);
    } catch (Exception) {  }

    return false;
  }

  /**
   * Signs up the user using Graph API.
   * @param user The object containing the required information to signup the user.
   * @returns Promise<boolean> true if the user has been successfully created; false if it faled.
   */
  public async signupUser(user: object): Promise<boolean> {
    try {
      if (user != null)
        return await this.graphClient.api("/users")
          .create(user)
          .then(x => x != null);
    } catch (Exception) {  }

    return false;
  }

  // Update
  public async updateUser(user: User): Promise<boolean> {
    try {
      // Get the active account's account id.
      // If the account id is undefined, the user is not authorized.
      let accountId = this.authService.accountId;
      if (accountId === undefined) return false;

      let userObject;

      if (user instanceof Company) {
        // If the user is a company, create a company object.
        let company = user;
        userObject = {
          "displayName": company.name,
          "mobilePhone": company.phone,
          "streetAddress": company.address,
          "companyName": company.name,
          "extension_e3e3770b8d1645428529d235ba3dd302_Category": user.category,
          "extension_e3e3770b8d1645428529d235ba3dd302_ProfilePicture": company.profilePicture,
          "extension_e3e3770b8d1645428529d235ba3dd302_Description": company.description,
          "extension_e3e3770b8d1645428529d235ba3dd302_Links": company.links,
        };
      } else {
        // If the user is a freelancer, create a freelancer object.
        let freelancer = user as Freelancer;
        userObject = {
          "displayName": `${freelancer.givenName} ${freelancer.surname}`,
          "mobilePhone": freelancer.phone,
          "streetAddress": freelancer.address,
          "givenName": freelancer.givenName,
          "surname": freelancer.surname,
          "jobTitle": freelancer.jobTitle,
          "extension_e3e3770b8d1645428529d235ba3dd302_Category": freelancer.category,
          "extension_e3e3770b8d1645428529d235ba3dd302_ProfilePicture": freelancer.profilePicture,
          "extension_e3e3770b8d1645428529d235ba3dd302_Links": freelancer.links,
          "extension_e3e3770b8d1645428529d235ba3dd302_Skillset": freelancer.skillset,
        }
      }

      // Update the user.
      await this.graphClient.api(`/users/${accountId}`)
        .update(userObject);

      return true;
    } catch (Exception) {  }

    return false;
  }

  // Read
  showUser() {
    return this.httpClient.get(`${this.apiUrl}`);
  }

  // Delete
  deleteUser(id: string): Observable<any> {
    var API_URL = `${this.apiUrl}/delete-task/${id}`;
    return this.httpClient.delete(API_URL).pipe(
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
    return this.httpClient.get<Company>("./assets/tempDataForCompanyProfile.json");
  }

  getUserFreelancer(): Observable<Freelancer> {
    return this.httpClient.get<Freelancer>("./assets/tempDataForFreelancerProfile.json");
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
