import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HomeModule } from './home/home.module';
import { AboutusComponent } from './page-info/aboutus/aboutus.component';
import { RolGuard } from './role-guard.guard';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { RankingModule } from './ranking/ranking.module';
import { CategoriesModule } from './categories/categories.module';
import { CountriesModule } from './countries/countries.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { WomenModule } from './women/women.module';
import { GameModule } from './game/game.module';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerifyComponent } from './verify/verify.component';
import { LoggedInGuard } from './loggedin-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    AuthModule,
    RankingModule,
    CategoriesModule,
    CountriesModule,
    QuestionsModule,
    UsersModule,
    WomenModule,
    GameModule,
    DialogModule,
    EditorModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoggedInGuard, RolGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
