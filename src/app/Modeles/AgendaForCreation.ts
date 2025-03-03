import {Moment} from 'moment';

export interface AgendaForCreation{
  date: Date; 
  heure: string; 
  texte: string;
  statut: number;
}