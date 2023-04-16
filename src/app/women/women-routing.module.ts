import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddwomanComponent } from './addwoman/addwoman.component';
import { UpdatewomanComponent } from './updatewoman/updatewoman.component';
import { WomenlistComponent } from './womenlist/womenlist.component';

const routes: Routes = [
  { path: '', component: WomenlistComponent },
  { path: 'add', component: AddwomanComponent },
  { path: 'update/:id', component: UpdatewomanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WomenRoutingModule { }
