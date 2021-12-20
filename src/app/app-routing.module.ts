import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { MsalGuard } from '@azure/msal-angular'; // Use guard to protect the routes we want.
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCreateComponent } from './post-create/post-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'faq', component: FaqComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'post/create', component: PostCreateComponent, pathMatch: 'full' },
  { path: 'post/:id', component: PostComponent, pathMatch: 'full' },
  { path: 'post/:id/edit', component: PostEditComponent },
  { path: 'profile/c/:id', component: ProfileComponent },
  { path: 'profile/f/:id', component: ProfileComponent },
  { path: 'pnf', component: PageNotFoundComponentComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
