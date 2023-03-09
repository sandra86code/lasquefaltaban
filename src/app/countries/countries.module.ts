import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountryComponent } from './country/country.component';
import { CountrieslistComponent } from './countrieslist/countrieslist.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
    declarations: [
        CountryComponent,
        CountrieslistComponent
    ],
    imports: [
        CommonModule,
        CountriesRoutingModule,
        RouterModule,
        SharedModule,
        NgxPaginationModule
    ]
})
export class CountriesModule { }
