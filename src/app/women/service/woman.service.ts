import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { WomenResponse } from '../interface/women-response.interface';

@Injectable({
  providedIn: 'root'
})
export class WomanService {

constructor(private http: HttpClient) { }

  url: string = `${environment.apiUrl}/woman`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getWomen(): Observable<WomenResponse> {
    return this.http.get<WomenResponse>(this.url);
  }

  getWomanById(id: number): Observable<WomenResponse> {
    return this.http.get<WomenResponse>(`${this.url}/${id}`, this.httpOptions)
  }


  addWoman(name:string, description:string) {
    return this.http.post(`${this.url}`, {"name": name, "description": description, "img": null}, this.httpOptions);
  }

  deleteWoman(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

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