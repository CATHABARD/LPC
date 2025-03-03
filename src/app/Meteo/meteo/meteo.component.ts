import { Component, inject, OnInit } from '@angular/core';
import { MeteoService } from '../../Services/Meteo/meteo.service';
//import { AgCharts } from 'ag-charts-angular';
import {
  AgBarSeriesOptions,
  AgCategoryAxisOptions,
  AgChartOptions,
  AgNumberAxisOptions,
  time,
} from "ag-charts-community";
import { fetchWeatherApi } from 'openmeteo';
import { Meteo } from '../../Modeles/Meteo';
import { CommonModule } from '@angular/common';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-meteo',
  standalone: true,
  imports: [
        MatGridList,
        MatCard,
        MatGridTile,
        MatCardTitle,
        MatCardHeader,
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
  public meteo: any;
  titre = 'Météo';

  public meteos: Meteo[] = [];
  public maxVisible = 250;

  //public chartOptions: AgChartOptions;

  constructor() {
    /*this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [{ 
          time: new Date(),
          rain: 0,
          temperature2m: 0, 
          cloudCoverLow: 0, 
          cloudCoverMid: 0, 
          cloudCoverHigh: 0, 
          wind_speed_10m: 0,
          wind: 0
        }],
      // Series: Defines which chart type and data to use
      series: [
        {
          type: "bar",
          xKey: "time",
          yKey: "temperature_2m",
        } as AgBarSeriesOptions,
      ],
      axes: [
      // Display category (xKey) as the bottom axis
      {
        type: "category",
        position: "bottom",
      } as AgCategoryAxisOptions,
      // Use left axis for 'iceCreamSales' series
      {
        type: "number",
        position: "left",
        keys: ["temperature_2m"],
      } as AgNumberAxisOptions,
    ],
    legend: {
      position: 'right',
  },
  title: { text: 'Prévisions' },
    subtitle: { text: 'sur 5 jours' },
    };
*/
  }

 /////////////////////////

ngOnInit(): void {
  this.getData().then((data: any) => 
  {
    var icone = "";
    for (let i = 0; i < data.hourly.time.length; i++) {
      if(data.hourly.rain[i] > 0) {
        icone = "../../../assets/icones/pluie.jpg";
      }  else {
        icone = "../../../assets/icones/soleil.jpg";
      }
      this.meteos?.push(new Meteo(
        new Date(data.hourly.time[i]),
        data.hourly.rain[i],
        data.hourly.temperature2m[i], 
        data.hourly.cloudCoverLow[i], 
        data.hourly.windSpeed10m[i],
        data.hourly.windDirection10m[i],
        0,
        0,
        0,
        0,
        icone
        ));
      }
    console.log(this.meteos);
    });
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
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();
  
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
  /*for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console.log(
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
    );

  }*/
  return weatherData;
  }
}
