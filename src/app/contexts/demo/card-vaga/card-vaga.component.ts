import { CommonModule, DatePipe, Location, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Job } from '../job';
import { catchError, ignoreElements, Observable, of, Subscription } from 'rxjs';
import { ApiResponse } from '../api-response';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NotFoundComponent } from '../../not-found/not-found.component';


@Component({
  selector: 'app-card-vaga',
  providers: [ConfirmationService],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe, TitleCasePipe,   
    InputTextareaModule, MultiSelectModule, DropdownModule, InputNumberModule, 
    InputTextModule, ChipModule, FieldsetModule, ButtonModule, CardModule, SpeedDialModule,
    ConfirmDialogModule, DividerModule, NotFoundComponent, CardModule,  
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
    private apiService : DataService,
    private location: Location,
  ) { }

  @Input() id! : string;
  vaga$! : Observable<ApiResponse<Job | undefined>>;
  error$! : any;
  subscriptions: Subscription[] = [];

  goBack() : void {
    this.location.back();
  }

  ngOnInit(): void {
    this.vaga$ = this.apiService.getJobInfo(this.id);  
    this.error$ = this.vaga$.pipe(
      ignoreElements(),
      catchError(
        (err) => of(err.error)
      )
    )  
  }

  showJson(object: any) {
    console.log(JSON.stringify(object));
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

  getFormato(job: Job) : string {
    const formato = job.formato;
    if (formato == 'hibrido') return 'híbrido';
    return formato;
  }

  getNivel(job: Job) : string {
    const nivel = job.nivel;
    if(nivel == 'medio') return 'médio';
    if(nivel == 'tecnico') return 'técnico';
    if(nivel == 'graduacao') return 'graduação';
    if(nivel == 'pos') return 'pós-Graduação';
    return nivel;
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
