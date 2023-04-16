import { CountriesService } from '../services/countries.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-countrieslistadmin',
  templateUrl: './countrieslistadmin.component.html',
  styles: ['h1 {color: #8d448b; } .btn-success {font-size: 20px; font-weight: bold;}']
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
    this.countries.deleteCountry(id)
    .subscribe({
      next: (data: any) => {
        this.countries = data;
        Swal.fire({
          icon: 'success',
          title: 'País borrado',
          confirmButtonColor: '#8d448b'
        })
        .then((result) => {
          location.reload();
        })
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
