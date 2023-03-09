import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolGuard } from '../role-guard.guard';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserslistComponent } from './userslist/userslist.component';

const routes: Routes = [
  {
    path: '',
    component: UserslistComponent,
    pathMatch:"full",
    canActivate: [RolGuard]
  },
  { path: 'update/:id', component: UpdateUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
