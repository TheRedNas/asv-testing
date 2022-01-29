import {Inject, Injectable, OnDestroy} from '@angular/core';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from "@azure/msal-angular";
import {InteractionStatus, RedirectRequest} from "@azure/msal-browser";
import {filter, takeUntil} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {b2cPolicies} from "../app/auth-config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly _accesstokenEndpoint = "https://func-freeboard-westeu-01.azurewebsites.net/api/GetAccessTokenHttpTrigger?code=1/NZSnNIaXbziUXdZCCqYSlJy/IzkjRY65gWHn04gRAe3d8GcxXEaQ==";

  private readonly _isLoggedIn: BehaviorSubject<boolean>;
  private readonly _destroying$ = new Subject<void>();
  private _accessToken: string = "";

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
              private broadcastService: MsalBroadcastService,
              private authService: MsalService,
              private httpClient: HttpClient) {
    this._isLoggedIn = new BehaviorSubject<boolean>(false);

    // Listen to changes for user information.
    this.broadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    ).subscribe(async () => {
      // When the user information is changed, update the active account and check if a user is logged in.
      this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0])
      this.setIsLoggedIn();
      // Request the user's access token.
      await this.requestAccessToken();
    });
  }

  /**
   * Notifies the observable '_isLoggedIn' if a user is logged in or not.
   */
  private setIsLoggedIn() {
    this._isLoggedIn.next(this.authService.instance.getAllAccounts().length > 0);
  }

  /**
   * Executes a user flow from the Azure Active Directory.
   * @param userFlowRequest Redirect request containing information for the to be executed user flow.
   */
  private userFlow(userFlowRequest?: RedirectRequest) {
    if (this.msalGuardConfig.authRequest) {
      // Provide the authentication request from the config, if it exist.
      this.authService.acquireTokenRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest)
        .subscribe(result => console.log(result))
      // this.authService.loginRedirect({...this.msalGuardConfig.authRequest, ...userFlowRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect(userFlowRequest);
    }
  }

  /**
   * Redirects the user to the sign up/sign in page.
   */
  public login() {
    this.userFlow()
  }

  /**
   * Logs out the user and redirects to the home page.
   */
  public logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }

  /**
   * Redirects the user to the page to edit the profile.
   */
  public editProfile() {
    let editProfileFlowRequest = {
      scopes: [],
      authority: b2cPolicies.authorities.editProfile.authority,
    };

    this.userFlow(editProfileFlowRequest);
  }

  /**
   * Redirects the user to the page to reset the password.
   */
  public resetPassword() {
    let resetPasswordFlowRequest = {
      scopes: [],
      authority: b2cPolicies.authorities.resetPassword.authority,
    };

    this.userFlow(resetPasswordFlowRequest);
  }

  /**
   * Requests the access token for the active user.
   * If there is no active user, it will reset the access token.
   * @private
   */
  private async requestAccessToken() {
    if (this._isLoggedIn.value) {
      // If the user is logged in, an access token can be requested.
      // Create the url of the endpoint.
      let _accountId = this.authService.instance.getActiveAccount()?.localAccountId;
      let url = this._accesstokenEndpoint + "&accountId=" + _accountId;

      // Request an access token.
      this._accessToken = await this.httpClient.get(url, {responseType: "text"}).toPromise();
    } else {
      // If the user is not logged in, reset the access token.
      this._accessToken = "";
    }
  }

  /**
   * @returns {string} The access token belonging to the active user. An empty string if there is no active user.
   */
  get accessToken(): string {
    return this._accessToken;
  }

  get accountId(): string | undefined {
    return this.authService.instance.getActiveAccount()?.localAccountId;
  }

  /**
   * @returns {Observable<boolean>} An observable of isLoggedIn.
   */
  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
