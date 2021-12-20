import { Component, OnInit } from '@angular/core';
import { Company } from 'src/models/Company';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {
  company!: Company;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.GetUserCompany();
  }

  GetUserCompany(): void {
    this.userService.getUserCompany().subscribe(
      (data: Company) => {
        this.company = new Company(data.picture,
                                   this.userService.defineCategory(data.category),
                                   data.name,
                                   data.description,
                                   JSON.parse(data.links),
                                   data.email,
                                   data.phone,
                                   data.address)
      },
    );
  }
}
