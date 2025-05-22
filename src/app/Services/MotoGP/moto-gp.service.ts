import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Saison } from '../../Models/MotoGP';
import { Categorie, Epreuve, EpreuveFutures, Resultatat, Sprint } from '../../Models/MotoGP';

@Injectable({
  providedIn: 'root'
})
export class MotoGPService {
  http: HttpClient = inject(HttpClient);
  
  urlSaison =           "https://api.micheleberardi.com/racing/v1.0/motogp-season?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=";
  urlEpreuves =         "https://api.micheleberardi.com/racing/v1.0/motogp-events?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=";
  urlEpreuvesFutures =  "https://api.micheleberardi.com/racing/v1.0/motogp-files?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&eventid=";
  urlCategories =       "https://api.micheleberardi.com/racing/v1.0/motogp-category?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=";
  urlsessions =         "https://api.micheleberardi.com/racing/v1.0/motogp-sessions?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=";
  urlSprint =           "https://api.micheleberardi.com/racing/v1.0/motogp-sessions-spr?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=";
  urlResultats =        "https://api.micheleberardi.com/racing/v1.0/motogp-full-results?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&eventid=";  
  urlTeams =            "https://api.micheleberardi.com/racing/v1.0/motogp-calendar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=";
  urlPilotes =          "https://api.micheleberardi.com/racing/v1.0/motogp-world-standing-riders?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9&year=";
  
  getSaison(year: number): Observable<Saison[]> {
    var query = this.urlSaison + year;
    return this.http.get<Saison[]>(query/*, { headers: { "Host": "api.micheleberardi.com" }}*/);
  }

  getEpreuvesSaison(year: number): Observable<Epreuve[]> {
    var query = this.urlEpreuves + year;
    return this.http.get<Epreuve[]>(query);
  }

  getEpreuvesFutures(idEvenement: string, idCategorie: string): Observable<EpreuveFutures> {
    var query = this.urlEpreuvesFutures + idEvenement + "&categoryid=" + idCategorie;
    return this.http.get<EpreuveFutures>(query);
  }

  getCategories(year: number): Observable<Categorie[]> {
    var query = this.urlCategories + year;
    return this.http.get<Categorie[]>(query);
  }

  getSessions(year: number, idCategory: string, idEpreuve: string): Observable<Sprint[]> {
    var query = this.urlsessions + year + "&categoryid=" + idCategory + "&eventid=" + idEpreuve;
    return this.http.get<any[]>(query);
  }

  getSessionsSprint(year: number): Observable<Sprint[]> {
    var query = this.urlSprint + year
    return this.http.get<Sprint[]>(query);
  }

  getResultats(year: number, idSession: string, idEpreuve: string): Observable<Resultatat[]> {
    var query = this.urlResultats + idEpreuve + "&year=" + year + "&session=" + idSession;
    return this.http.get<Resultatat[]>(query);
  }

  getTeams(): Observable<any[]> {
    return this.http.get<any[]>(this.urlTeams);
  }

  getPilotes(year: string, categoryid: string): Observable<any[]> {
    return this.http.get<any[]>(this.urlPilotes + year + "&categoryid=" + categoryid);
  }
}

