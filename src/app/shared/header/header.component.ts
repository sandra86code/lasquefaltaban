import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['.button-active { color: #fff; background-color: #b08f26; border-color: #b08f26 !important} .active { color: #b08f26 !important; } .material-symbols-outlined { color: #5e1f5d} .big-icon {font-size: 48px; }.special-inline { display: inline-block}']
})
export class HeaderComponent implements OnInit {

  id!: string | null;
  isLoggedIn$!: Observable<boolean>;
  img: string = "";
  username: string = "";

  constructor(private authService: AuthService,  private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.img = this.authService.userImg;
    this.username = this.authService.username;
  }

  logout() {
    this.authService.logOut();

  }

  
}
