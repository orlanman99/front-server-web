import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListComponent } from './game-list.component';
import { GamesService } from '../../services/games.service';
import { throwError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Game } from 'src/app/models/Game';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  let game:Game = {
    id : '2',
    title : ' lol',
    description : 'lol',
    image : 'lol',
    created_at : new Date() 
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ GameListComponent ],
      providers: [GamesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Llamando a getGames()', () => {
    it('Debe crear', () => {
      spyOn(component.gameService, 'getGames').and.returnValue(throwError({error : 'error'}));
      component.getGames(); 
      expect(component.error).toBeTruthy();
    });

    it('Sin error', () => {
      const users = [1,2,3];
      spyOn(component.gameService, 'getGames').and.returnValue(of( game ));
      component.getGames();
      expect(component.games).toEqual(game);
    });
  });
  

  describe('Lamando a deleteGame()', () => {
    it('sin error', () => {
      spyOn(component.gameService, 'deleteGame').and.returnValue(of({error : 'error'}))
      component.deleteGame(game.id);
      expect(component.error).toBeFalsy();
    });

    it('Debe crear', () => {
      spyOn(component.gameService, 'deleteGame').and.returnValue(throwError({error : 'error'}));
      component.deleteGame(game.id);
      expect(component.error).toBeTruthy();
    });
  });

});
