import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CountriesService } from '../services/countries.service';


@Component({
  selector: 'app-addcountry',
  templateUrl: './addcountry.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ cursor: pointer;}']
})
export class AddcountryComponent implements OnInit {

  constructor(private service: CountriesService, private route: Router, private fb: FormBuilder) { }

  name: string = ""
  description: string = ""

  myForm: FormGroup = this.fb.group({
    //Mínimo Irán (5 caracteres) y máximo Santa Lucía y las Granadinas (27 caracteres)
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(27)]],
    description: ['', [Validators.required, Validators.minLength(100)]]
  })

  ngOnInit(): void {
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  addCountry(fileInput: any) {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      let fi = fileInput;
      let fileToUpload = null;
      if (fileInput!=null && fi.files && fi.files[0]) {
        fileToUpload = fi.files[0];
      }
      this.service.addCountry(this.myForm.value.name, this.myForm.value.description, fileToUpload)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'País añadido',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/country/list')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'País no añadido',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/country/list')
          }
        })
    }
  }

  goBack() {
    window.history.back();
  }
}
