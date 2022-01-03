import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancer } from 'src/models/Freelancer';
import { UserService } from 'src/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from "../../models/User";
import {Company} from "../../models/Company";

@Component({
  selector: 'app-profile-freelancer-edit',
  templateUrl: './profile-freelancer-edit.component.html',
  styleUrls: ['./profile-freelancer-edit.component.scss']
})
export class ProfileFreelancerEditComponent implements OnInit {
  freelancer!: Freelancer;
  snackbarDurationInSeconds = 5;
  maxSkillset = 8;
  private templateLinks = "[{\"source\": \"twitter\",\"value\": \"twitterlinkhere\",\"icon\": \"bi-twitter\",\"active\": \"true\"}," +
                        + "{\"source\": \"github\",\"value\": \"githublinkhere\",\"icon\": \"bi-github\",\"active\": \"false\"}," +
                        + "{\"source\": \"instagram\",\"value\": \"instagramlinkhere\",\"icon\": \"bi-instagram\",\"active\": \"false\"}," +
                        + "{\"source\": \"facebook\",\"value\": \"facebooklinkhere\",\"icon\": \"bi-facebook\",\"active\": \"false\"}," +
                        + "{\"source\": \"website\",\"value\": \"websitelinkhere\",\"icon\": \"bi-globe\",\"active\": \"true\"}]";

  @ViewChild(('givenName'), {static: false}) givenName!: ElementRef;
  @ViewChild(('surname'), {static: false}) surname!: ElementRef;
  @ViewChild(('title'), {static: false}) title!: ElementRef;
  @ViewChild(('address'), {static: false}) address!: ElementRef;
  @ViewChild(('email'), {static: false}) email!: ElementRef;
  @ViewChild(('phone'), {static: false}) phone!: ElementRef;

  constructor(private userService: UserService, private router: Router, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUserFreelancer();
  }

  submitProfile() {
    if(this.givenName == undefined || this.surname == undefined || this.title == undefined ||
       this.address == undefined || this.email == undefined || this.phone == undefined) {
        this._snackbar.open("Something went wrong, please try again", "close", {duration: this.snackbarDurationInSeconds * 1000});
    } else {
      const editedFreelancer = new Freelancer(
        this.email.nativeElement.value,
        this.freelancer.profilePicture,
        this.freelancer.category,
        this.givenName.nativeElement.value,
        this.surname.nativeElement.value,
        this.title.nativeElement.value,
        JSON.stringify(this.freelancer.links),
        JSON.stringify(this.freelancer.skillset),
        this.phone.nativeElement.value,
        this.address.nativeElement.value,
      );

      this.userService.updateUser(editedFreelancer).then(successful => {
        if (successful) {
          this._snackbar.open("Changes saved", "close", {duration: this.snackbarDurationInSeconds * 1000});
          this.router.navigate(["profile/f"]);
        } else {
          this._snackbar.open("Something went wrong, please try again", "close", {duration: this.snackbarDurationInSeconds * 1000});
        }
      });
    }
  }

  getUserFreelancer() {
    this.userService.getUser(undefined).then((user: User | undefined) => {
      if (user === undefined) this.router.navigate(["home"]);
      else if (user instanceof Company) this.router.navigate(["profile/c"]);
      else this.freelancer = user as Freelancer;
      if (this.freelancer.links == "") this.freelancer.links = this.templateLinks;
    });
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
