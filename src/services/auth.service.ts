import {Inject, Injectable, OnDestroy} from '@angular/core';
import {MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService} from "@azure/msal-angular";
import {AccountInfo, InteractionStatus, RedirectRequest} from "@azure/msal-browser";
import {filter, takeUntil} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly _isLoggedIn: BehaviorSubject<boolean>;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private broadcastService: MsalBroadcastService, private authService: MsalService) {
    this._isLoggedIn = new BehaviorSubject<boolean>(false);

    // Listen to changes for user information.
    this.broadcastService.inProgress$.pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    ).subscribe(() => {
      this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0])
      this.setIsLoggedIn();
    })
  }

  /**
   * Notifies the observable '_isLoggedIn' if a user is logged in or not and sets the user accordingly.
   */
  private setIsLoggedIn() {
    this._isLoggedIn.next(this.authService.instance.getAllAccounts().length > 0);
  }

  /**
   * Redirects the user to the signin/signup page.
   */
  loginUser() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  /**
   * Logs out the user and redirects to the home page.
   */
  logoutUser() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }

  /**
   * @returns {Observable<boolean>} An observable of isLoggedIn.
   */
  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  /**
   * @returns {AccountInfo | null} The active user.
   */
  get user(): AccountInfo | null {
    return this.authService.instance.getActiveAccount();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
