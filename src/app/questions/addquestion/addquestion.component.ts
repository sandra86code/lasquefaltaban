import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ Cursor: pointer;}']
})
export class AddquestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  goBack() {
    window.history.back();
  }
}
