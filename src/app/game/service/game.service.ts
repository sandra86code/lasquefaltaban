import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { QuestionsGameResponse } from '../interface/questions-game.interface';
import { Observable } from 'rxjs';
import { GameResponse } from '../interface/game-interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  url: string = `${environment.apiUrl}`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  /**
   * Método que devuelve las preguntas del juego
   * @param numberQuestions 
   * @returns 
   */
  getQuestionsGame(numberQuestions: number): Observable<QuestionsGameResponse[]>  {
    return this.http.get<QuestionsGameResponse[]>(`${this.url}/question/play/${numberQuestions}`, this.httpOptions);
  }

  /**
   * Método que devuelve todas las partidas
   * @returns 
   */
  getGames(): Observable<GameResponse[]>  {
    return this.http.get<GameResponse[]>(`${this.url}/game`, this.httpOptions);
  }

  /**
   * Método que añade una partida al usuario
   * @param score 
   * @param username 
   * @returns 
   */
  addGame(score: number, username: string){
    return this.http.post(`${this.url}/game`, {"score": score, "user": {"username": username}}, this.httpOptions);
  }
}
