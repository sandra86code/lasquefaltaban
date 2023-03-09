import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { QuestionService } from '../service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questionlist',
  templateUrl: './questionlist.component.html',
  styles: ['h1 {color: #8d448b; } .q-name { width: 500px;}']
})
export class QuestionlistComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  questions!: any;
  constructor(private questionService: QuestionService) { }

  

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.questions = this.questionService.getQuestions()
    .subscribe({
      next: (data) => {
        this.questions = data
        this.dtTrigger.next(this.questions);
      },
      error: (error)=>{
      }
    })
  }

  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id)
    .subscribe({
      next: (data) => {
        window.location.reload()
        Swal.fire({
          icon: 'success',
          title: 'Pregunta borrada',
          confirmButtonColor: '#8d448b'
        })
        .then((result) => {
          location.reload();
        })
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Pregunta no borrada',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
