import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsalModule, MsalInterceptor, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalGuard, MsalBroadcastService, MsalInterceptorConfiguration, MsalGuardConfiguration } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { Category } from 'src/models/category-enum';
import { Freelancer } from 'src/models/Freelancer';
import { Comment } from 'src/models/comment';
import { msalConfig, protectedResources, loginRequest } from '../auth-config';
import { PostComponent } from './post.component';
import { Company } from 'src/models/Company';
import { Post } from 'src/models/post';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
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
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply to job post', () => {
    const id = "TestUserGenerated";
    const freelancer = new Freelancer(id, "", Category.IT, "", "", "", "", "", "", "");
    const company = new Company("","",Category.IT,"","","","","");
    const highlights: string[] = [];
    const content = "javascript:alert(‘Executed!’);";
    const post = new Post(company, "", "", content, highlights);
    let result = false;
 
    component.createPost(post, company);
    result = component.applyToPost(post, freelancer);
    component.removeApplyToPost(post, freelancer);
 
    expect(result).toBeTruthy();
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