
export class Visiteur {
    constructor(idUser: number, nom: string, prenom: string, password: string, droits: number) {
        this.idUser = idUser;
        this.nom = nom;
        this.prenom = prenom ;
        this.droits = droits
        this.Password = password;
    }
    idUser: number;
    nom: string;
    prenom: string;
    droits: number;
    Password: string;
}
