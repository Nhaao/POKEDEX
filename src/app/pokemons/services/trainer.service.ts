import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Login } from '../models/login.model';
import { PokemonDetail } from '../models/pokemon-detail.model';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  url = "http://pokedex-api.cleverapps.io";
  constructor(private Httpclient:HttpClient, private pokemonService:PokemonService) {
 
  }

  login(email: string, password: string):Observable<Login>{
    const body = { email: email, password: password }
    return this.Httpclient.post<Login>(this.url+"/auth/login", body);
  }

  getTeam():Observable<PokemonDetail[]>{
    let headers = new HttpHeaders();
    let token = localStorage.getItem('access_token');
    headers = headers.set('Authorization', 'Bearer '+token);
    return this.Httpclient.get<number[]>(this.url+"/trainers/me/team",{headers: headers}).pipe(
      switchMap(ids=>{
        const obsPok= ids.map(id=>this.pokemonService.getPokemonsById(id));
        return forkJoin(obsPok);
      })
    )
  }

  setTeam(body:number[]){
    let headers = new HttpHeaders();
    let token = localStorage.getItem('access_token');
    headers = headers.set('Authorization', 'Bearer '+token);
    return this.Httpclient.put(this.url+"/trainers/me/team",body,{headers: headers});
  }

}
