import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game/game.component';
import { DialogModule } from 'primeng/dialog';
import { GameListComponent } from './game-list/game-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    GameComponent,
    GameListComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    DialogModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DataTablesModule
  ],
  exports: [
    GameComponent,
    GameListComponent
  ]
})
export class GameModule { }
