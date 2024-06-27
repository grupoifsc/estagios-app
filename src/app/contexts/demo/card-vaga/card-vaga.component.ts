import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginRequestBody } from '../auth.service';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepperModule } from 'primeng/stepper';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoadingService } from '../../../services/loading.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-vaga',
  providers: [ConfirmationService],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,  
    InputTextareaModule, MultiSelectModule, DropdownModule, InputNumberModule, 
    InputTextModule, ChipModule, FieldsetModule, ButtonModule, CardModule, SpeedDialModule,
    ConfirmDialogModule, DividerModule, 
  ],
  templateUrl: './card-vaga.component.html',
  styleUrl: './card-vaga.component.css'
})
export class CardVagaComponent {

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router : Router,
  ) { }

  confirmDelete() : void {
    this.confirmationService.confirm({
      message: "Você quer deletar este anúncio de vaga?",
      accept: () => {
          this.messageService.add({key: 'demo-main', severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      },
      reject: () => {
          this.messageService.add({key: 'demo-main', severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  edit() : void {
    this.router.navigate(['demo', 'anuncio'])
  }

}
