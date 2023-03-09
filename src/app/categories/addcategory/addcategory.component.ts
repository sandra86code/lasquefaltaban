import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ Cursor: pointer;}']
})
export class AddcategoryComponent implements OnInit {

  constructor(private service: CategoryService, private route: Router, private fb: FormBuilder) { }

  name: string = ""

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
  })

  ngOnInit(): void {
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  addCategory() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.addCategory(this.myForm.value.name)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Categoría añadida',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/category')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Categoría no añadida',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/category')
          }
        })
    }
  }

  goBack() {
    window.history.back();
  }
}
