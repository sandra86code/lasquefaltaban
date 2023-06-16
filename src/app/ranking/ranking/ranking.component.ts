import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RankingService } from '../service/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styles: ['h1 {color: #8d448b; } img {width: 300px}']
})
export class RankingComponent implements OnInit {

  constructor(private rankingService : RankingService) { }

  ranking: any[] = [];

  ngOnInit(): void {
    this.rankingService.getRanking()
    .subscribe({
      next: (resp) => {
        if (resp) {
          if(resp.length<=10) {
            this.ranking = resp;
          }else {
            this.ranking = resp.slice(0,10);
          }
        }
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error al recuperar el ranking',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

}
