import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game-list/game-list.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'list', component: GameListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
