import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsalModule, MsalInterceptor, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalGuard, MsalBroadcastService, MsalInterceptorConfiguration, MsalGuardConfiguration } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { Category } from 'src/models/category-enum';
import { Company } from 'src/models/Company';
import { Post } from 'src/models/post';
import { msalConfig, protectedResources, loginRequest } from '../auth-config';

import { SearchComponent } from './search.component';

describe('ProfileFreelancerComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ HttpClientTestingModule, MsalModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MsalInterceptor,
          multi: true
        },
        {
          provide: MSAL_INSTANCE,
          useFactory: MSALInstanceFactory
        },
        {
          provide: MSAL_GUARD_CONFIG,
          useFactory: MSALGuardConfigFactory
        },
        {
          provide: MSAL_INTERCEPTOR_CONFIG,
          useFactory: MSALInterceptorConfigFactory
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct searchresult', () => {
    let expectedResult: Post[] = [];
    expectedResult.push(new Post(new Company("","",Category.IT,"","","","",""), "Test post", "Test content", "", []));
    const searchterm = "Test post";
    const filter: string[] = ["testPost"];
    const resultsPerPage: number = 1;
    const offset: number = 1;
    let result: Post[];

    result = component.getPosts(searchterm, filter, resultsPerPage, offset);

    expect(result).toEqual(expectedResult);
  });

});

/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
 export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * MSAL Angular will automatically retrieve tokens for resources 
 * added to protectedResourceMap. For more info, visit: 
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
 export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set(protectedResources.freeboardApi.endpoint, protectedResources.freeboardApi.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
 export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  };
}