
export class Lien {
    constructor(
        public Idlien?: string,
        public adresse?: string,
        public texte?: string,
        public iduser: string = '',
        public Status: number = 0)
        {}
}