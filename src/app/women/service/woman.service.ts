import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { WomenResponse } from '../interface/women-response.interface';
import { Woman } from 'src/app/game/interface/questions-game.interface';

@Injectable({
  providedIn: 'root'
})
export class WomanService {

constructor(private http: HttpClient) { }

  url: string = `${environment.apiUrl}/woman`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Método que devuelve a todas las mujeres
   * @returns 
   */
  getWomen(): Observable<WomenResponse> {
    return this.http.get<WomenResponse>(this.url);
  }
  
  /**
   * Método que devuelve a una mujer por su id
   * @param id 
   * @returns 
   */
  getWomanById(id: number): Observable<WomenResponse> {
    return this.http.get<Woman>(`${this.url}/${id}`, this.httpOptions)
  }

  /**
   * Método que añade a una mujer
   * @param name 
   * @param description 
   * @returns 
   */
  addWoman(name:string, description:string) {
    return this.http.post(`${this.url}`, {"name": name, "description": description, "img": null}, this.httpOptions);
  }

  /**
   * Método que elimina a una mujer
   * @param id 
   * @returns 
   */
  deleteWoman(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  /**
   * Método que edita a una mujer
   * @param id 
   * @param name 
   * @param description 
   * @returns 
   */
  editWoman(id: number, name: string, description: string): Observable<boolean> {
    return this.http.put<any>(`${this.url}/${id}`, {"name": name, "description": description, "img": null}, this.httpOptions)
    .pipe( switchMap(resp => {
      return of(true);
    }),catchError(error => {
        return of(false);
    })
    )
  }
}