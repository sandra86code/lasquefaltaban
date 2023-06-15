import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RankingService } from 'src/app/ranking/service/ranking.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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
  isNavbarOpen: boolean = false;

  score: number = -1;
  constructor(private authService: AuthService,  private activatedRoute: ActivatedRoute, 
    private rankingService: RankingService, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.img = this.authService.userImg;
    this.username = this.authService.userUsername;
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.isAdmin;
    this.isAdmin = this.cookieService.get('user-role')
    this.img = this.authService.userImg;
    this.username = this.authService.userUsername;
    this.usernameCookie = this.cookieService.get('user-username')
    this.imgCookie = this.cookieService.get('user-img')
    this.rankingService.getScoreOfUser(this.usernameCookie)
    .subscribe({
      next: (resp) => {
        if (resp) {
          this.score = resp.score;
        }
      }
    })
  }

  logout() {
    this.authService.logOut();
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeNavbar() {
    this.isNavbarOpen = false;
  }
}
