import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { HomeComponent } from './home/home/home.component';
import { AboutusComponent } from './page-info/aboutus/aboutus.component';
import { FaqsComponent } from './page-info/faqs/faqs.component';
import { PlayComponent } from './play/play/play.component';
import { RolGuard } from './role-guard.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'auth/login', component: LoginComponent,
  },
  {
    path: 'auth/register', component: RegisterComponent,
  },
  {
    path: 'auth/verify', component: VerifyComponent,
  },
  {
    path: 'user',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'country',
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule),
    canActivate: [RolGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [RolGuard]
  },
  {
    path: 'woman',
    loadChildren: () => import('./women/women.module').then(m => m.WomenModule),
    canActivate: [RolGuard]
  },
  {
    path: 'play', component: PlayComponent
  },
  {
    path: 'about', component: AboutusComponent
  },
  {
    path: 'faqs', component: FaqsComponent
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
