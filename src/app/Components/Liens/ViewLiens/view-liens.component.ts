import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { LiensService } from '../../../Services/Liens/liens-service';
import { Lien } from '../../../Models/Lien';

@Component({
  selector: 'app-view-liens',
  standalone: true,
  imports: [
        CommonModule,
        MatGridList,
        MatGridTile,
        MatTableModule,
        MatGridListModule,
    
  ],
  templateUrl: './view-liens.component.html',
  styleUrl: './view-liens.component.css'
})
export class ViewLiensComponent implements OnInit {
  private liensService = inject(LiensService);
  titre = 'Liens';
  // Liste des liens à afficher
  public liens: Lien[] = [];

  constructor() { }

  ngOnInit(): void {
      //Charger la liste des liens
      this.liensService.getLiens('Liens').subscribe((l: Lien[]) => {
        this.liens = l;
    });

  }
}
