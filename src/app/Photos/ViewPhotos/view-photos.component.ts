import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvenementsService } from '../../Services/Evenements/evenements.service';
import { Evenement } from '../../Modeles/Evenement';
import { JoursService } from '../../Services/Jours/jours.service';
import { Jour } from '../../Modeles/Jour';
import { PhotosService } from '../../Services/Photos/PhotosService';
import { Photo } from '../../Modeles/photo';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import * as EXIF from 'exif-js';

@Component({
  selector: 'app-view-photos',
  standalone: true,
  imports: [
        CommonModule,
        MatGridList,
        MatCard,
        MatGridTile,
        MatCardTitle,
        MatCardHeader,
        MatCardContent,
        MatTableModule,
        MatGridListModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption
  ],
  templateUrl: './view-photos.component.html',
  styleUrl: './view-photos.component.css'
})
export class ViewPhotosComponent implements OnInit {
  public photosService = inject(PhotosService);
  public joursService = inject(JoursService);
  public evenementsService = inject(EvenementsService);

  pageCourantePhoto = 0;
  nbPagesPhotos = 0;
  nbLignesParPage = 20;

  // Liste des évènements
  public evenements: Evenement[] = [];
  // Liste des jours
  public jours: Jour[] = [];
  // Liste des photos à afficher
  public photos: Photo[] = [];
  public imageUrlList: string[] = [];
  
  public dateCourante = new Date();
  public evenementCourant: Evenement | undefined;
  private jourCourant: Jour | undefined;
  public photoCourante: number = 0;
  public pasPhotos: number = 4;

  private image: ImageBitmap | undefined;

  constructor() {}
  
  ngOnInit(): void {
        // Chargement des évènements
        this.evenementsService.getEvenements('Evenements').subscribe((e) => {
          this.evenements = e;
          if(this.evenements.length > 0) {
            var n = Math.random(); this.evenements.length
            this.evenementCourant = this.evenements[0];
            // Chargement des jours
            if(this.evenementCourant != undefined) {
              this.joursService.getJoursByEvenement('Jours', this.evenementCourant.id as string).subscribe(j => {
                this.jours = j;
                if(this.jours.length > 0){
                  this.jourCourant = this.jours[0];
                    // Chargement des photos
                    if( this.jours != undefined && this.jours.length > 0) {
                      this.photosService.getPhotosByJour('Photos/', this.jourCourant.id as string).subscribe((p) => {
                        this.photos = p;
                        this.photos.forEach(P => {
                          if(P.adresse != null) {
                            P.adresse = P.adresse.substring((P.adresse.lastIndexOf("\\") + 1));
                            if(P.adresse != null) {
                            this.photosService.getImage(P.adresse).subscribe((res: Blob) => {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if(reader.result != null) {
                                  //P.commentaire = reader.result as string;
                                  this.imageUrlList.push(reader.result.toString()); // Convertit le blob en URL
                                }
                              };
                              reader.readAsDataURL(res);
                            });
                          }
                        }
                      });
                    });
                  }
                } else {
                  this.jourCourant = undefined;
                }
              })
            }
          }
        });
    
    }

    onLoad(i: number) {
      const img = new Image();
      img.src = this.imageUrlList[i];
  
      img.onload = () => {
        EXIF.getData(this.imageUrlList[i], () => {
          const orientation = EXIF.getTag(img, 'Orientation');
          this.oriente(img, orientation);
        });
      };
    }

    private oriente(img: HTMLImageElement, orientation: number) {
      // Logique pour corriger l'orientation selon la valeur de 'orientation'
      // Cela peut impliquer de dessiner l'image sur un canvas et de récupérer l'image corrigée
      // Exemple simplifié :
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      switch (orientation) {
        case 1:
          // Normal
          ctx?.drawImage(img, 0, 0);
          break;
        case 6:
          // 90° rotation
          canvas.width = img.height;
          canvas.height = img.width;
          ctx?.rotate(90 * Math.PI / 180);
          ctx?.drawImage(img, 0, -img.height);
          break;
        case 8:
          // -90° rotation
          canvas.width = img.height;
          canvas.height = img.width;
          ctx?.rotate(-90 * Math.PI / 180);
          ctx?.drawImage(img, -img.width, 0);
          break;
        // Ajoutez d'autres cas pour d'autres orientations si nécessaire
      }
  
    }

    onDecrementePhoto() {
        this.photoCourante -= this.pasPhotos;
        this.pageCourantePhoto = Math.ceil(this.photoCourante / this.pasPhotos); 
      }
    
    onIncrementePhoto() {
      this.photoCourante += this.pasPhotos;
      this.pageCourantePhoto = Math.ceil(this.photoCourante / this.pasPhotos);
    }
      
  onChangeEvenement(event: any) {
    this.evenementsService.getEvenement('/Evenements', event.value).subscribe((e: Evenement) => {
      this.evenementCourant = e;
    })
    this.photos.splice(0);
    this.imageUrlList.splice(0);
    this.pageCourantePhoto = 0;
    this.photoCourante = 0;
    this.joursService.getJoursByEvenement('Jours', event.value).subscribe( j => {
      this.jours = j;
      if(this.jours.length > 0) {
        this.jourCourant = this.jours[0];
        } else {
          this.jourCourant = undefined;
        }
    });
  }

  onChangeJour(event: any) {
      // Chargement des photos
      if(this.jourCourant != undefined) {
        this.photosService.getPhotosByJour('Photos/', this.jourCourant?.id as string).subscribe((p) => {
          this.photos = p;
          this.nbPagesPhotos = Math.ceil(this.photos.length / this.pasPhotos);
          this.photos.forEach(P => {
            if(P.adresse != null) {
              P.adresse = P.adresse.substring((P.adresse.lastIndexOf("\\") + 1));
              if(P.adresse != null) {
                this.photosService.getImage(P.adresse).subscribe((res: Blob) => {
                const reader = new FileReader();
                reader.onload = () => {
                  if(reader.result != null) {
                    //P.commentaire = reader.result as string;
                    this.imageUrlList.push(reader.result.toString()); // Convertit le blob en URL
                  }
                };
                reader.readAsDataURL(res);
                });
              }
            }
          });
        });
      }

  }

        
}
