import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { RolGuard } from './role-guard.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RankingComponent } from './ranking/ranking/ranking.component';
import { GameComponent } from './game/game/game.component';
import { VerifyComponent } from './verify/verify.component';
import { LoggedInGuard } from './loggedin-guard.guard';
import { AboutusComponent } from './aboutus/aboutus.component';

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
    path: 'verify', component: VerifyComponent,
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
    canActivate: [LoggedInGuard, RolGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [LoggedInGuard, RolGuard]
  },
  {
    path: 'woman',
    loadChildren: () => import('./women/women.module').then(m => m.WomenModule),
    canActivate: [LoggedInGuard, RolGuard]
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
  {
    path: 'about', component: AboutusComponent
  },
  {
    path: 'ranking', component: RankingComponent
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
