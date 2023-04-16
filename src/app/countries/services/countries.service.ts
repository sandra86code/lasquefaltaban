import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Page } from 'src/app/shared/pagination/pagination.interface';
// import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';
import { Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  url: string = `${environment.apiUrl}/country`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  getCountries(pageNumber: number = 1): Observable<Page<Country>>  {
    return this.http.get<Page<Country>>(`${this.url}?pageNumber=${pageNumber}`, this.httpOptions);
  }

  getCountriesList(): Observable<Page<Country>>  {
    return this.http.get<Page<Country>>(`${this.url}/list`, this.httpOptions);
  }

  getCountryById(id: number): Observable<any>  {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  addCountry(name:string, description:string) {
    return this.http.post(`${this.url}`, {"name": name, "description": description, "img": null}, this.httpOptions);
  }

  deleteCountry(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  editCountry(id: number, name: string, description: string): Observable<boolean> {
    return this.http.put<any>(`${this.url}/${id}`, {"name": name, "description": description, "img": null}, this.httpOptions)
    .pipe( switchMap(resp => {
      return of(true);
    }),catchError(error => {
        return of(false);
    })
    )
  }
}
