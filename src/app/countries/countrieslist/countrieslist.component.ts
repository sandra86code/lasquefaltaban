import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Country } from '../interfaces/countries.interface';
import { CountriesService } from '../services/countries.service';
import Swal from 'sweetalert2';
import { Page } from 'src/app/shared/pagination/pagination.interface';

@Component({
  selector: 'app-countrieslist',
  templateUrl: './countrieslist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['.card-title { color: #5e1f5d; font-weight: bold; } h1 {color: #8d448b; } .card-text {font-size: 1.2rem; }.img-title { width: 90px;} img {width: 300px}']

})
export class CountrieslistComponent implements OnInit {

  countriesRes: Page<Country> = {
    content: [],
    last: false,
    first: true,
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    numberOfElements: 0
  };

  countries!: Country[];

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    console.log(this.countries)
    this.countriesService.getCountries()
      .subscribe({
        next: (resp) => {
          this.countriesRes.totalPages = resp.totalPages
          this.countriesRes.totalElements = resp.totalElements
          this.countriesRes.numberOfElements = resp.numberOfElements
          this.countriesRes.number = resp.number
          this.countriesRes.size = resp.size
          this.countries = resp.content
        }
      })
  }


  getCountryPage(page: number) {
    console.log(page)
    this.countriesService.getCountries(page)
    .subscribe({
      next:(resp) => {
        console.log(this.countries)
        
        this.countries = resp.content;
        this.countriesRes.number = resp.number
        console.log(this.countries)
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


