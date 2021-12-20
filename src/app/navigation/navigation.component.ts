import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  loginDisplay = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribe to isLoggedIn to track if user is logged in or not.
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.loginDisplay = isLoggedIn;
    });
  }

  /**
   * Logs in the user.
   */
  login() {
    this.authService.login();
  }

  /**
   * Logs the user out.
   */
  logout() {
    this.authService.logout();
  }
}
