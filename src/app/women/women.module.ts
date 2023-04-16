import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WomenlistComponent } from './womenlist/womenlist.component';
import { AddwomanComponent } from './addwoman/addwoman.component';
import { UpdatewomanComponent } from './updatewoman/updatewoman.component';
import { WomenRoutingModule } from './women-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    WomenlistComponent,
    AddwomanComponent,
    UpdatewomanComponent
  ],
  imports: [
    CommonModule,
    WomenRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DataTablesModule
  ]
})
export class WomenModule { }
