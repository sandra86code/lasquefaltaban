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
    //Mínimo Irán (5 caracteres) y máximo Santa Lucía y las Granadinas (27 caracteres)
    name: [this.name, [Validators.required, Validators.minLength(5), Validators.maxLength(27)]],
    description: [this.description, [Validators.required, Validators.minLength(100)]]
  })

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getCountryById(this.id)
      .subscribe({
        next: res => {
          this.country = res;
          this.myForm.setValue({
            name: this.country.name.replace("Situación de las mujeres en ", ""),
            description: this.country.description
          })
        }
      })
  }

  /**
   * Método que controla si los campos del formulario son válidos
   * @param field - campo del formulario
   * @returns true si el campo es correcto, false si no lo es
   */
  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  /**
   * Método que edita un país
   * @param fileInput 
   */
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
            console.log(error)
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

  /**
   * Método que devuelve a la última página visitada en la aplicación
   */
  goBack() {
    window.history.back();
  }

}
