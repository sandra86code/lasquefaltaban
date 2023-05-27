import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking/ranking.component';
import { RankingRoutingModule } from './ranking-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RankingComponent
  ],
  imports: [
    CommonModule,
    RankingRoutingModule,
    SharedModule
  ],
  exports: [
    RankingComponent
  ]
})
export class RankingModule { }
