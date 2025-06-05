import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { LiensService } from '../../../Services/Liens/liens-service';
import { Lien } from '../../../Models/Lien';


@Component({
  selector: 'addLien',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButton],
  templateUrl: './addlien.component.html',
  styleUrl: './addlien.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddlienComponent {
  private formBuilder = inject(UntypedFormBuilder);
  private liensService = inject(LiensService);
  private lien: Lien | undefined;

  public form: UntypedFormGroup;



  constructor() {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.form = this.formBuilder.group({
      adresse: new FormControl('', [Validators.required, Validators.maxLength(256), Validators.pattern(urlRegex)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  
  }

  onSubmit() {
    this.liensService.addLien(this.form.value).subscribe({
      next: (response) => {
        this.lien = response;
        console.log('Lien ajouté: ', this.lien); 
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du lien: ', error);
      }
    });
  }
}
