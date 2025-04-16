import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withDebugTracing } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { VisiteursService } from './Services/Visiteurs/visiteurs.service';
import { HttpClient, provideHttpClient, withFetch, withJsonpSupport } from '@angular/common/http';
import { PhotosService } from './Services/Photos/PhotosService';
import { AuthentificationsService } from './Services/Authentifications/authentifications.service';
import { AgendasService } from './Services/Agendas/agendas.service';
import { JoursService } from './Services/Jours/jours.service';
import { ToolsService } from './Services/Tools/tools.service';
import { ErrorHandlerService } from './Services/Error-Handlers/error-handler.service';
import { EnvironmentUrlService } from '../environments/shared/services/environment-url.service';
import { LiensService } from './Services/Liens/liens-service';
import { EvenementsService } from './Services/Evenements/evenements.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withJsonpSupport()),
    EvenementsService,
    JoursService,
    PhotosService,
    ErrorHandlerService,
    AuthentificationsService,
    LiensService,
    AgendasService,
    VisiteursService,
    ToolsService,
    EnvironmentUrlService,
    HttpClient
  ]
};
