import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UsersResponse } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  url: string = `${environment.apiUrl}/user`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Método que devuelve todos los usuarios
   * @returns 
   */
  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.url);
  }

  /**
   * Método que devuelve un usuario por su id
   * @param username 
   * @returns 
   */
  getUserById(username: string): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.url}/${username}`, this.httpOptions)
  }

  /**
   * Método que elimina un usuario
   * @param username 
   * @returns 
   */
  deleteUser(username: string): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${username}`)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  /**
   * Método que edita un usuario
   * @param user 
   * @param userlogo 
   * @returns 
   */
  editUser(user: any, userlogo: File) {
    const form: FormData = new FormData();
    form.append('userlogo', userlogo);
    const userBlob = new Blob([JSON.stringify(user)], { type: 'application/json' });
    form.append('updatedUser', userBlob);
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    return this.http.put<any>(`${this.url}/${user.username}`, form, { headers: headers })
  }
}
