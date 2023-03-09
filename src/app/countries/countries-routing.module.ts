import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountrieslistComponent } from './countrieslist/countrieslist.component';
import { CountryComponent } from './country/country.component';

const routes: Routes = [
  {
    path: '', component: CountrieslistComponent
  },
  { path: ':id', component: CountryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
