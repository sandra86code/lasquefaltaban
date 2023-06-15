import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
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

  private username: BehaviorSubject<string> = new BehaviorSubject("");

  private img: BehaviorSubject<string> = new BehaviorSubject("");

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  };

  url: string = `${environment.apiUrl}`;


  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isAdmin() {
    return this.admin.asObservable();
  }

  get userImg() {
    return this.img.asObservable();
  }

  get userUsername() {
    return this.username.asObservable();
  }

  /**
   * Método que realiza la petición de logueo al back y, si es correcto, introduce el token
   * en las cookies
   * @param username 
   * @param password 
   * @returns observable con valor true si es correcto, y false si es incorrecto
   */
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

  /**
   * Método que desloguea al usuario y elimina todas las cookies
   */
  logOut() {
    this.cookieService.deleteAll();
    this.loggedIn.next(false);
  }

  /**
   * Método que guarda en las cookies los datos del usuario
   * @param username
   * @returns 
   */
  setUserCookies(username: string) {
    return this.http.get<any>(`${this.url}/user/${username}`, this.httpOptions)
      .subscribe({
        next: (user) => {
          this.cookieService.set('user-img', user.img);
          this.img.next(this.cookieService.get('user-img'));
          this.cookieService.set('user-username', user.username);
          this.username.next(this.cookieService.get('user-username'));
          this.cookieService.set('user-role', user.role);
          if(user.role === 'ADMIN') {
            this.admin.next(true);
          }else {
            this.admin.next(false);
          }
        }
      })
  }

  /**
   * Método que realiza una petición para realizar el registro del usuario en la app
   * @param user 
   * @param userlogo 
   * @returns 
   */
  register(user: any, userlogo: File) {
    const form: FormData = new FormData();
    form.append('userlogo', userlogo);
    const userBlob = new Blob([JSON.stringify(user)], { type: 'application/json' });
    form.append('user', userBlob);
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');

    return this.http.post<any>(`${this.url}/user`, form, { headers: headers });
  }

  /**
   * Método que devuelve true si el usuario es ADMIN y false si no lo es
   * @returns 
   */
  isAdminGuard() {
    let token = this.cookieService.get('token')
    if (token) {
      let role = this.decodeJwt(token).role
      if (role == 'ADMIN') {
        return true
      }
    }
    return false
  }

  /**
   * Método que decodifica y lee el token
   * @param jwt 
   * @returns 
   */
  decodeJwt(jwt: string): DecodeToken {
    return jwt_decode(jwt)
  }

  /**
   * Método que realiza una petición para verificar al usuario en la aplicación
   * @returns 
   */
  verify(): Observable<any> {
    return this.activatedRoute.queryParams
      .pipe(switchMap((res) => {
        return this.http.get(`${this.url}/verify?user=${res['user']}&code=${res['code']}`);
      }))
  }
}
