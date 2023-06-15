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

  /**
   * Método que controla si los campos del formulario son válidos
   * @param field - campo del formulario
   * @returns true si el campo es correcto, false si no lo es
   */
  notValid(field: string): boolean {
    return this.loginForm?.controls[field]?.invalid &&
      this.loginForm?.controls[field]?.touched
  }

  /**
   * Método que loguea al usuario en la aplicación
   */
  async login() {
    this.authService.login(this.loginForm.controls["username"].value, this.loginForm.controls["password"].value)
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.authService.setUserCookies(this.loginForm.controls["username"].value)
            if (this.authService.isAdminGuard()) {
              this.router.navigate(['/user']);
            } else {
              this.router.navigate(['/game']);
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
