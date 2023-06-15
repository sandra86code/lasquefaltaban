import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { CountriesService } from '../services/countries.service';
import { Country } from '../interfaces/countries.interface';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: ['h1 {color: #5e1f5d; } img {width: 40rem} .material-symbols-outlined {font-size: 3rem; color: #5e1f5d; } .material-symbols-outlined:hover{ cursor: pointer;} p{margin-bottom: 40px; } .descr{text-align: justify!important;}'] 
})
export class CountryComponent implements OnInit {

  id: any;
  country!: Country;

  countryName: String = "a";
  
  
  constructor(private activatedRoute: ActivatedRoute, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.countriesService.getCountryById(this.id)
      .subscribe({
        next: res => {
          this.country = res;
          this.countryName = this.country.name;
        }  
      })
  }

  /**
   * Método que devuelve a la última página visitada en la aplicación
   */
  goBack() {
    window.history.back();
  }
  
}
