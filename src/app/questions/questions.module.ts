import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { UpdatequestionComponent } from './updatequestion/updatequestion.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { QuestionlistComponent } from './questionlist/questionlist.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    UpdatequestionComponent,
    AddquestionComponent,
    QuestionlistComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DataTablesModule
  ],
  exports: [
    UpdatequestionComponent,
    AddquestionComponent,
    QuestionlistComponent
  ]
})
export class QuestionsModule { }
