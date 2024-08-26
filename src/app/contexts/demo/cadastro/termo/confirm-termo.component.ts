import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PrivacidadeComponent } from '../../../main-app/sobre/privacidade/privacidade.component'
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { TermoComponent } from '../../../main-app/sobre/termo/termo.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-confirm-termo',
  standalone: true,
  imports: [ButtonModule, PrivacidadeComponent, DialogModule, TermoComponent, ConfirmDialogModule,],
  templateUrl: './confirm-termo.component.html',
  styleUrl: './confirm-termo.component.css'
})
export class ConfirmTermoComponent {
  constructor(
  ) {}

  @Input({required: true}) visible! : boolean;
  @Output() termConfirmed : EventEmitter<boolean> = new EventEmitter()

  confirm() : void {
    this.visible = false;
    this.termConfirmed.emit(true);
  }
  

}
