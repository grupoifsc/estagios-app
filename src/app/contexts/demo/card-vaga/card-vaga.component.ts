import { CommonModule, DatePipe, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { Observable, Subscription } from 'rxjs';
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

export class CardVagaComponent implements OnInit, OnDestroy {

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router : Router,
    private apiService : ApiService,
    private location: Location,
  ) { }

  @Input() id! : string;
  vaga$! : Observable<ApiResponse<Job | undefined>>;
  subscriptions: Subscription[] = []

  goBack() : void {
    this.location.back();
  }

  ngOnInit(): void {
    this.vaga$ = this.apiService.getJobInfo(this.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  confirmDelete() : void {
    this.confirmationService.confirm({
      message: "Você quer deletar este anúncio de vaga?",
      accept: () => {
          this.delete();
      }
    });
  }

  edit() : void {
    this.router.navigate(['/demo/vagas/' + this.id + '/edit'])
  }

  private delete() : void {
    let subs = this.apiService.deleteJob(this.id).subscribe({
      next: response => {
        this.messageService.add({severity: 'warn', detail: 'Vaga deletada', key: 'demo-main'})
        this.location.back()
      }, 
      error: err => {
        this.messageService.add({severity: 'error', summary: 'Oops', detail: err.error?.message ?? "Não foi possível deletar a vaga", key: 'demo-main'})
      }
    })
    this.subscriptions.push(subs);
  }





}
