import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Jour } from '../..//Modeles/Jour';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JoursService {
  private http = inject(HttpClient);
  private envUrl = environment;
  public jours = signal<Jour[]>([]);

  constructor() { }

  getJours(name: string): Observable<Jour[]> {
    return this.http.get<Jour[]>(this.envUrl.urlAddress + name).pipe(
      tap(js => this.jours.set(js))
    );
  }

  getJoursByEvenement(name: string, idEvenement: string): Observable<Jour[]> {
    var url = this.envUrl.urlAddress + name + "/EvenementId/" + idEvenement;
    return this.http.get<Jour[]>(url).pipe(
      tap(js => this.jours.set(js))
    );
  }

}
