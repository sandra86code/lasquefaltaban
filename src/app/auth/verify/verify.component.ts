
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.authService.verify()
    .subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Cuenta activada',
          confirmButtonColor: '#8d448b'
        })
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Verificación de usuario incorrecta',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

}
