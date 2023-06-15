import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { QuestionService } from '../service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questionlist',
  templateUrl: './questionlist.component.html',
  styles: ['h1 {color: #8d448b; } .q-name { width: 500px;} .btn-success {font-size: 20px; font-weight: bold;} .separation{margin-bottom: 8rem}']
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
      error:(error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al recuperar las preguntas',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

  /**
   * Método que elimina una pregunta
   * @param id 
   */
  deleteQuestion(id: number) {
    this.questionService.deleteQuestion(id)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Pregunta borrada',
          confirmButtonColor: '#8d448b'
        })
        this.ngOnDestroy();
        this.ngOnInit();
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

  /**
   * Método que se desuscribe del evento
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
