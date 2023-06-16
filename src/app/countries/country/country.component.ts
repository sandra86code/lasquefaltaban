import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { CountriesService } from '../services/countries.service';
import { Country } from '../interfaces/countries.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: ['h1 {color: #5e1f5d; } img {width: 40rem} .material-symbols-outlined {font-size: 3rem; color: #5e1f5d; } .material-symbols-outlined:hover{ cursor: pointer;} p{margin-bottom: 40px; } .descr{text-align: justify!important;} img.loading {width: 300px}'] 
})
export class CountryComponent implements OnInit {

  id: any;
  country!: Country;

  countryName: String = "a";
  
  windowScrolled = false;

  constructor(private activatedRoute: ActivatedRoute, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.countriesService.getCountryById(this.id)
      .subscribe({
        next: res => {
          this.country = res;
          this.countryName = this.country.name;
        },
        error:(error) =>{
          Swal.fire({
            icon: 'error',
            title: 'Error al recuperar el país',
            confirmButtonColor: '#8d448b'
          })
        }  
      })

      window.addEventListener('scroll', () => {
        this.windowScrolled = window.pageYOffset !== 0;
      });
  }

  /**
   * Método que devuelve a la última página visitada en la aplicación
   */
  goBack() {
    window.history.back();
  }

  /**
   * Método que hace scroll hacia arriba
   */
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  
}
