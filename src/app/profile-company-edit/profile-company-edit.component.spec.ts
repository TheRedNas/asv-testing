import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompanyEditComponent } from './profile-company-edit.component';

describe('ProfileCompanyEditComponent', () => {
  let component: ProfileCompanyEditComponent;
  let fixture: ComponentFixture<ProfileCompanyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCompanyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompanyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
