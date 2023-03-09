import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  getQuestions(): Observable<QuestionsResponse> {
    return this.http.get<QuestionsResponse>(this.url);
  }

  getQuestionById(id: number): Observable<QuestionsResponse> {
    return this.http.get<QuestionsResponse>(`${this.url}/${id}`, this.httpOptions)
  }


  addQuestion(name:string) {
    return this.http.post(`${this.url}`, {"name": name}, this.httpOptions);
  }

  deleteQuestion(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  editQuestion(question: any): Observable<boolean> {
    return this.http.put<any>(`${this.url}/${question.id}`, {}, this.httpOptions)
    .pipe( switchMap(resp => {
      return of(true);
    }),catchError(error => {
        return of(false);
    })
    )
  }
}