import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styles: ['h1 {color: #8d448b; } ']
})
export class GameListComponent implements OnInit {

  constructor(private gameService: GameService) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  games!: any;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.games = this.gameService.getGames()
    .subscribe({
      next: (data) => {
        this.games = data
        this.dtTrigger.next(this.games);
      },
      error: (error)=>{
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
