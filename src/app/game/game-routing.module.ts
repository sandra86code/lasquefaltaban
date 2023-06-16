import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game-list/game-list.component';
import { RolGuard } from '../role-guard.guard';
import { LoggedInGuard } from '../loggedin-guard.guard';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'list', component: GameListComponent, canActivate: [LoggedInGuard, RolGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
