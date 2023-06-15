import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../service/question.service';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/categories/service/category.service';
import { WomanService } from 'src/app/women/service/woman.service';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ cursor: pointer;}']
})
export class UpdatequestionComponent implements OnInit {

  constructor(private questionService: QuestionService, private route: Router,
    private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private womanService: WomanService) { }

  women!: any;
  categories!: any;

  selectedWoman: any = null;
  selectedCategory: any = null;

  @ViewChild('editQuestionForm') editQuestionForm!: NgForm;

  id: any;

  question!: any;

  initForm = {
    name: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correct: -1
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.questionService.getQuestionById(this.id)
      .subscribe({
        next: res => {
          this.question = res;
          this.initForm.name = this.question.name;
          this.initForm.answer1 = this.question.answers[0].answer;
          this.initForm.answer2 = this.question.answers[1].answer;
          this.initForm.answer3 = this.question.answers[2].answer;
          this.initForm.answer4 = this.question.answers[3].answer;
          this.selectedWoman = this.question.woman.id;
          this.selectedCategory = this.question.category.id;
          let correctAnswer = this.question.answers.filter((x: { correct: boolean; }) => x.correct == true)
          this.initForm.correct = this.selectCorrectAnswer(correctAnswer[0].answer);
        }
      })
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

  /**
   * Método que selecciona la respuesta correcta
   * @param answer 
   * @returns 
   */
  selectCorrectAnswer(answer: string): number {
    let number = 0;
    if (answer === this.initForm.answer1) {
      number = 1;
    } else if (answer === this.initForm.answer2) {
      number = 2;
    } else if (answer === this.initForm.answer3) {
      number = 3;
    } else {
      number = 4;
    }
    return number;

  }

  /**
 * Método que controla si los campos del formulario son válidos
 * @param field - campo del formulario
 * @returns true si el campo es correcto, false si no lo es
 */
  notValid(field: string): boolean {
    return this.editQuestionForm?.controls[field]?.invalid &&
      this.editQuestionForm?.controls[field]?.touched
  }

  /**
   * Método que edita la pregunta
   */
  editQuestion() {
    const answers = this.createAnswers();
    let woman = this.women.filter((x: { id: any; }) => x.id == this.selectedWoman)
    let category = this.categories.filter((x: { id: any; }) => x.id == this.selectedCategory)
    const body = {
      name: this.editQuestionForm.controls["name"].value,
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
    this.questionService.editQuestion(this.question.id, body)
      .subscribe({
        next: (resp) => {
          Swal.fire({
            icon: 'success',
            title: 'Pregunta editada',
            confirmButtonColor: '#8d448b'
          })
          this.route.navigateByUrl('/question')
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Pregunta no editada',
            confirmButtonColor: '#8d448b'
          })
          this.route.navigateByUrl('/question')
        }
      })
  }

  /**
   * Método que devuelve a la última página visitada en la aplicación
   */
  goBack() {
    window.history.back();
  }

  /**
   * Método que crea las respuestas para poder usarlas en la petición
   * posteriormente
   * @returns 
   */
  createAnswers() {
    let correct1 = false;
    let correct2 = false;
    let correct3 = false;
    let correct4 = false;
    switch (this.editQuestionForm.controls["correct"].value) {
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
          "answer": this.editQuestionForm.controls["answer1"].value,
          "correct": correct1
        },
        {
          "answer": this.editQuestionForm.controls["answer2"].value,
          "correct": correct2
        },
        {
          "answer": this.editQuestionForm.controls["answer3"].value,
          "correct": correct3
        },
        {
          "answer": this.editQuestionForm.controls["answer4"].value,
          "correct": correct4
        }
      ]
    };
    return answers;
  }
}
