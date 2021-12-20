import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancer } from 'src/models/Freelancer';
import { UserService } from 'src/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-freelancer-edit',
  templateUrl: './profile-freelancer-edit.component.html',
  styleUrls: ['./profile-freelancer-edit.component.scss']
})
export class ProfileFreelancerEditComponent implements OnInit {
  freelancer!: Freelancer;
  snackbarDurationInSeconds = 5;
  maxSkillset = 8;

  @ViewChild(('givenName'), {static: false}) givenName!: ElementRef;
  @ViewChild(('surname'), {static: false}) surname!: ElementRef;
  @ViewChild(('title'), {static: false}) title!: ElementRef;
  @ViewChild(('location'), {static: false}) location!: ElementRef;
  @ViewChild(('country'), {static: false}) country!: ElementRef;
  @ViewChild(('email'), {static: false}) email!: ElementRef;
  @ViewChild(('phone'), {static: false}) phone!: ElementRef;

  constructor(private userService: UserService, private router: Router, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUserFreelancer();
  }

  submitProfile() {
    if(this.givenName == undefined || this.surname == undefined || this.title == undefined || 
       this.location == undefined || this.country == undefined || this.email == undefined || this.phone == undefined) {
        this._snackbar.open("Something went wrong, please try again", "close", {duration: this.snackbarDurationInSeconds * 1000});    
    }
    else {
      const tempFreelancer = new Freelancer("../assets/logo/Logo-Pin.png",
                                          this.userService.defineCategory(1),
                                          this.givenName.nativeElement.value,
                                          this.surname.nativeElement.value,
                                          JSON.stringify(this.freelancer.links),
                                          JSON.stringify(this.freelancer.skillset),
                                          this.title.nativeElement.value,
                                          this.email.nativeElement.value,
                                          this.phone.nativeElement.value,
                                          this.location.nativeElement.value,
                                          this.country.nativeElement.value);
    // Send object Freelancer to API here
    this._snackbar.open("Changes saved", "close", {duration: this.snackbarDurationInSeconds * 1000});
    // this.router.navigate(['/profile/f']);
    }
  }

  getUserFreelancer() {
    this.userService.getUserFreelancer().subscribe(
      (data: Freelancer) => {
        this.freelancer = new Freelancer(data.picture,
                                         this.userService.defineCategory(data.category),
                                         data.givenName,
                                         data.surname,
                                         JSON.parse(data.links),
                                         JSON.parse(data.skillset),
                                         data.title,
                                         data.email,
                                         data.phone,
                                         data.location,
                                         data.country)
      },
    );
  }

  addSkillSet() {
    if (Object.keys(this.freelancer.skillset).length < this.maxSkillset) {
      this.freelancer.skillset.push({skill:"Name your skill (I.e. JavaScript)",value:"0"});
    }
    else {
      this._snackbar.open("You can only display 8 of your best skills", "close", {duration: this.snackbarDurationInSeconds * 1000});
    }
  }

  removeSkillset(skillNumber: number) {
    this.freelancer.skillset.splice(skillNumber,1);
  }
}
