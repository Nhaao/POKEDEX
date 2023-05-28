import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedData } from '../models/paged-data.model';
import { PokemonDetail } from '../models/pokemon-detail.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url = "http://pokedex-api.cleverapps.io";
  constructor(private Httpclient:HttpClient) {

   }

  getPokemons(offset: number):Observable<PagedData<Pokemon>>{
    return this.Httpclient.get<PagedData<Pokemon>>(this.url+"/pokemons?offset=" + offset);
  }

  getPokemonsById(id:number):Observable<PokemonDetail>{
    return this.Httpclient.get<PokemonDetail>(this.url+"/pokemons/"+id);
  }

  searchPokemon(term: string, offset: number): Observable<PagedData<Pokemon>> {
    return this.Httpclient.get<PagedData<Pokemon>>(this.url+"/pokemons?search=" + term + "&offset=" + offset);
  }


}
