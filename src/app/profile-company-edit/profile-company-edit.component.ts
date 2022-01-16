import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Company } from 'src/models/Company';
import { UserService } from 'src/services/user.service';
import {User} from "../../models/User";
import {Freelancer} from "../../models/Freelancer";

@Component({
  selector: 'app-profile-company-edit',
  templateUrl: './profile-company-edit.component.html',
  styleUrls: ['./profile-company-edit.component.scss']
})
export class ProfileCompanyEditComponent implements OnInit {
  company!: Company;
  snackbarDurationInSeconds = 5;

  @ViewChild(('name'), {static: false}) name!: ElementRef;
  @ViewChild(('description'), {static: false}) description!: ElementRef;
  @ViewChild(('email'), {static: false}) email!: ElementRef;
  @ViewChild(('phone'), {static: false}) phone!: ElementRef;
  @ViewChild(('address'), {static: false}) address!: ElementRef;

  constructor(private userService: UserService, private _snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.GetUserCompany()
  }

  GetUserCompany() {
    this.userService.getUser(undefined).then((user: User | undefined) => {
      if (user === undefined) this.router.navigate(["home"]);
      else if (user instanceof Freelancer) this.router.navigate(["profile/f"]);
      else this.company = user as Company;
    });
  }

  submitProfile() {
    if(this.name == undefined || this.description == undefined || this.email == undefined ||
        this.phone == undefined || this.address == undefined) {
        this._snackbar.open("Something went wrong, please try again", "close", {duration: this.snackbarDurationInSeconds * 1000});
    } else {
      const editedCompany = new Company(
        this.email.nativeElement.value,
        this.company.profilePicture,
        this.company.category,
        this.name.nativeElement.value,
        this.description.nativeElement.value,
        JSON.stringify(this.company.links),
        this.phone.nativeElement.value,
        this.address.nativeElement.value
      );

      this.userService.updateUser(editedCompany).then(successful => {
        if (successful) {
          this._snackbar.open("Changes saved", "close", {duration: this.snackbarDurationInSeconds * 1000});
          this.router.navigate(["profile/c"]);
        } else {
          this._snackbar.open("Something went wrong, please try again", "close", {duration: this.snackbarDurationInSeconds * 1000});
        }
      });
    }
  }
}
