import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  private http = inject(HttpClient);

  constructor() { }
  
  loadWeather() : Observable<any> {
    return this.http.get(
      "https://api.open-meteo.com/v1/forecast?latitude=43.9403&longitude=4.9011&hourly=temperature_2m,rain,cloud_cover_low,wind_speed_10m,wind_direction_10m");
  }
}
	
