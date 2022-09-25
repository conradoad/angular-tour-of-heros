import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'

  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient
  ) { }

  private log (message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    const heroes = this.httpClient.get<Hero[]>(this.heroesUrl);
    this.log('fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero|undefined> {
    const hero = of(HEROES.find(hero => hero.id === id));
    this.log('fetched hero id=${id}');
    return hero;
  }
}
