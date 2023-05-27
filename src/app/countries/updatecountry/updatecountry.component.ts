import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-updatecountry',
  templateUrl: './updatecountry.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ cursor: pointer;}']
})
export class UpdatecountryComponent implements OnInit {

  constructor(private service: CountriesService, private route: Router, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  name: string = ""
  description: string = ""

  id: any;

  country!: any;
  myForm: FormGroup = this.fb.group({
    name: [this.name, [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
    description: [this.description, [Validators.required, Validators.minLength(100)]]
  })

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getCountryById(this.id)
      .subscribe({
        next: res => {
          this.country = res;
          this.myForm.setValue({
            name: this.country.name,
            description: this.country.description
          })
        }
      })
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  editCountry(fileInput: any) {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      let fi = fileInput;
      let fileToUpload = null;
      if (fileInput!=null && fi.files && fi.files[0]) {
        fileToUpload = fi.files[0];
      }
      this.service.editCountry(this.country.id, this.myForm.value.name, this.myForm.value.description, fileToUpload)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'País editado',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/country/list')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'País no editado',
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
