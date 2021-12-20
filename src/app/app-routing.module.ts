import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { ProfileFreelancerComponent } from './profile-freelancer/profile-freelancer.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { MsalGuard } from '@azure/msal-angular'; // Use guard to protect the routes we want.
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ProfileCompanyEditComponent } from './profile-company-edit/profile-company-edit.component';
import { ProfileFreelancerEditComponent } from './profile-freelancer-edit/profile-freelancer-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'faq', component: FaqComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'post/create', component: PostCreateComponent, pathMatch: 'full' },
  { path: 'post/:id', component: PostComponent, pathMatch: 'full' },
  { path: 'post/:id/edit', component: PostEditComponent },
  { path: 'profile/c', component: ProfileCompanyComponent },
  { path: 'profile/c/edit', component: ProfileCompanyEditComponent },
  { path: 'profile/f', component: ProfileFreelancerComponent },
  { path: 'profile/f/edit', component: ProfileFreelancerEditComponent },
  { path: 'pnf', component: PageNotFoundComponentComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
