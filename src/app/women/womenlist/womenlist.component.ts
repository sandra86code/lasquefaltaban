import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { WomanService } from '../service/woman.service';

@Component({
  selector: 'app-womenlist',
  templateUrl: './womenlist.component.html',
  styles: ['h1 {color: #8d448b; } .q-name { width: 300px;} .q-actions { width: 250px;} .btn-success {font-size: 20px; font-weight: bold;} .separation{margin-bottom: 8rem}']
})
export class WomenlistComponent implements OnInit {

  constructor(private womanService: WomanService) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  women!: any;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.women = this.womanService.getWomen()
    .subscribe({
      next: (data) => {
        this.women = data
        this.dtTrigger.next(this.women);
      },
      error: (error)=>{
      }
    })

  }

  deleteWoman(id: number) {
    this.womanService.deleteWoman(id)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Mujer borrada',
          confirmButtonColor: '#8d448b'
        })
        this.ngOnDestroy();
        this.ngOnInit();
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Mujer no borrada',
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
