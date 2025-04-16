import { inject, Injectable } from '@angular/core';
import { Visiteur } from '../../Models/Visiteur';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationsService {
  private http = inject(HttpClient);
  private envUrl = environment;

  defaultVisiteur: Visiteur = new Visiteur(0, 'Visiteur', 'Visiteur', '', 0);
  private currentUser = this.defaultVisiteur;

  constructor() {

  }

  public GetUsers(): Observable<Visiteur[]> {
    return this.http.get<Visiteur[]>(this.envUrl + 'Users');  
  }
  
  public getCurrentUserName(): string {
    return this.currentUser.nom;
  }
}
