import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    CategorylistComponent,
    AddcategoryComponent,
    UpdatecategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DataTablesModule
  ],
  exports: [
    CategorylistComponent,
    AddcategoryComponent,
    UpdatecategoryComponent
  ]
})
export class CategoriesModule { }
