import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: ['.error-details { font-size: 1.7rem } .btn {font-size: 1.25rem; padding-left: 30px; padding-right: 30px;}']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
