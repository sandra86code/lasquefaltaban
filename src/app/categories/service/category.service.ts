import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CategoriesResponse } from '../interface/categories-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private http: HttpClient) { }

  url: string = `${environment.apiUrl}/category`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Método que devuelve todas las categorías
   * @returns 
   */
  getCategories(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  /**
   * Método que devuelve una categoría por id
   * @param id 
   * @returns 
   */
  getCategoryById(id: number): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${this.url}/${id}`, this.httpOptions)
  }

  /**
   * Método que añade una categoría nueva
   * @param name 
   * @returns 
   */
  addCategory(name:string) {
    return this.http.post(`${this.url}`, {"name": name}, this.httpOptions);
  }

  /**
   * Método elimina una categoría
   * @param id 
   * @returns 
   */
  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  /**
   * Método que edita una categoría
   * @param id 
   * @param name 
   * @returns 
   */
  editCategory(id: number, name: string): Observable<boolean> {
    return this.http.put<any>(`${this.url}/${id}`, {"name": name}, this.httpOptions)
    .pipe( switchMap(resp => {
      return of(true);
    }),catchError(error => {
        return of(false);
    })
    )
  }
}