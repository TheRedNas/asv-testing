import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../models/enums/Category";
import {b2cPolicies} from "../auth-config";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup = new FormGroup({
    isCompany: new FormControl(true, control => control.value),
    emailAddress: new FormControl("", Validators.email),
    password: new FormControl("", Validators.nullValidator),
    confirmedPassword: new FormControl("", Validators.required),
    category: new FormControl(Category[Category.NA]),

    companyForm: new FormGroup({
      companyName: new FormControl("", Validators.nullValidator)
    }),

    freelancerForm: new FormGroup({
      firstName: new FormControl("", Validators.nullValidator),
      lastName: new FormControl("", Validators.nullValidator),
      jobTitle: new FormControl("", Validators.nullValidator)
    })
  });

  public categories = Object.keys(Category);
  public emailInUse: boolean = false;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    // Reroute to home if the user is logged in.
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) this.router.navigate(["home"])
    });

    // Remove the indices.
    this.categories.splice(0, this.categories.length / 2);

    // Check if the confirmed password is equal to the password.
    this.signupForm.get("confirmedPassword")?.valueChanges.subscribe(x => {
      let error = null;
      if (x !== this.signupForm.get("password")?.value) {
        error = {"incorrect": true};
      }

      this.signupForm.get("confirmedPassword")?.setErrors(error);
    });
  }

  /**
   * Signs up the user with the given information.
   */
  public async onSubmit() {
    if (this.validateForm()) {
      // If the form is valid, check if the email address is valid.
      if (!(await this.userService.validateEmailAddress(this.signupForm.get("emailAddress")?.value))) {
        this.emailInUse = true;
        return;
      } else this.emailInUse = false;

      try {
        // Create the user object.
        let user = this.createUserObject();
        if (await this.userService.signupUser(user)) {
          // If the user is successfully created, navigate to login page.
          this.authService.login();
        }
      } catch (Exception) {  }
    }
  }

  /**
   * Checks if the form is valid.
   * @returns boolean true if the form is valid; else false.
   */
  public validateForm(): boolean | undefined {
    return this.signupForm.get("emailAddress")?.valid &&
      this.signupForm.get("password")?.valid &&
      this.signupForm.get("confirmedPassword")?.valid &&
      ((this.signupForm.get("isCompany")?.value &&
          this.signupForm.get("companyForm")?.get("companyName")?.valid) ||
        !this.signupForm.get("isCompany")?.value &&
          this.signupForm.get("freelancerForm")?.get("firstName")?.valid &&
          this.signupForm.get("freelancerForm")?.get("lastName")?.valid)
  }

  /**
   * Craetes a user object based on the requirements for Graph API.
   * @returns object A custom user object to be signed up.
   */
  private createUserObject(): object {
    let isCompany: boolean = this.signupForm.controls.isCompany?.value;
    // Set the display name.
    // If user is a company: displayName = {companyName}
    // If user is a freelancer: displayName = {firstName} {lastName}
    let displayName = isCompany ?
      this.signupForm.controls.companyForm.get("companyName")?.value :
      this.signupForm.controls.freelancerForm.get("firstName")?.value + " " + this.signupForm.controls.freelancerForm.get("lastName")?.value;

    // Create the user object.
    return {
      "AccountEnabled": true,
      "creationType": "LocalAccount",
      "displayName": displayName,
      "mail": this.signupForm.controls.emailAddress?.value,
      "identities": [
        {
          "signInType": "emailAddress",
          "issuer": b2cPolicies.issuer,
          "issuerAssignedId": this.signupForm.controls.emailAddress?.value
        }
      ],
      "passwordProfile" : {
        "forceChangePasswordNextSignIn": false,
        "password": this.signupForm.controls.password?.value
      },
      "extension_e3e3770b8d1645428529d235ba3dd302_IsCompany": isCompany.toString(),
      "extension_e3e3770b8d1645428529d235ba3dd302_Category": Category[this.signupForm.controls.category?.value],
      "extension_e3e3770b8d1645428529d235ba3dd302_ProfilePicture": "../assets/logo/Logo-Pin.png",
      "extension_e3e3770b8d1645428529d235ba3dd302_Links": "[]",
      "extension_e3e3770b8d1645428529d235ba3dd302_Skillset": isCompany ? null : "[]",
      "givenName": isCompany ? null : this.signupForm.controls.freelancerForm.get("firstName")?.value,
      "surname": isCompany ? null : this.signupForm.controls.freelancerForm.get("lastName")?.value,
      "jobTitle": isCompany ? null : this.signupForm.controls.freelancerForm.get("jobTitle")?.value,
      "companyName": isCompany ? this.signupForm.controls.companyForm.get("companyName")?.value : null
    }
  }
}
