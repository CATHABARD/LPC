
export class Meteo {
    constructor(
        public time?: Date,
        public day: string = "",
        public rain: number = 0,
        public temperature2m: number = 0,
        public cloudCover: number = 0,
        public cloudCoverLow: number = 0,
        public cloudCoverMid: number = 0,
        public cloudCoverHigh: number = 0,
        public windSpeed10m: number = 0,
        public windDirection10m: number = 0,
        public windGusts10m: number = 0,
        public icone: string = ""
    ){}
}
