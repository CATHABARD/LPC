import { Component, inject, OnInit } from '@angular/core';
import { Chaine } from '../../../Models/Chaine';
import { ChainesService } from '../../../Services/Chaines/chaines.service';

@Component({
  selector: 'app-view-chaines',
  standalone: true,
  imports: [],
  templateUrl: './view-chaines.component.html',
  styleUrl: './view-chaines.component.css'
})
export class ViewChainesComponent implements OnInit {
  chainesService = inject(ChainesService);

  // Déclaration des variables
  public chaine: string = '';
  public chaineList: Chaine[] = [];

  constructor() {}

  ngOnInit() {
    // Initialisation de la liste des chaînes
    /*this.chainesService.GetListeChaines().subscribe({
      next: (data: Chaine[]) => {
        this.chaineList = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des chaînes:', error);
      }
    });*/
  }

  // Méthode pour ajouter une chaîne à la liste
  addChaine(): void {

  }

}
