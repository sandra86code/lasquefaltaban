import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Page } from 'src/app/shared/pagination/pagination.interface';
import { environment } from 'src/environments/environment.prod';
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

  /**
   * Método que devuelve todos los países, paginados
   * @param pageNumber 
   * @returns 
   */
  getCountries(pageNumber: number = 1): Observable<Page<Country>>  {
    return this.http.get<Page<Country>>(`${this.url}?pageNumber=${pageNumber}`, this.httpOptions);
  }

  /**
   * Método que devuelve todos los países, en forma de lista
   * @returns 
   */
  getCountriesList(): Observable<Page<Country>>  {
    return this.http.get<Page<Country>>(`${this.url}/list`, this.httpOptions);
  }

  /**
   * Método que devuelve un país por su id
   * @param id 
   * @returns 
   */
  getCountryById(id: number): Observable<any>  {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  /**
   * Método que añade un país
   * @param name 
   * @param description 
   * @param countryImg 
   * @returns 
   */
  addCountry(name:string, description:string, countryImg: File) {
    const form: FormData = new FormData();
    form.append('countryImg', countryImg);
    const countryBlob = new Blob([JSON.stringify({"name": name, "description": description})], { type: 'application/json' });
    form.append('country', countryBlob);

    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');

    return this.http.post(`${this.url}`, form, { headers: headers });
  }

  /**
   * Método que elimina un país
   * @param id 
   * @returns 
   */
  deleteCountry(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  /**
   * Método que edita un país
   * @param id 
   * @param name 
   * @param description 
   * @param countryImg 
   * @returns 
   */
  editCountry(id: number, name: string, description: string, countryImg: File) {
    const form: FormData = new FormData();
    form.append('countryImg', countryImg);
    const countryBlob = new Blob([JSON.stringify({"name": name, "description": description})], { type: 'application/json' });
    form.append('updatedCountry', countryBlob);

    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');

    return this.http.put<any>(`${this.url}/${id}`, form, { headers: headers });
  }
}
