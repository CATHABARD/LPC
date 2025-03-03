export class Agenda {
    
    constructor(
        public idAgenda?: string,
        public date: Date = new Date(),
        public heure?: string,
        public texte?: string,
        public statut: number = 0)
    {}
}
