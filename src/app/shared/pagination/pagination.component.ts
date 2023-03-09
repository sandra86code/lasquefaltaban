import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
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

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = new Array(this.totalPages);
  }

  onSelect(selection: number) {
    this.selected = selection;
    this.selectPage.emit(this.selected);
  }

}
