import { Component, inject, OnInit } from '@angular/core';
import { MotoGPService } from '../../../Services/MotoGP/moto-gp.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Pilote, Saison } from '../../../Models/MotoGP';
import { Categorie, Epreuve, Resultatat, Sprint } from '../../../Models/MotoGP';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ResultatsComponent } from '../resultats/resultats.component';
import { ViewpilotesComponent} from '../Pilotes/ViewPilotes/viewpilotes/viewpilotes.component';

@Component({
  selector: 'app-moto-gp',
  standalone: true,
  imports: [
            CommonModule,
            MatButtonModule,
            MatTableModule,
            MatGridListModule,
            MatFormField,
            MatLabel,
            MatSelect,
            MatOption,
            MatIcon,
            ResultatsComponent,
            ViewpilotesComponent
  ],
  templateUrl: './moto-gp.component.html',
  styleUrl: './moto-gp.component.css'
})
export class MotoGPComponent implements OnInit {
  motoGP = inject(MotoGPService);
  origine: number = 1949;
  selectedYear: number = 0;
  courant = this.origine;
  saisons: number[] = [];
  saison: Saison = new Saison("", "", 0, false);
  public categories: Categorie[] = [];
  public epreuves: Epreuve[] = [];
  public epreuve: Epreuve | null = new Epreuve("", "", "", "", "", 0, "", 0, "", 0, "", 0, "", 0, "", "", 0, "", "", 0, "", "", "");
  public sessions: any[] = [];
  public sessionsSprint: Sprint[] = [];
  public resultats: Resultatat[] = [];
  public pilotes: Pilote[] = [];
  
  public titresColumns: string[] = ['Du', 'Au', 'Circuit', 'Pays'];
  public displayedColumns: string[] = ['date_start', 'date_end', 'circuit_name', 'country_name'];
  public columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  ngOnInit(): void {

   while (this.courant <= new Date().getFullYear()) {
      this.saisons.push(this.courant++);
    }
    this.selectedYear = this.saisons[this.saisons.length - 1];

    this.InitData(this.selectedYear);
  }

  onChangeSaison(event: any) {
    this.epreuves = [];
    this.sessions = [];
    this.resultats = [];
    this.pilotes = [];

    this.InitData(event.value);
  }

  InitData(year: number) {
    this.motoGP.getSaison(year).subscribe({
      next: (data) => {
        console.error('Récupération des épreuves de la saison')
        this.saison = data[0] 
     },
     error: (error) => 
        console.error('Erreur lors de la récupération de la saison:\r', error),
     complete: () => {
        console.log('Saison récupérée avec succès! ' + this.saison.year)
        this.motoGP.getEpreuvesSaison(this.saison.year).subscribe({
        next: (data) => 
            this.epreuves = data,  
        error: (error) => 
            console.error('Erreur lors de la récupération des épreuves:\r', error),
        complete: () => {
            this.epreuves.sort((a, b) => a.date_start.localeCompare(b.date_start)),
            this.epreuves.forEach((epreuve) => {
              epreuve.date_start = new Date(epreuve.date_start).toLocaleDateString('fr-FR'),
              epreuve.date_end = new Date(epreuve.date_end).toLocaleDateString('fr-FR')
            });
            this.motoGP.getCategories(this.saison.year).subscribe({
              next: (data) => {
              this.categories = data;
            },
            error: (error) => 
              console.error('Erreur lors de la récupération des catégories:\r', error),
            complete: () => {
              console.log(this.categories.length + ' Categories récupérées avec succès! ')
              }
            });
          }
        });
      }
    });

  }

   /** Checks whether an element is expanded. */
  isExpanded(element: Epreuve) {
    return this.epreuve === element;
  }

  toggle(element: Epreuve) {
    this.resultats = [];
    this.epreuve = this.isExpanded(element) ? null : element;
  }

  resultat(idCategorie: string, idElement: string) { 
    this.sessions = [];
    this.resultats = [];
    this.pilotes = [];

    this.motoGP.getSessions(this.saison.year, idCategorie, idElement).subscribe({
      next: (data) => {
        this.sessions = data;
      },
      error: (error) => 
        console.error('Erreur lors de la récupération des sessions:\r', error),
      complete: () => {
        console.log('Sessions récupérées avec succès! '),
        this.motoGP.getResultats( this.saison.year, this.sessions[0].id, idElement).subscribe({
          next: (data) => {
            this.resultats = data
          },
          error: (error) => 
            console.error('Erreur lors de la récupération des resultats:\r', error),
          complete: () => {
            console.log('Resultats récupérés avec succès! ')
          }
        });
      }
    });
  }

  onClassementPilotes(idCategorie: string) {
    this.sessions = [];
    this.resultats = [];
    this.pilotes = [];

    this.motoGP.getPilotes(this.saison.year.toString(), idCategorie).subscribe({
      next: (data) => {
        this.pilotes = data;
      },
      error: (error) => 
        console.error('Erreur lors de la récupération des sessions:\r', error),
      complete: () => {
        console.log('Sessions récupérées avec succès! '),
        this.motoGP.getPilotes( this.saison.year.toString(), idCategorie).subscribe({
          next: (data) => {
            this.pilotes = data
          },
          error: (error) => 
            console.error('Erreur lors de la récupération des resultats:\r', error),
          complete: () => {
            console.log('Resultats récupérés avec succès! ')
            this.pilotes.forEach((pilote) => {
              pilote.categoryid = idCategorie
            });
          }
        });
      }
    });
  }
}

