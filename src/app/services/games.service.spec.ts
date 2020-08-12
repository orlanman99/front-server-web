import { TestBed, getTestBed } from '@angular/core/testing';

import { GamesService } from './games.service';

import {GameFormComponent} from '../components/game-form/game-form.component'
import { Game } from '../models/Game';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('GamesService', () => {
 
  let injector: TestBed;
  let httpMock: HttpTestingController;
  
  let service: GamesService;

  let game:Game = {
    id : '1',
    title : ' lol',
    description : 'lol',
    image : 'lol',
    created_at : new Date() 
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);

    service = TestBed.inject(GamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Retornara un juego', () => {

    const Service: GamesService = TestBed.get(GamesService);
    service.getGames().subscribe( games => {
      expect(games).toEqual(game);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/games');
    expect(req.request.method).toBe('GET');
    req.flush(game);


  });

  it('eliminar juego', () =>{
    const Service: GamesService = TestBed.get(GamesService);
    service.deleteGame(game.id).subscribe(games => {
      expect(games).toEqual(game.id);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/games/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(game.id);

  });
  

});
