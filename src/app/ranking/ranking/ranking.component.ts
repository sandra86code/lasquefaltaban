import { Component, OnInit } from '@angular/core';
import { RankingService } from '../service/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styles: ['h1 {color: #8d448b; }']
})
export class RankingComponent implements OnInit {

  constructor(private rankingService : RankingService) { }

  ranking: any[] = [];

  ngOnInit(): void {
    this.rankingService.getRanking()
    .subscribe({
      next: (resp) => {
        if (resp) {
          if(resp.length<=3) {
            this.ranking = resp;
          }else {
            this.ranking = resp.slice(0,3);
          }
        }
      }
    })
  }

}
