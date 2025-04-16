import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { FrameComponent } from './frame/frame.component';
import { AddlienComponent } from './Liens/AddLien/addlien.component';
import { ViewAgendaComponent } from './agenda/ViewAgenda/view-agenda.component';
import { ViewLiensComponent } from './Liens/ViewLiens/view-liens.component';
import { AddAgendaComponent } from './agenda/AddAgenda/add-agenda/add-agenda.component';
import { MotoGPComponent } from './MotoGP/moto-gp/moto-gp.component';
import { ResultatsComponent } from './MotoGP/resultats/resultats.component';

export const routes: Routes = [
    { path: 'frame', component: FrameComponent },
    { path: 'accueil', component: AccueilComponent },
    { path: 'viewLien', component: ViewLiensComponent },
    { path: 'addLien', component: AddlienComponent },
    { path: 'viewAganda', component: ViewAgendaComponent},
    { path: 'addAgenda', component: AddAgendaComponent},
    { path: 'app-moto-gp', component: MotoGPComponent },
    { path: 'app-resultats', component: ResultatsComponent},
    { path: '**', component: AccueilComponent }
  ];
