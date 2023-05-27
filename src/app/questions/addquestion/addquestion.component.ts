import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../service/question.service';
import { WomanService } from 'src/app/women/service/woman.service';
import { CategoryService } from 'src/app/categories/service/category.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ cursor: pointer;}']
})
export class AddquestionComponent implements OnInit {

  constructor(private service: QuestionService, private route: Router, private womanService : WomanService, 
    private categoryService: CategoryService) { }

  women!: any;
  categories!: any;

  selectedWoman: any = null;
  selectedCategory: any = null;

  @ViewChild('addQuestionForm') addQuestionForm!: NgForm;
  
  initForm = {
    name: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correct: null
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
    .subscribe({
      next: (resp) => {
       this.categories = resp
      }
    })
    this.womanService.getWomen()
    .subscribe({
      next: (resp) => {
       this.women = resp
      }
    })
  }

  notValid(field: string): boolean {
    return this.addQuestionForm?.controls[field]?.invalid &&
      this.addQuestionForm?.controls[field]?.touched
  }

  addQuestion() {
    const answers = this.createAnswers();
    let woman = this.women.filter((x: { id: any; }) => x.id == this.selectedWoman)
    let category = this.categories.filter((x: { id: any; }) => x.id == this.selectedCategory)
    const body = {
      name: this.addQuestionForm.controls["name"].value,
      answers: answers.answers,
      woman: {
        "id": woman[0].id,
        "name": woman[0].name,
        "description": woman[0].description
      },
      category: {
        "id": category[0].id,
        "name": category[0].name
      }
    };
    this.service.addQuestion(body)
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

  createAnswers() {
    let correct1 = false;
    let correct2 = false;
    let correct3 = false;
    let correct4 = false;
    switch (this.addQuestionForm.controls["correct"].value) {
      case "1":
        correct1 = true;
        break;
      case "2":
        correct2 = true;
        break;
      case "3":
        correct3 = true;
        break;
      case "4":
        correct4 = true;
        break;
      default:
        break;
    }
    const answers = {
      "answers": [
        {
          "answer": this.addQuestionForm.controls["answer1"].value,
          "correct": correct1
        },
        {
          "answer": this.addQuestionForm.controls["answer2"].value,
          "correct": correct2        
        },
        {
          "answer": this.addQuestionForm.controls["answer3"].value,
          "correct": correct3
        },
        {
          "answer": this.addQuestionForm.controls["answer4"].value,
          "correct": correct4
        }
      ]
    };
    return answers;
  }

  goBack() {
    window.history.back();
  }

}
