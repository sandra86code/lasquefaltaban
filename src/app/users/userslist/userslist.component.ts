import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styles: ['h1 {color: #8d448b; } ']
})
export class UserslistComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  users!: any;
  dtTrigger: Subject<any> = new Subject<any>();



  json: any = {
    username: '',
    name: '',
    email: ''
  }

  constructor(private httpClient: HttpClient, private usersService: UsersService, private router: Router) { 

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.usersService.getUsers()
      .subscribe({
        next: (data) => {
          this.users = data;
          this.dtTrigger.next(this.users);
        },
        error: (error)=>{
        }
      })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  deleteUser(username: string) {
    this.usersService.deleteUser(username)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario borrado',
          confirmButtonColor: '#8d448b'
        })
        .then((result) => {
          location.reload();
        })
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Usuario no borrado',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

  editUser(username: string, name: string, email: string, role: string) {
    this.json.username = username;
    this.json.name = name;
    this.json.email = email;

    this.usersService.editUser(this.json)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario editado',
          confirmButtonColor: '#8d448b'
        })
        this.router.navigate(['/user']);
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

}
