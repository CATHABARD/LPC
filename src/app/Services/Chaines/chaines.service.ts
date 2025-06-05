import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Chaine } from '../../Models/Chaine';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChainesService {
  http: HttpClient = inject(HttpClient);
  
  urlChaines =           "https://xmltv.igital3d.com/XmlTv?Id=88ca458c-0a1e-43fd-abac-9af2c58b1ed5"

  constructor() { }

  GetListeChaines(): Observable<Chaine[]> {
    return this.http.get<Chaine[]>(this.urlChaines, { headers: { "Host": "xmltv.digital3d.com", "accept": "text/plain" } });
  }
}
