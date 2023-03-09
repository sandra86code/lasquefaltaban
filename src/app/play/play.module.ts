import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayComponent } from './play/play.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PlayRoutingModule } from './play-routing.module';



@NgModule({
  declarations: [
    PlayComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PlayRoutingModule
  ]
})
export class PlayModule { }
