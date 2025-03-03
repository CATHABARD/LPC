import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ViewAgendaComponent } from '../../agenda/ViewAgenda/view-agenda.component';
import { LiensService } from '../../Services/Liens/liens-service';
import { Lien } from '../../Modeles/Lien';

@Component({
  selector: 'app-view-liens',
  standalone: true,
  imports: [
        CommonModule,
        MatTabGroup,
        MatTab,
        MatGridList,
        MatCard,
        MatGridTile,
        MatCardTitle,
        MatCardHeader,
        MatCardContent,
        MatTableModule,
        MatGridListModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        ViewAgendaComponent,
        ViewLiensComponent
    
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
