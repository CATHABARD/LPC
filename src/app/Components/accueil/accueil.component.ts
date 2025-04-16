import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs'
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Photo } from '../../Models/photo';
import { LiensService } from '../../Services/Liens/liens-service';
import { Agenda } from '../../Models/Agenda';
import { MatTableModule } from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import { Evenement } from '../../Models/Evenement';
import { Jour } from '../../Models/Jour';
import { ToolsService } from '../../Services/Tools/tools.service';
import { ViewAgendaComponent } from '../agenda/ViewAgenda/view-agenda.component'
import { ViewLiensComponent } from '../../Components/Liens/ViewLiens/view-liens.component';
import { ViewPhotosComponent } from '../../Components/Photos/ViewPhotos/view-photos.component';
import { MeteoComponent } from "../../Components/Meteo/meteo/meteo.component";
import { MotoGPComponent } from "../MotoGP/moto-gp/moto-gp.component";


@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule,
    NgbCarousel,
    MatTabGroup,
    MatTab,
    MatTableModule,
    MatGridListModule,
    ViewAgendaComponent,
    ViewLiensComponent,
    ViewPhotosComponent,
    MeteoComponent,
    MotoGPComponent
],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})

export class AccueilComponent implements OnInit {
  private liensService = inject(LiensService);
  private toolsService = inject(ToolsService);

  @ViewChild('ngcarousel', { static: true })
  ngCarousel!: NgbCarousel;
  
  public isConnected: boolean = false;
  photoCourante = 0;
  readonly pasPhotos = 8;
  
/*
  private photosSubscription: Subscription | undefined;
  private articlesSubscription: Subscription | undefined;
  private actualitesSubscription: Subscription | undefined;
  private photosCarouselSubscription:  Subscription | undefined;
  private authSubscription: Subscription | undefined;
 
  public links$: Observable<Lien[]> = this.liensService.links$;
  */
  
  // Liste des évènements
  public evenements: Evenement[] = [];
  // Liste des jours
  public jours: Jour[] = [];
  // Liste des photos à afficher
  public photos: Photo[] = [];
  public imageUrlList: string[] = [];
  // Liste des photos du carousel
  public photosCarousel: Photo[] = [];
  // Liste des agendas
  public agendas: Agenda[] = [];

  public dateCourante = new Date();

  onglet1: string = "MotoGP";
  onglet2: string = "Accueil";
  onglet3: string = "Agenda";
  onglet4: string = "Photos";

  constructor() { }

  ngOnInit(): void {
  }

  prevSlide() {
    this.ngCarousel.prev();
  }

  nextSlide() {
    this.ngCarousel.next();
  }

  stopSlider() {
    this.ngCarousel.pause();
  }

  onTabChange(event: MatTabChangeEvent) {
    this.toolsService.emitOngletChanged(event.index);
  }

}
