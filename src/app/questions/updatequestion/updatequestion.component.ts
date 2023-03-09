import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ Cursor: pointer;}']
})
export class UpdatequestionComponent implements OnInit {

  constructor(private questionService: QuestionService, private route: Router, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

    name: string = ""

    id: any;
  
    question!: any;

    myForm: FormGroup = this.fb.group({
      name: [this.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    })
  
    ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.questionService.getQuestionById(this.id)
        .subscribe({
          next: res => {
            this.question = res;
            this.myForm.setValue({
              name: this.question.name,
            })
          }
        })
    }
  
    notValid(field: string): boolean {
      return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
    }

  editQuestion() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.questionService.editQuestion(this.myForm)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Categoría editada',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/category')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Categoría no editada',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/category')
          }
        })
    }
  }

  goBack() {
    window.history.back();
  }
}
