import { Component, OnInit } from '@angular/core';
import { Company } from 'src/models/Company';
import { UserService } from 'src/services/user.service';
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {Freelancer} from "../../models/Freelancer";

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {
  company!: Company;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.GetUserCompany();
  }

  GetUserCompany(): void {
    this.userService.getUser(undefined).then((user: User | undefined) => {
      if (user === undefined) this.router.navigate(["home"]);
      else if (user instanceof Freelancer) this.router.navigate(["profile/f"]);
      else this.company = user as Company;
    });
  }
}
