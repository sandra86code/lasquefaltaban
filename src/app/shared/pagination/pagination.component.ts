import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: ['span  { color: white; background-color: #8d448b !important; border-color: #8d448b !important;} button {border-color: #8d448b !important; color: #8d448b !important}']
})
export class PaginationComponent implements OnInit {

  @Input() totalPages: number = 0;
  @Output() selectPage: EventEmitter<number> = new EventEmitter();
  
  pages: number[] = [];
  selected: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.pages = new Array(this.totalPages);
  }

  ngOnChanges(): void {
    this.pages = new Array(this.totalPages);
  }

  /**
   * Método que emite el evento cuando se clica en otro número de paǵina en
   * el paginador
   * @param selection 
   */
  onSelect(selection: number) {
    this.selected = selection;
    this.selectPage.emit(this.selected);
  }

}
