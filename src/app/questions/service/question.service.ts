import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { QuestionsResponse } from '../interface/questions-response.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

constructor(private http: HttpClient) { }

  url: string = `${environment.apiUrl}/question`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Método que devuelve todas las preguntas
   * @returns 
   */
  getQuestions(): Observable<QuestionsResponse> {
    return this.http.get<QuestionsResponse>(this.url);
  }

  /**
   * Método que devuelve una pregunta por id
   * @param id 
   * @returns 
   */
  getQuestionById(id: number): Observable<QuestionsResponse> {
    return this.http.get<QuestionsResponse>(`${this.url}/${id}`, this.httpOptions)
  }

  /**
   * Método que añade una pregunta
   * @param body - formulario con la pregunta
   * @returns 
   */
  addQuestion(body: any) {
    return this.http.post(`${this.url}`, body, this.httpOptions);
  }

  /**
   * Método que borra una pregunta
   * @param id 
   * @returns 
   */
  deleteQuestion(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  /**
   * Método que edita una pregunta
   * @param id 
   * @param body 
   * @returns 
   */
  editQuestion(id: number, body: any) {
    return this.http.put<any>(`${this.url}/${id}`, body, this.httpOptions)
  }
}