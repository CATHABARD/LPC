import { Routes } from '@angular/router';
import { AccueilComponent } from './Components/accueil/accueil.component';
import { FrameComponent } from './Components/frame/frame.component';
import { AddlienComponent } from './Components/Liens/AddLien/addlien.component';
import { ViewAgendaComponent } from './Components/agenda/ViewAgenda/view-agenda.component';
import { ViewLiensComponent } from './Components/Liens/ViewLiens/view-liens.component';
import { AddAgendaComponent } from './Components/agenda/AddAgenda/add-agenda.component';
import { MotoGPComponent } from './Components/MotoGP/moto-gp/moto-gp.component';
import { ResultatsComponent } from './Components/MotoGP/resultats/resultats.component';

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
