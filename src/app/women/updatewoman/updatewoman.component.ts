import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { WomanService } from '../service/woman.service';

@Component({
  selector: 'app-updatewoman',
  templateUrl: './updatewoman.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ cursor: pointer;}']
})
export class UpdatewomanComponent implements OnInit {

  constructor(private service: WomanService, private route: Router, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  name: string = ""
  description: string = ""

  id: any;

  woman!: any;
  myForm: FormGroup = this.fb.group({
    name: [this.name, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    description: [this.description, [Validators.required, Validators.minLength(100)]]
  })

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getWomanById(this.id)
      .subscribe({
        next: res => {
          this.woman = res;
          this.myForm.setValue({
            name: this.woman.name,
            description: this.woman.description
          })
        },
        error:(error) =>{
          Swal.fire({
            icon: 'error',
            title: 'Error al recuperar la mujer',
            confirmButtonColor: '#8d448b'
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
   * Método que edita a una mujer
   */
  editWoman() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.editWoman(this.woman.id, this.myForm.value.name, this.myForm.value.description)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Mujer editada',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/woman')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Mujer no editada',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/woman')
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
