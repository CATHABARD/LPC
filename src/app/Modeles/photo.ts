
export class Photo {
    constructor(public id?: string,
                public commentaire?: string,
                public nomAuteur?: string,
                public jourId?: string,
                public adresse?: string,
                public heure?: Date,
                public orientation: string = "180deg")
            {}
        }
