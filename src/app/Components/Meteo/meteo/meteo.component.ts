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
  public meteo: any;
  titre = 'Météo';

  public icone = "";

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
    for (let i = 0; i < data.hourly.time.length; i++) {
      this.icone = "assets/soleil.jpg";
      if (data.hourly.cloudCoverHigh[i] > 40) {
        this.icone = "assets/soleil-nuage.jpg";
      } else if(data.hourly.cloudCoverMid[i] > 40) {
        this.icone = "assets/nuages-gris.jpg";
      } else if(data.hourly.cloudCoverLow[i] > 40) {
        this.icone = "assets/nuit-nuage.jpg";
      }
      if(data.hourly.rain[i] > 2) {
        this.icone = "assets/pluie.jpg"
      }
      if(data.hourly.time[i]> new Date()) {
        this.meteos?.push(new Meteo(
          new Date(data.hourly.time[i]),
          this.mapDayName(data.hourly.time[i].toUTCString().substring(0, 3)) + " " + data.hourly.time[i].getDate(),
          data.hourly.rain[i],
          data.hourly.temperature2m[i], 
          data.hourly.cloudCoverLow[i], 
          data.hourly.windSpeed10m[i],
          data.hourly.windGusts10m[i],
          data.hourly.cloudCoverMid[i],
          data.hourly.cloudCoverHigh[i],
          data.hourly.windDirection10m[i],
          data.hourly.windGusts10m[i],
          this.icone
          ));
        }
      }
      //console.log(this.meteos);
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

/*
const params = {
	"latitude": 43.9403,
	"longitude": 4.9011,
	"hourly": ["temperature_2m", "rain", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
	"daily": ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "rain_sum", "precipitation_hours", "precipitation_probability_max", "wind_speed_10m_max", "wind_gusts_10m_max"],
	"timezone": "auto",
	"forecast_days": 3,
	"models": "meteofrance_seamless"
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
const daily = response.daily()!;

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

	daily: {
		time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2mMax: daily.variables(0)!.valuesArray()!,
		temperature2mMin: daily.variables(1)!.valuesArray()!,
		sunrise: daily.variables(2)!.valuesArray()!,
		sunset: daily.variables(3)!.valuesArray()!,
		rainSum: daily.variables(4)!.valuesArray()!,
		precipitationHours: daily.variables(5)!.valuesArray()!,
		precipitationProbabilityMax: daily.variables(6)!.valuesArray()!,
		windSpeed10mMax: daily.variables(7)!.valuesArray()!,
		windGusts10mMax: daily.variables(8)!.valuesArray()!,
	},

};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
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
}
for (let i = 0; i < weatherData.daily.time.length; i++) {
	console.log(
		weatherData.daily.time[i].toISOString(),
		weatherData.daily.temperature2mMax[i],
		weatherData.daily.temperature2mMin[i],
		weatherData.daily.sunrise[i],
		weatherData.daily.sunset[i],
		weatherData.daily.rainSum[i],
		weatherData.daily.precipitationHours[i],
		weatherData.daily.precipitationProbabilityMax[i],
		weatherData.daily.windSpeed10mMax[i],
		weatherData.daily.windGusts10mMax[i]
	);
}
*/