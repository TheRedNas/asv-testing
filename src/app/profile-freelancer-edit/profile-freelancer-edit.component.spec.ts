import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFreelancerEditComponent } from './profile-freelancer-edit.component';

describe('ProfileFreelancerEditComponent', () => {
  let component: ProfileFreelancerEditComponent;
  let fixture: ComponentFixture<ProfileFreelancerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFreelancerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFreelancerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
