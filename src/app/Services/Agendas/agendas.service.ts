import { inject, Inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agenda } from '../../Modeles/Agenda';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendasService {
  private http = inject(HttpClient);
  public agendas: Agenda[] = [];
  private envUrl = environment;

  constructor() {
  }

  public getAgendas(name: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(this.envUrl.urlAddress + name);
  }

  public createAgenda = (name: string, agenda: Agenda) => {
    var rte = this.envUrl + name;
    return this.http.post<Agenda[]>(rte,
                                    {
                                      "idAgenda": "0",
                                      "date": agenda.date,
                                      "heure": agenda.heure,
                                      "texte": agenda.texte,
                                      "statut": 1
                                    },
                                    this.generateHeaders());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
