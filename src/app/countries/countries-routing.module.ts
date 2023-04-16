import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountrieslistComponent } from './countrieslist/countrieslist.component';
import { CountryComponent } from './country/country.component';
import { CountrieslistadminComponent } from './countrieslistadmin/countrieslistadmin.component';
import { AddcountryComponent } from './addcountry/addcountry.component';
import { UpdatecountryComponent } from './updatecountry/updatecountry.component';

const routes: Routes = [
  {
    path: '', component: CountrieslistComponent
  },
  { path: ':id', component: CountryComponent },
  { path: 'list', component: CountrieslistadminComponent },
  { path: 'add', component: AddcountryComponent},
  { path: 'update/:id', component: UpdatecountryComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
