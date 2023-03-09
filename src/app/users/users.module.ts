import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserslistComponent } from './userslist/userslist.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UpdateUserComponent } from './update-user/update-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserslistComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    DataTablesModule,
    RouterModule
  ]
})
export class UsersModule { }
