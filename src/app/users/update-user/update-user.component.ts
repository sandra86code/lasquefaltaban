import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import { UsersResponse } from '../interfaces/users.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent implements OnInit {

  id: any;
  user!: UsersResponse;
  repassword: string = "";

  changedPassword: boolean = false;

  @ViewChild('updatedForm') updatedForm!: NgForm;

  initForm = {
    username: "",
    password: "",
    fullname: "",
    email: "",
  }


  json: any = {
    username: '',
    name: '',
    email: '',
    password: ''
  }

  
  constructor(private activatedRoute: ActivatedRoute, private usersService : UsersService, private authService: AuthService,
    private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.getUserById(this.id)
    .subscribe({
      next: res => {
        this.user = res;
        this.initForm.username = this.user.username
        this.initForm.fullname = this.user.name
        this.initForm.email = this.user.email
      },
      error:(error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al recuperar el usuario',
          confirmButtonColor: '#8d448b'
        })
      }  
    })
  }

  /**
   * Método que cambia el valor de la variable changedPassword
   */
  changePassword() {
    this.changedPassword = !this.changedPassword;
  }

  /**
   * Método que controla si los campos del formulario son válidos
   * @param field - campo del formulario
   * @returns true si el campo es correcto, false si no lo es
   */
  notValid(field: string): boolean {
    return this.updatedForm?.controls[field]?.invalid && this.updatedForm?.controls[field]?.touched
  }

  /**
   * Método que comprueba si las dos contraseñas introducidas son iguales o no
   * @returns 
   */
  checkPassword(): boolean {
    if (this.updatedForm?.controls["password"]?.touched && this.updatedForm?.controls["repassword"]?.touched) {
      return this.updatedForm?.controls["repassword"].value != this.updatedForm?.controls["password"].value
    } else {
      return false;
    }
  }

  /**
   * Método que devuelve a un usuario
   */
  getUser() {
    this.usersService.getUserById(this.id)
    .subscribe({
      next: res => {
        this.user = res;
      },
      error:(error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al recuperar el usuario',
          confirmButtonColor: '#8d448b'
        })
      }  
    })
  }

  /**
   * Método que edita a un usuario
   * @param fileInput 
   */
  editUser(fileInput: any) {
    this.json.username = this.updatedForm.value.username;
    this.json.name = this.updatedForm.value.fullname;
    this.json.email = this.updatedForm.value.email;
    this.json.password = this.updatedForm.value.password;
    let fi = fileInput;
    let fileToUpload = null;
    if (fileInput!=null && fi.files && fi.files[0]) {
      fileToUpload = fi.files[0];
    }
    this.usersService.editUser(this.json, fileToUpload)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario editado',
          confirmButtonColor: '#8d448b'
        })
        if(data.img!=null) {
          this.cookieService.set('user-img', data.img)
        }
        if(this.authService.isAdminGuard()) {
          this.router.navigate(['/user']);
        }else {
          this.router.navigate(['']);
        }
      },
      error: (error)=>{
        console.log(error)
        if(error.error=="Usuario repetido") {
          Swal.fire({
            icon: 'error',
            title: error.error,
            confirmButtonColor: '#8d448b'
          })
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Usuario no editado',
            confirmButtonColor: '#8d448b'
          })
        }
      }
    })
  }

}
