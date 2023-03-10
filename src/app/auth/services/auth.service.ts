import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';
import { DecodeToken } from '../interfaces/decode-token.interface';
import jwt_decode from "jwt-decode";
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService, 
    private activatedRoute: ActivatedRoute) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
    if (this.cookieService.get("token") == "") {
      this.loggedIn.next(false);
    } else {
      this.loggedIn.next(true);
    }
  }

  private loggedIn;

  private admin = new BehaviorSubject<boolean>(false);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  url: string = `${environment.apiUrl}`;


  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isAdmin() {
    return this.admin.asObservable();
  }

  get userImg() {
    return this.cookieService.get('user-img');
  }

  get username() {
    return this.cookieService.get('user-username');
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.url}/signin`, { username, password }, this.httpOptions)
      .pipe(switchMap(token => {
        this.cookieService.set('token', token.body.token.replace('Bearer ', ''));
        this.loggedIn.next(true);
        return of(true);
      }), catchError(error => {
        return of(false);
      }))
  }

  logOut() {
    this.cookieService.deleteAll();
    this.loggedIn.next(false);
  }

  setUserCookies(username: string) {
    return this.http.get<any>(`${this.url}/user/${username}`, this.httpOptions)
      .subscribe({
        next: (user) => {
          this.cookieService.set('user-img', user.img);
          this.cookieService.set('user-username', user.username);
          this.cookieService.set('user-role', user.role);
        }
      })
  }

  register(user: any, userlogo: File) {
    const form: FormData = new FormData();
    form.append('userlogo', userlogo);
    const userBlob = new Blob([JSON.stringify(user)], { type: 'application/json' });
    form.append('user', userBlob);
    return this.http.post<any>(`${this.url}/user`, form);
  }

  isAdminGuard() {
    let token = this.cookieService.get('token')
    if (token) {
      let role = this.decodeJwt(token).role
      if (role == 'ADMIN_ROLE') {
        return true
      }
    }
    return false

  }

  decodeJwt(jwt: string): DecodeToken {
    return jwt_decode(jwt)
  }

  verify(): Observable<any> {
    return this.activatedRoute.queryParams
      .pipe(switchMap((res) => {
        return this.http.get(`${this.url}/verify?user=${res['user']}&code=${res['code']}`);
      }))
  }
}
