import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AgendasService } from '../../../Services/Agendas/agendas.service';
import { Agenda } from '../../../Models/Agenda';
import { SelectAgendasAfterDatePipe } from '../../../Pipes/Agendas/select-agendas-after-date.pipe';

@Component({
  selector: 'app-view-agenda',
  standalone: true,
  imports: [SelectAgendasAfterDatePipe],
  templateUrl: './view-agenda.component.html',
  styleUrl: './view-agenda.component.css'
})
export class ViewAgendaComponent implements OnInit {
  public agendasService = inject(AgendasService);

    // Liste des évènements
    public agendas: Agenda[] = [];
  
    public titre: string = '';
    public dateCourante = new Date();

    constructor() {}

    ngOnInit() {
      //Charger la liste des évènements de l'agenda
      this.agendasService.getAgendas('Agendas').subscribe((as: Agenda[]) => {
        as.forEach(a => {
          let y = a.date.toString().substring(0, 4);
          let m = a.date.toString().substring(5, 7);
          let j = a.date.toString().substring(8, 10);
          a.date = new Date(y + '-' + m +'-' + j);
        })        
      this.agendas = as;
    });

    this.titre = "Il y a : " + this.agendas.length.toString() + " évènements dans votre agenda"
  }
}
