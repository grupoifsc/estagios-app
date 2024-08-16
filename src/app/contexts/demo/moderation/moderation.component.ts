import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { ApiService } from '../api.service';
import { ApiResponse } from '../api-response';
import { Job } from '../job';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../page';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-moderation',
  providers: [ConfirmationService], 
  standalone: true,
  imports: [ CommonModule, DatePipe, AsyncPipe, 
    TableModule, ButtonModule, IconFieldModule, ConfirmDialogModule, 
    InputIconModule, InputTextModule, TagModule,
   ],
  templateUrl: './moderation.component.html',
  styleUrl: './moderation.component.css'
})
export class ModerationComponent implements OnInit, OnDestroy {

  constructor (
    private apiService : ApiService,
    private messageService : MessageService,
    private confirmationService : ConfirmationService,
    private route : ActivatedRoute,
    private router : Router, 
  ) {}

  vagas$! : Observable<ApiResponse<Page<Job> | undefined>>
  vagas: Job[] | undefined = []

  view! : string
  subscriptions : Subscription[] = []
  status!: 'aprovada' | 'rejeitada' | 'pendente'
  title: 'Vagas Aprovadas' | 'Vagas Rejeitadas' | 'Moderação Pendente' | undefined;
  ngOnInit(): void {
    let sub = this.route.data.subscribe({
      next: data => {
        this.view = data.view;
        if(this.view == "accepted") {
          this.status = 'aprovada'
          this.title = 'Vagas Aprovadas'
          this.vagas$ = this.apiService.getAllApproved();
        } 
        else if (this.view == "rejected") {
          this.status = 'rejeitada'
          this.title = 'Vagas Rejeitadas'
          this.vagas$ = this.apiService.getAllRejected();
        }
        else {
          this.status = 'pendente'
          this.title = 'Moderação Pendente'
          this.vagas$ = this.apiService.getAllPending();
        }
        // this.vagas$.subscribe({
        //   next: response => {
        //     if(response.data) this.vagas = response.data.content
        //     console.log(JSON.stringify(this.vagas));
        //   },
        //   error: err => {
        //     console.log(JSON.stringify(err));
        //   }
        // })        
      },
      error: err => console.log(err)      
    })
    this.subscriptions.push(sub);    
  }

  stringify(object: any) : string {
    return JSON.stringify(object)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public see(id: string, job: Job) : void {
    this.router.navigate(['demo/vagas/' + id]);
  }

  confirmAction(action: 'aprovar' | 'rejeitar', id: string) : void {
    this.confirmationService.confirm({
      message: 'Deseja ' + action + ' esta vaga?',
      accept: () => {
        if(action == 'aprovar') return this.accept(id);
        else return this.reject(id);
      },
      icon: action == 'aprovar' ? 'pi pi-thumbs-up' : 'pi pi-thumbs-down',
      
    })
  }


  accept(id : string) : void {
    let sub = this.apiService.approveJob([id]).subscribe({
      next: data => {
        this.messageService.add({severity: 'success', detail: 'Vaga aceita', key: 'demo-main'})
        this.router.navigate(['demo/moderacao/aprovadas'])
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: 'Oops', detail: err.error?.message ?? "Um erro ocorreu. Tente novamente", key: 'demo-main'})
      }
    });
    this.subscriptions.push(sub);
  }

  reject(id: string) : void {
    let sub = this.apiService.rejectJob([id]).subscribe({
      next: data => {
        this.messageService.add({severity: 'success', detail: 'Vaga rejeitada', key: 'demo-main'})
        this.router.navigate(['demo/moderacao/rejeitadas'])
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: 'Oops', detail: err.error?.message ?? "Um erro ocorreu. Tente novamente", key: 'demo-main'})
      }
    })
    this.subscriptions.push(sub);
  }

  reloadPage() : void {
    this.router.navigate([this.router.url], {skipLocationChange: true})
  }



  
}
