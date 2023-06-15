import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { QuestionsGameResponse } from '../interface/questions-game.interface';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Observable, Subscription, timer } from 'rxjs';
import { take, map, tap, takeWhile } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private gameService : GameService, private cookieService : CookieService, 
    private authService : AuthService, private route: Router) { }
  
  isLoggedIn$!: Observable<boolean>;

  questionsGame: QuestionsGameResponse[] = [];
  index: number = 0;
  currentQuestion!: QuestionsGameResponse;
  answered: boolean = false;
  score = 0;
  moreQuestions = true;
  gameEnded = false;
  selected: any = -1;
  showWomanInfo: boolean = false;
  numberQuestions: boolean = false;
  showColor: boolean = false;
  questionsNumber: any = null;
  notAnsweredQuestion: boolean = false;

  //Timer
  counter$!: Observable<number>;
  subscription!: Subscription;
  isPaused: boolean = false;
  seconds: any = null;


  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn
  }

  /**
   * Método que devuelve la lista de preguntas del juego
   */
  getQuestionsGame() {
    this.gameService.getQuestionsGame(this.questionsNumber)
      .subscribe({
        next: (resp) => {
          this.questionsGame = resp
          this.currentQuestion = this.questionsGame[this.index];
          this.startTimer();
          this.numberQuestions = true;
        }
      })
  }

  /**
   * Método que resuelve si la respuesta seleccionada es la correcta o no
   * @param correct 
   * @param index 
   */
  resolveQuestion(correct: boolean, index: number) {
    if(!correct && index == -1){
      this.answered = true;
      this.notAnsweredQuestion = true;
      this.selected = this.currentQuestion.answers.filter((x) => x.correct == true)
      this.selected = this.selected[0]
      this.isPaused = true;
    }else {
      this.pauseTimer();
      this.answered = true;
      this.selected = this.currentQuestion.answers[index];
      if(correct) {
        this.score = this.score + 5;
      }
    } 
  }

  /**
   * Método que muestra la siguiente pregunta
   */
  nextQuestion() {
    this.notAnsweredQuestion = false;
    if(this.index<this.questionsGame.length-1) {
      this.answered = false;
      this.index = this.index + 1;
      this.currentQuestion = this.questionsGame[this.index];
      this.restartTimer();
      this.selected=-1;
      this.showColor = false;
    }
    if(this.index==this.questionsGame.length-1) {
      this.moreQuestions = false;
      this.subscription.unsubscribe();
    }
  }

  /**
   * Método que añade un juego
   */
  addGame() {
    this.gameEnded = true;
    this.gameService.addGame(this.score, this.cookieService.get('user-username'))
    .subscribe({
      next: (resp) => {
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha habido un error al guardar la partida',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }
  
  /**
   * Método que muestra el modal con la información sobre la mujer
   */
  showWomanInformation() {
    this.showWomanInfo = true;
  }

  /**
   * Método que cierra el modal con la información de la mujer
   */
  closeWomanInfo() {
    this.showWomanInfo = false;
  }

  /**
   * Método que inicia la cuenta atrás del cronómetro
   */
  startTimer() {
    this.counter$ = timer(0, 1000).pipe(
      take(this.seconds+1), 
      tap(() => {
        if (this.isPaused) {
          this.subscription.unsubscribe();
        }
      }),
      map(value => this.seconds - value),
      takeWhile(value => value >= 0),
      tap(value => {
        //Si el valor llega a cero, llama a la función de resolver
        if (value === 0) {
          this.resolveQuestion(false, -1);
        }
      })
    );
    this.subscription = this.counter$.subscribe();
  }

  /**
   * Método que pausa la cuenta atrás
   */
  pauseTimer() {
    this.isPaused = true;
    this.subscription.unsubscribe();
  }

  /**
   * Método que reinicia la cuenta atrás
   */
  restartTimer() {
    this.isPaused = false;
    this.startTimer();
  }


  /**
   * Método que muestra u oculta la tabla de colores
   */
  showColorCode() {
    this.showColor = true;
  }

  /**
   * Método que recarga el componente
   */
  reload() {
    const currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigateByUrl(currentUrl);
    });
  }
}