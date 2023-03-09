import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: ['footer { background-color: #300730; color: white; } .foot-item-size {font-size: 0.8rem !important; }'] 
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
