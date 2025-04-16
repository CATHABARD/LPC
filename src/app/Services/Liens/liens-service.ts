
import { inject, Inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lien } from '../../Models/Lien';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LiensService {
  private http = inject(HttpClient);
  private envUrl = environment;
  
  private _links$: BehaviorSubject<Lien[]> = new BehaviorSubject([] as Lien[]);
  public readonly links$: Observable<Lien[]> = this._links$.asObservable();
  
  constructor() {}


  public getLiens(name: string): Observable<Lien[]> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
      return this.http.get<Lien[]>(this.envUrl.urlAddress + name + "?PageSize=50", { headers: headers });
  }

}
