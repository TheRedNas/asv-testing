import { Component, OnInit } from '@angular/core';
import { Freelancer } from 'src/models/Freelancer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public createNewFreelancer(user: Freelancer) {
    return true;
  }
}
