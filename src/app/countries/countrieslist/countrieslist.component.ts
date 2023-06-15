import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ShowingService } from '../services/showing.service';

@Component({
  selector: 'app-countrieslist',
  templateUrl: './countrieslist.component.html',
  styles: ['.card-title { color: #5e1f5d; font-weight: bold; } h1 {color: #8d448b; } .card-text {font-size: 1.2rem; }.img-title { width: 90px;} img {width: 300px}']

})
export class CountrieslistComponent implements OnInit {

  countries: any = {
    content: [],
    last: false,
    first:true,
    totalPages:0,
    totalElements:0,
    size:0,
    number:0,
    numberOfElements:0
  };

  
  constructor(private countriesService: CountriesService, private showingService: ShowingService) { 
  }

  ngOnInit(): void {
    this.showingService.show();

    this.countriesService.getCountries()
      .subscribe({
        next: (resp) => {
          this.countries = resp
        }
      })
  }

  /**
   * Método que devuelve los países paginados
   * @param page 
   */
  getCountryPage(page: number) {
    this.countries = [];
    this.countriesService.getCountries(page)
    .subscribe({
      next:(resp) => {
        this.countries = resp;
      },
      error:(error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Error al recuperar los países',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

}


