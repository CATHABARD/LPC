import { Pipe, PipeTransform } from '@angular/core';
import { Agenda } from '../../Models/Agenda';





@Pipe({
  name: 'selectAgendasAfterDate',
  standalone: true
})
export class SelectAgendasAfterDatePipe implements PipeTransform {

  transform(Agendas: Agenda[],dte: Date): Agenda[] {
    return Agendas.filter((a: Agenda) => {
      return this.dateIsAfter(a.date) == true 
    });
  }

  dateIsAfter(d: Date): boolean {
    let d1 = new Date(d).getTime();
    let d2 = new Date().getTime();
    let n = d2 - d1; // Durée en ms séparant la date de l'évènement d'aujourd'hui
    if(n <= 0) {
      return true;
    }
    else {
      return false;
    }

  }
}
