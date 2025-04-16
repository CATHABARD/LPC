import { Component, input } from '@angular/core';
import { Resultatat } from '../../../Models/MotoGP';

@Component({
  selector: 'app-resultats',
  standalone: true,
  imports: [],
  templateUrl: './resultats.component.html',
  styleUrl: './resultats.component.css'
})
export class ResultatsComponent {
  resultats = input<Resultatat[]>({} as Resultatat[]);
    
  constructor() {

  }

}
