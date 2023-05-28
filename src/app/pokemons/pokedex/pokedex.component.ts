import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  constructor(private router : Router) {  }

  editTeamSubject: Subject<void> = new Subject<void>();
  @ViewChild('team') team!: MatSidenav;
  user: string | null = null;
  refreshToken : string | null = null;

  ngOnInit(): void {
    sessionStorage.clear();
    this.user = localStorage.getItem('access_token')
    this.refreshToken = localStorage.getItem('refresh_token')
  }

  editTeam() : void {
    this.editTeamSubject.next();
  }

  disconnect(): void {
    this.team.close()
    setTimeout(() =>{
      localStorage.removeItem("access_token");
      localStorage.removeItem("team");
      this.user = null;
      this.ngOnInit();
    }, 500);
  }

  logIn() : void {
    this.router.navigate(['/login', {source: this.router.url}]);
  }

}
