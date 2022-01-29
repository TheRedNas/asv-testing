import 'froala-editor/js/plugins.pkgd.min.js'; // Do not touch, somehow works this way
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaqComponent } from './faq/faq.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PostComponent } from './post/post.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { HomeComponent } from './home/home.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ProfileFreelancerComponent } from './profile-freelancer/profile-freelancer.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { ProfileCompanyEditComponent } from './profile-company-edit/profile-company-edit.component';
import { ProfileFreelancerEditComponent } from './profile-freelancer-edit/profile-freelancer-edit.component';

import { PostService } from 'src/services/post.service';
import { UserService } from 'src/services/user.service';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
// Import the Azure AD B2C configuration
import {msalConfig, protectedResources} from './auth-config';
// Import the Angular HTTP interceptor.
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


// -----------    Material Imports    -----------
//import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MatRadioModule } from "@angular/material/radio";
import { MaterialModule } from './material/material.module';

const materialModules = [
  MaterialModule
];

const froala = [
  FontAwesomeModule,
  FroalaEditorModule.forRoot(),
  FroalaViewModule.forRoot()
]

@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    SearchComponent,
    FooterComponent,
    AboutComponent,
    ProfileFreelancerComponent,
    NavigationComponent,
    PostComponent,
    PageNotFoundComponentComponent,
    HomeComponent,
    FaqComponent,
    PostCreateComponent,
    ProfileCompanyComponent,
    ProfileCompanyEditComponent,
    ProfileFreelancerEditComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    materialModules,
    froala,
    // Import the HTTP client.
    HttpClientModule,

    // Initiate the MSAL library with the MSAL configuration object
    MsalModule.forRoot(new PublicClientApplication(msalConfig),
      {
        // The routing guard configuration.
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: protectedResources.freeboardApi.scopes
        }
      },
      {
        // MSAL interceptor configuration.
        // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
        interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
        protectedResourceMap: new Map([
          [protectedResources.freeboardApi.endpoint, protectedResources.freeboardApi.scopes]
        ])
      }),
    MatRadioModule,
    MaterialModule
  ],
  providers: [
    DatePipe,
    PostService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [
    AppComponent,
    MsalRedirectComponent
  ]
})
export class AppModule {
}
