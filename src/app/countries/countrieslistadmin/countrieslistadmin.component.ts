import { CountriesService } from '../services/countries.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-countrieslistadmin',
  templateUrl: './countrieslistadmin.component.html',
  styles: ['h1 {color: #8d448b; } .btn-success {font-size: 20px; font-weight: bold;} .q-name { width: 300px;} .q-actions { width: 250px;} .separation{margin-bottom: 8rem}']
})
export class CountrieslistadminComponent implements OnInit {

  constructor(private countryService: CountriesService) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  countries!: any;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.countries = this.countryService.getCountriesList()
    .subscribe({
      next: (data) => {
        this.countries = data;
        this.dtTrigger.next(this.countries);
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: error,
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

  deleteCountry(id: number) {
    console.log("entra en deleteCountry")
    this.countryService.deleteCountry(id)
    .subscribe({
      next: (data: any) => {
        this.countries = data;
        Swal.fire({
          icon: 'success',
          title: 'País borrado',
          confirmButtonColor: '#8d448b'
        })
        this.ngOnDestroy();
        this.ngOnInit();
      },
      error: (_error: any)=>{
        Swal.fire({
          icon: 'error',
          title: 'País no borrado',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

  /**
   * Método que se desuscribe del evento
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
