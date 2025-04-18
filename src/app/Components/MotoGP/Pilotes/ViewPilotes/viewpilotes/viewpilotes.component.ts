import { Component, inject, input, Output, EventEmitter } from '@angular/core';
import { Pilote } from '../../../../../Models/MotoGP';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewpilotes',
  standalone: true,
  imports: [],
  templateUrl: './viewpilotes.component.html',
  styleUrl: './viewpilotes.component.css'
})
export class ViewpilotesComponent {
  private readonly router = inject(Router);
  public isVisible = false;

  @Output() close = new EventEmitter<void>();

  public pilotes = input<Pilote[]>({} as Pilote[]);

  constructor() {
    this.isVisible = true;
  }
  
  onClose() {
    this.isVisible = false;
  }
}
