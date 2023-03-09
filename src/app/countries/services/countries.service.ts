import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/pagination/pagination.interface';
import { environment } from 'src/environments/environment';
import { Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  url: string = `${environment.apiUrl}/country`;

  

  getCountries(pageNumber: number = 1): Observable<Page<Country>>  {
    return this.http.get<Page<Country>>(`${this.url}?pageNumber=${pageNumber}`);
  }

  getCountryById(id: number): Observable<any>  {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
