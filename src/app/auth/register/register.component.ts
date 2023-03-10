import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(private service: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  @ViewChild('registerForm') registerForm!: NgForm;

  initForm = {
    username: "",
    password: "",
    fullname: "",
    email: ""
  }

  json: any = {
    username: '',
    password: '',
    name: '',
    email: ''
  }


  repassword: string = "";

  notValid(field: string): boolean {
    return this.registerForm?.controls[field]?.invalid && this.registerForm?.controls[field]?.touched

  }

  checkPassword(): boolean {
    if (this.registerForm?.controls["repassword"]?.touched) {
      return this.registerForm?.controls["repassword"].value != this.registerForm?.controls["password"].value
    } else {
      return false;
    }
  }

  register(fileInput: any) {
    this.json.username = this.registerForm.value.username;
    this.json.password = this.registerForm.value.password;
    this.json.name = this.registerForm.value.fullname;
    this.json.email = this.registerForm.value.email;
    let fi = fileInput;

    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.service.register(this.json, fileToUpload)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Confirma el enlace en el email que te hemos enviado a tu correo para poder iniciar sesión',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/auth/login')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Registro de usuario incorrecto',
              confirmButtonColor: '#8d448b'
            })
          }
        })
    }

  }
}
