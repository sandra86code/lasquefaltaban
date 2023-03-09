import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import { UsersResponse } from '../interfaces/users.interface';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent implements OnInit {

  id: any;
  user!: UsersResponse;

  @ViewChild('updatedForm') updatedForm!: NgForm;

  initForm = {
    username: "",
    password: "",
    fullname: "",
    email: "",
  }

  repassword: string = "";

  json: any = {
    username: '',
    name: '',
    email: '',
    password: ''
  }

  
  
  constructor(private activatedRoute: ActivatedRoute, private usersService : UsersService, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.getUserById(this.id)
    .subscribe({
      next: res => {
        this.user = res;
        this.initForm.username = this.user.username
        this.initForm.fullname = this.user.name
        this.initForm.email = this.user.email
      }  
    })
  }

  notValid(field: string): boolean {
    return this.updatedForm?.controls[field]?.invalid && this.updatedForm?.controls[field]?.touched

  }

  getUser() {
    this.usersService.getUserById(this.id)
    .subscribe({
      next: res => {
        this.user = res;
      }  
    })
  }

  editUser() {
    this.json.username = this.updatedForm.value.username;
    this.json.name = this.updatedForm.value.fullname;
    this.json.email = this.updatedForm.value.email;
    this.json.password = this.updatedForm.value.password;
    this.usersService.editUser(this.json)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario editado',
          confirmButtonColor: '#8d448b'
        })
        if(this.authService.isAdminGuard()) {
          this.router.navigate(['/user']);
        }else {
          this.router.navigate(['']);
        }
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Usuario no editado',
          confirmButtonColor: '#8d448b'
        })
        this.router.navigate(['/user']);
      }
    })
  }

  checkPassword(): boolean {
    if (this.updatedForm?.controls["repassword"]?.touched && this.updatedForm?.controls["password"]?.touched) {
      return this.updatedForm?.controls["repassword"].value != this.updatedForm?.controls["password"].value
    } else {
      return false;
    }
  }
}
