import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountryComponent } from './country/country.component';
import { CountrieslistComponent } from './countrieslist/countrieslist.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { CountrieslistadminComponent } from './countrieslistadmin/countrieslistadmin.component';
import { AddcountryComponent } from './addcountry/addcountry.component';
import { UpdatecountryComponent } from './updatecountry/updatecountry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
    declarations: [
        CountryComponent,
        CountrieslistComponent,
        CountrieslistadminComponent,
        AddcountryComponent,
        UpdatecountryComponent
    ],
    imports: [
        CommonModule,
        CountriesRoutingModule,
        RouterModule,
        SharedModule,
        NgxPaginationModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        DataTablesModule
    ]
})
export class CountriesModule { }
