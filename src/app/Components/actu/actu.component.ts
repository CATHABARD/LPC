import { Component, Input, OnInit } from '@angular/core';
import { ViewAgendaComponent } from "../agenda/ViewAgenda/view-agenda.component";
import { ViewPhotosComponent } from "../Photos/ViewPhotos/view-photos.component";

@Component({
  selector: 'app-actu',
  standalone: true,
  imports: [ViewAgendaComponent, ViewPhotosComponent],
  templateUrl: './actu.component.html',
  styleUrl: './actu.component.css'
})
export class ActuComponent implements OnInit {
  @Input() evenements = [];

  constructor() {}

  ngOnInit(): void {
    
    if(this.evenements.length > 0) {
      var n = this.evenements.length * Math.random();
    }
  }
}
