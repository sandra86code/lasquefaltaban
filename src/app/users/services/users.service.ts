import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';
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

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.url);
  }

  getUserById(username: string): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.url}/${username}`, this.httpOptions)
  }


  deleteUser(username: string): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${username}`)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  editUser(user: any): Observable<boolean> {
    const form: FormData = new FormData();
    const userBlob = new Blob([JSON.stringify(user)], { type: 'application/json' });
    form.append('updatedUser', userBlob);
    return this.http.put<any>(`${this.url}/${user.username}`, form)
    .pipe( switchMap(resp => {
      return of(true);
    }),catchError(error => {
        return of(false);
    })
    )
  }
}
