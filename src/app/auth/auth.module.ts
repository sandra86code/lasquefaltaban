import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    VerifyComponent
  ]
})
export class AuthModule { }
