import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountrieslistComponent } from './countrieslist/countrieslist.component';
import { CountryComponent } from './country/country.component';
import { CountrieslistadminComponent } from './countrieslistadmin/countrieslistadmin.component';
import { UpdatecountryComponent } from './updatecountry/updatecountry.component';
import { AddcountryComponent } from './addcountry/addcountry.component';
import { RolGuard } from '../role-guard.guard';
import { LoggedInGuard } from '../loggedin-guard.guard';

const routes: Routes = [
  { path: '', component: CountrieslistComponent},
  { path: 'country/:id', component: CountryComponent },
  { path: 'list', component: CountrieslistadminComponent, canActivate: [LoggedInGuard, RolGuard]},
  { path: 'list/add', component: AddcountryComponent, canActivate: [LoggedInGuard, RolGuard]},
  { path: 'list/update/:id', component: UpdatecountryComponent, canActivate: [LoggedInGuard, RolGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
