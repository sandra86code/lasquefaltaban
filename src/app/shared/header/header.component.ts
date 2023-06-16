import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private rankingService: RankingService, private cookieService: CookieService, private route: Router,
    private location: Location) { }

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
    console.log(this.imgCookie)
    this.location.reload();
    this.rankingService.getScoreOfUser(this.usernameCookie)
    .subscribe({
      next: (resp) => {
        if (resp) {
          this.score = resp.score;
        }
      },
      complete: () => {
        this.reload();
      }
    })
    
  }

  /**
   * Método que desloguea al usuario en la aplicación
   */
  logout() {
    this.route.navigateByUrl('/');
    this.authService.logOut();
  }

  /**
   * Método que abre y cierra el menú hamburguesa de las pantallas medianas y pequeñas
   */
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  /**
   * Método que cierra el menú hamburguesa de las pantallas medianas y pequeñas
   */
  closeNavbar() {
    this.isNavbarOpen = false;
  }

  /**
   * Método que recarga el componente
   */
   reload() {
    const currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigateByUrl(currentUrl);
    });
  }
}
