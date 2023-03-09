import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  @ViewChild('loginForm') loginForm!: NgForm;

  initForm = {
    username: "",
    password: ""
  }

  notValid(campo: string): boolean {
    return this.loginForm?.controls[campo]?.invalid &&
      this.loginForm?.controls[campo]?.touched
  }

  async login() {
    this.authService.login(this.loginForm.controls["username"].value, this.loginForm.controls["password"].value)
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.authService.setUserCookies(this.loginForm.controls["username"].value)
            if(this.authService.isAdminGuard()) {
              this.router.navigate(['/user']);
            }else {
              this.router.navigate(['/country']);
            }
            
          }
          else {
            this.initForm.username = '';
            this.initForm.password = '';
            this.loginForm.reset();
            Swal.fire({
              icon: 'error',
              title: 'Inicio de sesión incorrecto',
              confirmButtonColor: '#8d448b'
            })
            this.router.navigate(['/auth/login']);
          }
        }
      })
    }

  }
