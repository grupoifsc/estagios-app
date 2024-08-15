import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../job';
import { Observable } from 'rxjs';
import { ApiResponse } from '../api-response';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-card-vaga',
  providers: [ConfirmationService],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe,  
    InputTextareaModule, MultiSelectModule, DropdownModule, InputNumberModule, 
    InputTextModule, ChipModule, FieldsetModule, ButtonModule, CardModule, SpeedDialModule,
    ConfirmDialogModule, DividerModule, 
  ],
  templateUrl: './card-vaga.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card-vaga.component.css'
})

export class CardVagaComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router : Router,
    private apiService : ApiService,
    private route : ActivatedRoute,
  ) { }

  @Input() id! : string;
  vaga$! : Observable<ApiResponse<Job | undefined>>;

  ngOnInit(): void {
    this.vaga$ = this.apiService.getJobInfo(this.id);
  }

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
    this.router.navigate(['/demo/vagas/' + this.id + '/edit'])
  }



}
