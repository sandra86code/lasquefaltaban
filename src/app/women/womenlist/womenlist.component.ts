import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { WomanService } from '../service/woman.service';

@Component({
  selector: 'app-womenlist',
  templateUrl: './womenlist.component.html',
  styles: ['h1 {color: #8d448b; } .q-name { width: 500px;}']
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
        .then((result) => {
          location.reload();
        })
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
