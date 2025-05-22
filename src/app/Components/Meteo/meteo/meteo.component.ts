import { Component, inject, OnInit } from '@angular/core';
import { MeteoService } from '../../../Services/Meteo/meteo.service';
//import { AgCharts } from 'ag-charts-angular';
import {
  AgBarSeriesOptions,
  AgCategoryAxisOptions,
  AgChartOptions,
  AgNumberAxisOptions,
  time,
} from "ag-charts-community";
import { fetchWeatherApi } from 'openmeteo';
import { Meteo } from '../../../Models/Meteo';
import { CommonModule } from '@angular/common';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardSubtitle, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-meteo',
  standalone: true,
  imports: [
        MatGridList,
        MatCard,
        MatGridTile,
        MatCardSubtitle,
        MatCardContent,
        MatTableModule,
        MatGridListModule,
        CommonModule
  ],
  templateUrl: './meteo.component.html',
  styleUrl: './meteo.component.css'
})

export class MeteoComponent implements OnInit {
  meteoService = inject(MeteoService);
  
  public meteo: Meteo | null | undefined = null;
  titre = 'Météo';

  public icone = "";

  public meteos: Meteo[] = [];
  public maxVisible = 100;
  public timeoffset = 0;

  constructor() {
    
  }


ngOnInit(): void {
  this.getData().then((data: any) => 
  {
    // sélectionner l'icone en fonction de la couverture nuageuse
    for (let i = 0; i < data.hourly.time.length; i++) {
      this.icone = "assets/soleil.jpg";
      if (data.hourly.cloudCoverHigh[i] > 25) {
        this.icone = "assets/nuages-gris.jpg";
      } else if(data.hourly.cloudCoverMid[i] > 30) {
        this.icone = "assets/soleil-nuage.jpg";
      } else if(data.hourly.cloudCoverLow[i] > 40) {
        this.icone = "assets/nuages-gris.jpg";
      } else if(data.hourly.cloudCoverLow[i] > 40) {
        this.icone = "assets/nuit-nuage.jpg";
      } else if(data.hourly.rain[i] == 51) {
        this.icone = "assets/pluie.jpg"
      }
      // placer les données à afficher dans le tableau
      if(data.hourly.time[i] >= new Date().getDate().toString()) {
        this.timeoffset = new Date().getTimezoneOffset() / 60;
        // Ne placer que les 4 heures qui deront affichées
        let heure: number = new Date(data.hourly.time[i]).getHours() + new Date(data.hourly.time[i]).getTimezoneOffset() / 60;
        if(  heure == 0
          || heure == 6
          || heure == 12
          || heure == 18) { 

          //console.log(data.hourly.time[i].toUTCString());
          this.meteos?.push(new Meteo(
            new Date(data.hourly.time[i]),
            this.mapDayName(data.hourly.time[i].toString().substring(0, 3)) + " " + data.hourly.time[i].getDate(),
            data.hourly.rain[i],
            data.hourly.temperature2m[i], 
            data.hourly.cloudCoverLow[i], 
            data.hourly.windSpeed10m[i],
            data.hourly.windGusts10m[i],
            data.hourly.cloudCoverMid[i],
            data.hourly.cloudCoverHigh[i],
            data.hourly.windDirection10m[i],
            data.hourly.windGusts10m[i],
            this.icone,
            true
            ));
          }
        }
      };
    });
  }

  // Retourne les noms de jours en français
  mapDayName(origine: string): string {
    var frenchDay: string = "";

    switch(origine) {
      case 'Mon':
        frenchDay = 'lundi';
        break;
      case 'Tue':
        frenchDay = 'mardi';
        break;
      case 'Wed':
        frenchDay = 'mercredi';
        break;
      case 'Thu':
        frenchDay = 'jeudi';
        break;
      case 'Fri':
        frenchDay = 'vendredi';
        break;
      case 'Sat':
        frenchDay = 'samedi';
        break;
      case 'Sun':
          frenchDay = 'dimanche';
        break;
      default:
        frenchDay = '';
        break;
      }
    return frenchDay;
  }

async getData() {

  const params = {
    "latitude": 43.9403,
    "longitude": 4.9011,
    "hourly": ["temperature_2m", "rain", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"]
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);
  
  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  
  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];
  
  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  /*
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();
  */

  const hourly = response.hourly()!;
  
  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
  
    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      rain: hourly.variables(1)!.valuesArray()!,
      cloudCover: hourly.variables(2)!.valuesArray()!,
      cloudCoverLow: hourly.variables(3)!.valuesArray()!,
      cloudCoverMid: hourly.variables(4)!.valuesArray()!,
      cloudCoverHigh: hourly.variables(5)!.valuesArray()!,
      windSpeed10m: hourly.variables(6)!.valuesArray()!,
      windDirection10m: hourly.variables(7)!.valuesArray()!,
      windGusts10m: hourly.variables(8)!.valuesArray()!,
    },
  
  };
  
  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    /*console.log(
      weatherData.hourly.time[i].toISOString(),
      weatherData.hourly.temperature2m[i],
      weatherData.hourly.rain[i],
      weatherData.hourly.cloudCover[i],
      weatherData.hourly.cloudCoverLow[i],
      weatherData.hourly.cloudCoverMid[i],
      weatherData.hourly.cloudCoverHigh[i],
      weatherData.hourly.windSpeed10m[i],
      weatherData.hourly.windDirection10m[i],
      weatherData.hourly.windGusts10m[i]
    );*/

  }
  return weatherData;
  }
}

