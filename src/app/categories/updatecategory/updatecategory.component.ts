import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ cursor: pointer;}']
})
export class UpdatecategoryComponent implements OnInit {

  constructor(private service: CategoryService, private route: Router, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  name: string = ""

  id: any;

  category!: any;
  myForm: FormGroup = this.fb.group({
    name: [this.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
  })

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getCategoryById(this.id)
      .subscribe({
        next: res => {
          this.category = res;
          this.myForm.setValue({
            name: this.category.name,
          })
        }
      })
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  editCategory() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.editCategory(this.category.id, this.myForm.value.name)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Categoría editada',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/category')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Categoría no editada',
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
