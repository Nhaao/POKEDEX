import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Router } from '@angular/router';
import { TrainerService } from '../services/trainer.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private trainerService:TrainerService, private router: Router) { }

  private eventsSubscription: Subscription = new Subscription;
  @Input() teamEdited!: Observable<void>;
  teamList: Pokemon[]=[];
  @Output() logOutEvent = new EventEmitter();
  removeToggle: boolean = false;

  ngOnInit(): void {
    localStorage.setItem("team", "[]");
    this.eventsSubscription = this.teamEdited.subscribe(() => this.editTeam());
    this.trainerService.getTeam().subscribe(res=>{
      this.teamList=res;
      localStorage.setItem("team", JSON.stringify(this.teamList));    
    });
  }

  editTeam() {
    this.teamList = JSON.parse(localStorage['team']);
    let team: number[] = [];
    this.teamList.forEach(function (pokemon) {
      team.push(pokemon.id);
    });

    this.trainerService.setTeam(team).subscribe(res=>{
    });
  }
  
  logOut() : void {
    this.logOutEvent.emit();
  }

}
