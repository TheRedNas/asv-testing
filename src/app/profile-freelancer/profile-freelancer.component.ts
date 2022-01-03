import { Component, OnInit } from '@angular/core';
import { Freelancer } from 'src/models/Freelancer';
import { UserService } from 'src/services/user.service';
import {User} from "../../models/User";
import {Company} from "../../models/Company";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-freelancer',
  templateUrl: './profile-freelancer.component.html',
  styleUrls: ['./profile-freelancer.component.scss']
})
export class ProfileFreelancerComponent implements OnInit {
  freelancer!: Freelancer;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUserFreelancer();
  }

  getUserFreelancer() {
    this.userService.getUser(undefined).then((user: User | undefined) => {
      if (user === undefined) this.router.navigate(["home"]);
      else if (user instanceof Company) this.router.navigate(["profile/c"]);
      else this.freelancer = user as Freelancer;
    });
  }
}
