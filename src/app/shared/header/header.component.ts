import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.button-active { color: #fff; background-color: #b08f26; border-color: #b08f26 !important} .activeMenu { color: #b08f26 !important; } .material-symbols-outlined { color: #5e1f5d} .big-icon {font-size: 48px; }.special-inline { display: inline-block} .active { background-color: #8d448b !important; color: white !important;}' ]
})
export class HeaderComponent implements OnInit {

  id!: string | null;
  isLoggedIn$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  img!: Observable<string>;
  username!: Observable<string> | string;
  event: string | undefined;

  usernameCookie!: string;
  imgCookie!: string;
  isAdmin!: string;

  constructor(private authService: AuthService,  private activatedRoute: ActivatedRoute, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isAdmin;
    this.img = this.authService.userImg;
    this.username = this.authService.userUsername;
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isAdmin;
    this.isAdmin = this.cookieService.get('user-role')
    this.img = this.authService.userImg;
    this.username = this.authService.userUsername;
    this.usernameCookie = this.cookieService.get('user-username')
    this.imgCookie = this.cookieService.get('user-img')
  }

  logout() {
    this.authService.logOut();

  }
}
