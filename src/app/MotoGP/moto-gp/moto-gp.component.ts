import { Component, inject, OnInit } from '@angular/core';
import { MotoGPService } from '../../Services/MotoGP/moto-gp.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Saison } from '../../Modeles/MotoGP';
import { Categorie, Epreuve, EpreuveFutures, Resultatat, Sprint } from '../../Modeles/MotoGP';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ResultatsComponent } from '../resultats/resultats.component';

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
            ResultatsComponent
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
  
  public titresColumns: string[] = ['Du', 'Au', 'Circuit', 'Pays'];
  public displayedColumns: string[] = ['date_start', 'date_end', 'circuit_name', 'country_name'];
  public columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
/*
  public epreuvesFutures: EpreuveFutures = new EpreuveFutures(0, 
    [{ 
      id: 0, 
      shortname: "", 
      name: "", 
      hashtag: "",
      circuit: "", 
      country_code: "", 
      country: "", start_date: "", 
      end_date: "", 
      local_tz_offset: 0, 
      tes: 0, has_timing: 0, 
      friendly_name: "", 
      dates: "", 
      key_session_times: 
      [{ 
          session_shortname: "", 
          session_name: "", 
          start_datetime_utc: "" 
      }],
      last_session_end_time: ""
    }]);*/
  //public displayedColumnsFutures: string[] = ['season'];

  ngOnInit(): void {

    while (this.courant <= new Date().getFullYear()) {
      this.saisons.push(this.courant++);
    }
    this.selectedYear = this.saisons[this.saisons.length - 1];
    this.motoGP.getSaison(this.selectedYear).subscribe({
      next: (data) => {
        this.saison = data[0]
      },
      error: (error) => 
        console.error('Erreur lors de la récupération de la saison:\r', error),
      complete: () => {
        console.log('Saison récupérée avec succès! ' + this.saison.year),
        this.motoGP.getEpreuvesSaison(this.saison.year).subscribe({
          next: (e) => {
            this.epreuves = e
          },
          error: (error) => 
            console.error('Erreur lors de la récupération des épreuves:\r', error),
          complete: () => {
            console.log('Epreuves récupérées avec succès! ')
          }
        })
      }
    });
  }

  onChangeSaison(event: any) {
    this.epreuves = [];
    this.motoGP.getSaison(event.value).subscribe({
      next: (data) => {
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
            console.log('Epreuves récupérées avec succès! ' + this.epreuves.length)
            this.motoGP.getCategories(this.saison.year).subscribe({
              next: (data) => {
              console.log('Categories récupérées avec succès! ' + data.length)
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
    this.epreuve = this.isExpanded(element) ? null : element;
  }
/*
  resultats(idCategorie: string, idElement: string) { 
    this.motoGP.getSessions(this.saison.year, idCategorie, idElement).subscribe({
      next: (data) => {
        this.sessions = data;
        console.log('Sessions récupérées avec succès! ' + this.sessionsSprint.length)
      },
      error: (error) => 
        console.error('Erreur lors de la récupération des sessions:\r', error),
      complete: () => {
        console.log('Sessions récupérées avec succès! ')
      }
    });
  }
*/
  resultat(idCategorie: string, idElement: string) { 
    this.sessions = [];
    this.resultats = [];
    console.log('Resultats de la saison ' + this.resultats.length);
    this.motoGP.getSessions(this.saison.year, idCategorie, idElement).subscribe({
      next: (data) => {
        this.sessions = data;
        console.log('Sessions récupérées avec succès! ' + this.sessions.length)
      },
      error: (error) => 
        console.error('Erreur lors de la récupération des sessions:\r', error),
      complete: () => {
        console.log('Sessions récupérées avec succès! '),
        this.motoGP.getResultats( this.saison.year, this.sessions[0].id, idElement).subscribe({
          next: (data) => {
            this.resultats = data,
            console.log('Resultats récupérés avec succès! ' + this.resultats.length)
          },
          error: (error) => 
            console.error('Erreur lors de la récupération des resultats:\r', error),
          complete: () => {
            console.log('Resultats récupérés avec succès! ')
          }
        });
      }
    });

/*
    this.motoGP.getEpreuvesFutures(idElement).subscribe({
      next: (data) => {
        console.log('Sessions récupérées avec succès! ' + data.calendar.length);   
      }
    });
    this.motoGP.getSessionsSprint(this.saison.year).subscribe({
      next: (data) => {
        this.sessionsSprint = data;
        console.log('Sessions récupérées avec succès! ' + this.sessionsSprint.length)
      },
      error: (error) => 
        console.error('Erreur lors de la récupération des sessions:\r', error),
      complete: () => {
        console.log('Sessions récupérées avec succès! ')
      }
    });*/
  }

}

/*

motogp-full-results": {
"post": {
"tags": [
"API MOTOGP NEW"
],
"parameters": [
{
"name": "token",
"in": "query",
"description": "token",
"required": true,
"type": "string",
"example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
},
{
"name": "eventid",
"in": "query",
"description": "you can select event id from api motogp-events",
"required": true,
"type": "string",
"example": "8ed52491-e1aa-49a9-8d70-f1c1f8dd3090"
},
{
"name": "year",
"in": "query",
"description": "you can select category id from api motogp-category",
"required": true,
"type": "string",
"example": "2024"
},
{
"name": "session",
"in": "query",
"description": "you can select session type RAC FP1 FP2 FP3 FP4 Q1 Q2 WUP SPR",
"required": true,
"type": "string",
"example": "af960ae0-845e-4fac-a431-4a7ea6c7d128"
}
],
"summary": "Returns List of Results",
"responses": {
"200": {
"description": "OK"
}
}
}
*/