import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Photo } from '../../Modeles/photo';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private http = inject(HttpClient);
  public photos = signal<Photo[]>([]);
  private envUrl = environment;
  private urlImages = "https://localhost:7193/api/UploadImages/Image/";

  uploadSuccess: boolean = false;
  percentDone: number = 0;
  file: Blob | undefined;

  constructor() {
  }

  public getPhotos = (name: string) => {
    return this.http.get<Photo[]>(this.envUrl.urlAddress + name);
  }
  public getPhotosByJour = (name: string, jourId: string) => {
    var url = this.envUrl.urlAddress + name + 'JourId/' + jourId;
    return this.http.get<Photo[]>(url);
  }
  public createPhoto = (name: string, photo: Photo) => {
    return this.http.post<Photo>(this.envUrl + name, photo, this.generateHeaders());
  }
  public updatePhoto = (name: string, photo: Photo) => {
    return this.http.put(this.envUrl + name, photo, this.generateHeaders());
  }
  public deletePhoto = (name: string) => {
    return this.http.delete(this.envUrl + name);
  }
  
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }

  getImage(fileName: string) {
    return this.http.get(this.urlImages + fileName, {headers: new HttpHeaders({ 'Accept': 'image/jpeg' }),responseType: 'blob'});
 }
}

/*
Angular 18 HttpClient avec Progression
Dans Angular 18, le module HttpClient permet de suivre la progression des requêtes HTTP, y compris les requêtes GET, grâce à l'option reportProgress. Cela est particulièrement utile pour afficher des indicateurs de progression lors du chargement de données volumineuses.

Utilisation de reportProgress
Pour utiliser la progression avec HttpClient.get(), vous devez spécifier l'option reportProgress dans l'objet d'options lors de l'appel de la méthode. Voici un exemple de syntaxe :

this.httpClient.get<Movies>(`${this.apiUrl}/movie/${type}?page=${pageNumber}&api_key=${this.apiKey}`, {
  reportProgress: true
});
Exemple de mise en œuvre
Voici un exemple détaillé de comment implémenter la progression dans une requête GET :

Service de Movie : Modifiez la méthode fetchMoviesByType pour inclure reportProgress.
fetchMoviesByType(type: string, pageNumber = 1) {
  return this.httpClient
    .get<Movies>(`${this.apiUrl}/movie/${type}?page=${pageNumber}&api_key=${this.apiKey}`, {
      reportProgress: true,
      observe: 'events' // Pour observer les événements de progression
    })
    .pipe(
      map(event => {
        if (event.type === HttpEventType.DownloadProgress) {
          // Calculer la progression
          const progress = Math.round((event.loaded / (event.total || 1)) * 100);
          console.log(`Progression: ${progress}%`);
        } else if (event.type === HttpEventType.Response) {
          // Traiter la réponse finale
          return event.body;
        }
      })
    );
}
Types d'événements
Lorsque vous utilisez observe: 'events', vous pouvez recevoir différents types d'événements :

HttpEventType.Sent : L'événement est envoyé.
HttpEventType.DownloadProgress : La progression du téléchargement.
HttpEventType.Response : La réponse finale du serveur.
Conclusion
En intégrant l'option reportProgress dans vos requêtes HTTP avec HttpClient, vous pouvez facilement gérer et afficher la progression des chargements de données dans votre application Angular 18. Cela améliore l'expérience utilisateur en fournissant des retours visuels sur l'état des requêtes en cours.*/