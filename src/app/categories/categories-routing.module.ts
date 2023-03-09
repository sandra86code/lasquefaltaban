import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';

const routes: Routes = [
  { path: '', component: CategorylistComponent },
  { path: 'add', component: AddcategoryComponent },
  { path: 'update/:id', component: UpdatecategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
