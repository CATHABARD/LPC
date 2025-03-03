
export class Lien {
    constructor(
        public Idlien?: string,
        public adresse?: string,
        public texte?: string,
        public iduser: number = 0,
        public Status: number = 0)
        {}
}