import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Category } from 'src/models/category-enum';
import { Freelancer } from 'src/models/Freelancer';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create user', () => {
    const id = "TestUserGenerated";
    const user = new Freelancer(id, "", Category.IT, "", "", "", "", "", "", "");
    let result = false;

    result = component.createNewFreelancer(user);
    component.removeFreelancer(user);

    expect(result).toBeTruthy();
  });

});
