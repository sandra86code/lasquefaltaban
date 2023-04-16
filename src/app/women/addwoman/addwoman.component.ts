import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WomanService } from '../service/woman.service';

@Component({
  selector: 'app-addwoman',
  templateUrl: './addwoman.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ cursor: pointer;}']
})
export class AddwomanComponent implements OnInit {

  constructor(private service: WomanService, private route: Router, private fb: FormBuilder) { }

  name: string = ""
  description: string = ""

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(100)]]
  })

  ngOnInit(): void {
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  addWoman() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.addWoman(this.myForm.value.name, this.myForm.value.description)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Mujer añadida',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/woman')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Mujer no añadida',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/woman')
          }
        })
    }
  }

  goBack() {
    window.history.back();
  }
}
