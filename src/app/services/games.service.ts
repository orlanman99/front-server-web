import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Game} from '../models/Game';


@Injectable({
  providedIn: 'root'
})
export class GamesService {
  API_URI = 'http://localhost:3000/api';
  constructor(private htpp: HttpClient) { }

  getGames(){
    return this.htpp.get(`${this.API_URI}/games`);
  }

  getGame(id: string){
    return this.htpp.get(`${this.API_URI}/games/${id}`);
  }

  deleteGame(id:string | number){
    return this.htpp.delete(`${this.API_URI}/games/${id}`);
  }

  saveGame(game: Game){
    console.log(this.htpp.post(`${this.API_URI}/games`, game));
    return this.htpp.post(`${this.API_URI}/games`, game);
  }

  updateGame(updateGame : Game){
    return this.htpp.put(`${this.API_URI}/games/${updateGame.id}`, updateGame);

  }




}
