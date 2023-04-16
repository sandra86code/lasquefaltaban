import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ cursor: pointer;}']
})
export class AddquestionComponent implements OnInit {

  constructor(private service: QuestionService, private route: Router, private fb: FormBuilder) { }

  name: string = ""

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
  })

  ngOnInit(): void {
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  addCategory() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.addQuestion(this.myForm.value.name)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Pregunta añadida',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/question')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Pregunta no añadida',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/question')
          }
        })
    }
  }


  goBack() {
    window.history.back();
  }
}
