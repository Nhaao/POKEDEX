import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonDetail } from '../models/pokemon-detail.model';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private pokemonService:PokemonService, private router: Router, private actRoute: ActivatedRoute) {
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  id ?: number;
  @Output() editTeamEvent = new EventEmitter();
  pokemon?: PokemonDetail;
  team: Pokemon[] | null = null;
  isInTeam: boolean = false;

  playSound() {
    let sound = new Audio;
    sound.src = "../assets/audio/" + this.id + ".mp3";
    sound.play();
  }

  loadDetails(): void {
    this.id=Number(this.actRoute.snapshot.paramMap.get('id'));
    if(this.id != 0)
      this.pokemonService.getPokemonsById(this.id).subscribe(res => {this.pokemon = res});
  }

  addToTeam() : void {
    if(this.team != null && this.team.length < 6 && this.id && this.pokemon) {
      let pokemon : Pokemon = {
        id : this.id,
        name : this.pokemon.name,
      };
      this.team.push(pokemon);
      localStorage.setItem("team", JSON.stringify(this.team));
      this.checkTeam();
      this.editTeamEvent.emit();
    }
  }

  deleteFromTeam() : void {
    if(this.team != null) {
      let index
      for(let i = 0; i < this.team.length; i++) {
        if(this.team[i].id == this.id) {
          index = i;
          break;
        }
      }
      if(index != undefined) {
        this.team.splice(index, 1);
        localStorage.setItem("team", JSON.stringify(this.team));
        this.checkTeam();
        this.editTeamEvent.emit();
      }
    }
  }

  checkTeam() : void {
    if(localStorage.getItem("team") != null) {
      this.team = JSON.parse(localStorage['team']);
      console.log(this.team);
      console.log(this.team?.length);
      if(this.team?.find(x => x.id === this.id)) {
        this.isInTeam = true;
      } else {
        this.isInTeam = false;
      }
    }
  }

  ngOnInit(): void {

    this.loadDetails();
    this.checkTeam();

  }
}
