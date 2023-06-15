import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RankingService {

  constructor(private http: HttpClient) {}


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})

  };

  url: string = `${environment.apiUrl}`;




  getRanking(): Observable<any> {
    return this.http.get<any>(`${this.url}/game/user`, this.httpOptions)
  }

  getScoreOfUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.url}/game/user/${username}/score`, this.httpOptions)
  }

}
