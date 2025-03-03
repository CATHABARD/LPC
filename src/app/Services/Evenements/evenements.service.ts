import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Evenement } from '../../Modeles/Evenement';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvenementsService {
  private http = inject(HttpClient);
  private envUrl = environment;
  public evenements = signal<Evenement[]>([]);

  uploadSuccess: boolean = false;
  percentDone: number = 0;
  file: Blob | undefined;

  constructor() {}

  getEvenements(name: string): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.envUrl.urlAddress + name).pipe(
      tap(es => this.evenements.set(es))
    );
  }

  getEvenement(name: string, id: string): Observable<Evenement> {
    return this.http.get<Evenement>(this.envUrl.urlAddress + name + '/' + id).pipe(
      tap(e => this.evenements)
    );
  }

}
