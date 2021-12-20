import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Company } from 'src/models/Company';
import { UserService } from 'src/services/user.service';

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
    this.userService.getUserCompany().subscribe(
      (data: Company) => {
        this.company = new Company(data.picture,
                                   this.userService.defineCategory(data.category),
                                   data.name,
                                   data.description,
                                   JSON.parse(data.links),
                                   data.email,
                                   data.phone,
                                   data.address), console.log(data)
      },
    );
    console.log(this.company);
  }

  submitProfile() {
    if(this.name == undefined || this.description == undefined || this.email == undefined || 
       this.phone == undefined || this.address == undefined) {
        this._snackbar.open("Something went wrong, please try again", "close", {duration: this.snackbarDurationInSeconds * 1000});    
    }
    else {
      const tempCompany = new Company("../assets/logo/Logo-Pin.png",
                                      this.userService.defineCategory(1),
                                      this.name.nativeElement.value,
                                      this.description.nativeElement.value,
                                      JSON.stringify(this.company.links),
                                      this.email.nativeElement.value,
                                      this.phone.nativeElement.value,
                                      this.address.nativeElement.value);
    // Send object Freelancer to API here
    this._snackbar.open("Changes saved", "close", {duration: this.snackbarDurationInSeconds * 1000});
    // this.router.navigate(['/profile/f']);
    }
  }
}
