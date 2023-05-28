import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  constructor(private pokemonService:PokemonService) { }

  sum: number = 0;
  pokemonsList: Pokemon[]=[];
  pokemonsDisplayed: Pokemon[]=[];
  searchResult: Pokemon[]=[];
  searchInput: string = "";
  searchSum: number = 0;

  ngOnInit(): void {
    this.pokemonService.getPokemons(this.sum).subscribe(res=>{this.pokemonsList=res.data;
      this.pokemonsDisplayed = this.pokemonsList;
    });
    
  }

  onScroll(){
    if (this.searchInput.trim()) {
      this.searchSum += 10;
      this.pokemonService.searchPokemon(this.searchInput, this.searchSum).subscribe(res => {
        this.searchResult = this.searchResult.concat(res.data);
        this.pokemonsDisplayed = this.searchResult;
      });
    }
    else {
      this.sum += 10;
      this.pokemonService.getPokemons(this.sum).subscribe(res => {this.pokemonsList = this.pokemonsList.concat(res.data);
        this.pokemonsDisplayed = this.pokemonsList;
      });
    }
  }

  search(term:string) {
    this.searchSum = 0;
    if (!term.trim()) {
      this.pokemonsDisplayed = this.pokemonsList;
      this.searchInput = "";
    }
    if (term.trim()) {
      this.searchInput = term;
      this.pokemonService.searchPokemon(term, this.searchSum).subscribe(res => {this.searchResult = res.data;
        this.pokemonsDisplayed = this.searchResult;
      });
    }
    
  }

}
