import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { QuestionlistComponent } from './questionlist/questionlist.component';
import { UpdatequestionComponent } from './updatequestion/updatequestion.component';

const routes: Routes = [
  { path: '', component: QuestionlistComponent },
  { path: 'add', component: AddquestionComponent },
  { path: 'update/:id', component: UpdatequestionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
