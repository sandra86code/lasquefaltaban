import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HomeModule } from './home/home.module';
import { FaqsComponent } from './page-info/faqs/faqs.component';
import { AboutusComponent } from './page-info/aboutus/aboutus.component';
import { RolGuard } from './role-guard.guard';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    FaqsComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    AuthModule
  ],
  providers: [
    RolGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
