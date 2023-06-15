import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class RankingService {

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})

  };

  url: string = `${environment.apiUrl}`;

  /**
   * Método que devuelve el ranking de todos los jugadores de la aplicación
   * @returns 
   */
  getRanking(): Observable<any> {
    return this.http.get<any>(`${this.url}/game/user`, this.httpOptions)
  }

  /**
   * Método que devuelve los resultados de un jugador
   * @param username 
   * @returns 
   */
  getScoreOfUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.url}/game/user/${username}/score`, this.httpOptions)
  }

}
