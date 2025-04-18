import { Component, inject, OnInit } from '@angular/core';
import { MotoGPService } from '../../../../../Services/MotoGP/moto-gp.service';

@Component({
  selector: 'app-view-teams',
  standalone: true,
  imports: [ ],
  templateUrl: './view-teams.component.html',
  styleUrl: './view-teams.component.css'
})
export class ViewTeamsComponent implements OnInit {
  motoGP = inject(MotoGPService);

  teams: any[] = [];

  ngOnInit() {
    this.motoGP.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des teams ', error);
      },
      complete: () => { 
        console.log('Teams chargés avec succès! ' + this.teams.length);
      }
    });
  } 


}
