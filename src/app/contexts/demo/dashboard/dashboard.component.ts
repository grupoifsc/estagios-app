import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Router, RouterLink } from '@angular/router';
import { Job } from '../job';
import { Observable } from 'rxjs';
import { ApiResponse } from '../api-response';
import { ApiService } from '../api.service';
import { Page } from '../page';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-dashboard',
  providers: [ConfirmationService],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink, AsyncPipe, DatePipe, 
    ButtonModule, InputGroupAddonModule, InputGroupModule, InputTextModule,
    PasswordModule, ProgressSpinnerModule, FloatLabelModule, StepperModule,
    RadioButtonModule, InputTextareaModule, TableModule, IconFieldModule, 
    InputIconModule, ConfirmDialogModule, 
   ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent{

  constructor(
    private router: Router,
    private apiService: ApiService,
    private confirmationService : ConfirmationService,
    private messageService : MessageService  ) { }


  vagas$ : Observable<ApiResponse<Page<Job | undefined>>> = this.apiService.getAllCreated();

  public add() : void {
    this.router.navigate(['/', 'api', 'anuncio'])
    .then(err => {
      console.log(err) // when there's an error
    });
  }

  public see(id: string, job: Job) : void {
    this.router.navigate(['/demo/vagas/' + id]);
  }

  public edit(id: string, job: Job) : void {
    this.router.navigate(['/demo/vagas/' + id + '/edit']);
  }

  public delete(id: string) : void {
    this.confirmationService.confirm({
      message: "Você quer deletar este anúncio de vaga?",
      accept: () => {
        this.confirmDelete(id);
      }
    });
  }

  private confirmDelete(id: string) : void {
    this.apiService.deleteJob(id).subscribe({
      next: response => {
        this.messageService.add({severity: 'warn', detail: 'Vaga deletada', key: 'demo-main'})
        this.reloadCurrentRoute();
      }
    });
  }

  private reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
