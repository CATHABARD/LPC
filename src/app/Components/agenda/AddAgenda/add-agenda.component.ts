import { Component, inject, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendasService } from '../../../Services/Agendas/agendas.service';
import { FormBuilder, MaxLengthValidator, ReactiveFormsModule }  from '@angular/forms';
//import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
//import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
//import { ErrorHandlerService } from '../../../Services/Error-Handlers/error-handler.service';
//import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { FormGroup, Validators } from '@angular/forms';
import { Agenda } from '../../../Models/Agenda';
//import { HttpErrorResponse } from '@angular/common/http';
//import { AgendaForCreation } from '../../../Modeles/AgendaForCreation';
import { ThemePalette } from '@angular/material/core';
//import { AuthentificationsService } from '../../../Services/Authentifications/authentifications.service';
//import { BreakpointObserver } from '@angular/cdk/layout';
import { MatError, MatFormField } from '@angular/material/form-field';
//import { MatIcon } from '@angular/material/icon';
//import { HeaderRowOutlet } from '@angular/cdk/table';
//import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { NgbPaginationNext } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'addAgenda',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-agenda.component.html',
  styleUrl: './add-agenda.component.css'
})
export class AddAgendaComponent implements OnInit {
  //public agendasService = inject(AgendasService);
  private formBuilder = inject(FormBuilder);
  //private authService = inject(AuthentificationsService);
  //private router = inject(Router);
  //private breakpointObserver = inject(BreakpointObserver);
  //private location = inject(Location);

  color: ThemePalette = 'primary';
  agendasForm: FormGroup;
  errorMessage: string = '';
  fileIsUploading = false;
  fileUploaded = true;
  isFileAttached: boolean = false;

  agenda?: Agenda = new Agenda();

  uploadPercent: number | undefined;

  constructor() {
    this.agendasForm = this.formBuilder.group({
      date: [new Date(), [Validators.required]],
      heure: [''],
      texte: ['', [Validators.maxLength(50), Validators.required]]
    });

  }

  public ngOnInit(): void {

  }

  onSubmit() {
    var valDate = this.agendasForm.controls['date'].value;
    var valTime = this.agendasForm.controls['heure'].value + ":00";
    var valTexte = this.agendasForm.controls['texte'].value;
    var agenda = new Agenda("", valDate, valTime, valTexte, 1);
    //this.agendasService.createAgenda('Agendas', agenda).subscribe(a => {


    //});
  }

  /*okTheme = {
    container: {
      bodyBackgroundColor: "#424242",
      buttonColor: "#fff"
    },
    dial: {
      dialBackgroundColor: "#555"
    },
    clockFace: {
      clockFaceBackgroundColor: "#555",
      clockHandColor: "#01806b",
      clockFaceTimeInactiveColor: "#fff"
    }
  };*/
}
