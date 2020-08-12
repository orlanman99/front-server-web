import { Component, OnInit, HostBinding } from '@angular/core';
import {GamesService} from '../../services/games.service'
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
  export class GameListComponent implements OnInit {
  @HostBinding('class') classes = 'row'; 
  
  games:Game;
  error:Boolean;
  constructor(public gameService:GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gameService.getGames()
      .subscribe(
        res => {
          this.games = res;
        },
        err => {
          console.error(err);
          this.error = true;
        }
        
      );
  }
  deleteGame(id: string | number) {
    this.gameService.deleteGame(id)
      .subscribe(
        res => {
          console.log(res);
          this.getGames();
          this.error = false;
        },
        err => {
          this.error = true;
          console.error(err)
        }
      )
  }

}
