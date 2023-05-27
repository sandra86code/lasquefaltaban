import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../service/category.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styles: ['h1 {color: #8d448b; } .btn-success {font-size: 20px; font-weight: bold;}']
})
export class CategorylistComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  
  
  categories!: any;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

      
    this.categories = this.categoryService.getCategories()
    .subscribe({
      next: (data) => {
        this.categories = data;
        this.dtTrigger.next(this.categories);
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

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Categoría borrada',
          confirmButtonColor: '#8d448b'
        })
        this.ngOnDestroy();
        this.ngOnInit();
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Categoría no borrada',
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
