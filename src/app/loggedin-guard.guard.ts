import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router"
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import { AuthService } from "./auth/services/auth.service";
import { CookieService } from "ngx-cookie-service";


@Injectable()
export class LoggedInGuard implements CanActivate, CanActivateChild {
  
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token: string | null = this.cookieService.get('token');

    if(token.length) {
      return true
    }
    else{
      this.router.navigateByUrl('')
      Swal.fire({
        icon: 'error',
        title: 'Prohibido',
        text: 'No tienes permiso para acceder a esa ruta. Loguéate'
      })
      return false
    }
    
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdmin
  }

}