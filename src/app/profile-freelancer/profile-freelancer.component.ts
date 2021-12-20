import { Component, OnInit } from '@angular/core';
import { Freelancer } from 'src/models/Freelancer';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile-freelancer',
  templateUrl: './profile-freelancer.component.html',
  styleUrls: ['./profile-freelancer.component.scss']
})
export class ProfileFreelancerComponent implements OnInit {
  freelancer!: Freelancer;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserFreelancer();
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
}
