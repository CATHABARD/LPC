import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Inject, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbar } from '@angular/material/toolbar';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatTreeModule} from '@angular/material/tree';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { ToolsService } from '../../Services/Tools/tools.service';
import { AuthentificationsService } from '../../Services/Authentifications/authentifications.service';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [
            MatSidenavModule,
            MatToolbar,
            CommonModule,
            RouterOutlet,
            MatTreeModule,
            MatButtonModule,
            MatIconModule],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.css'
})
export class FrameComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private toolsService = inject(ToolsService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public readonly authentificationService = inject(AuthentificationsService)

  isHandset$: Observable<boolean> | undefined;
  hasChild:  Observable<boolean> | undefined;
  public isAuth = false;
  public isAdmin = false;

  ongletSubscription: Subscription | undefined;
  selectedOnglet: number = 0;

  constructor() {
    this.ongletSubscription = this.toolsService.ongletSubject.subscribe(i => {
      this.selectedOnglet = i;
    })
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

  onGoAccueil() {
    this.selectedOnglet = 0;
    this.router.navigate(['accueil']);
  }

  ////////////////////////////////////////////////////////
  // Connexion et déconnexion visiteur et administrateur
  ///////////////////////////////////////////////////////
  onOpen() {
    alert('ouvrir');
  }

  onConnectDialog() {
    alert('connexion');
  }

  onDisconnect() {
    alert('déconnexion');
  }

  onAdmin() {
    
  }

  onMessage() {
    alert('message');
  }

  onNewCompte() {
    alert('nouveau');
  }

  onNewPage() {
    alert('page');
  }

  onAddLien() {
    this.router.navigate(['addLien']);
  }

  onAddAgenda() {
    this.router.navigate(['addAgenda']);
  }

  onGetTeams() { 
    this.router.navigate(['app-view-teams']);
  }
}
