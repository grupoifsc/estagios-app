import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableLazyLoadEvent, TableModule, TablePageEvent } from 'primeng/table';
import { DataService } from '../data.service';
import { ApiResponse } from '../api-response';
import { Job } from '../job';
import { first, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../page';
import { InputTextModule } from 'primeng/inputtext';
import { Tag, TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-moderation',
  providers: [ConfirmationService], 
  standalone: true,
  imports: [ CommonModule, DatePipe, AsyncPipe, 
    TableModule, ButtonModule, IconFieldModule, ConfirmDialogModule, 
    InputIconModule, InputTextModule, TagModule, SkeletonModule,
   ],
  templateUrl: './moderation.component.html',
  styleUrl: './moderation.component.css'
})
export class ModerationComponent implements OnInit, OnDestroy {

  constructor (
    private apiService : DataService,
    private messageService : MessageService,
    private confirmationService : ConfirmationService,
    private route : ActivatedRoute,
    private router : Router, 
  ) {}

  vagas$ : Observable<ApiResponse<Page<Job> | undefined>> = this.apiService.getAllReceived();

  subscriptions : Subscription[] = []
  title: string = "Vagas Recebidas"

  first: number = 0;
  totalVagas: number = 10;
  rows: number = 10;

  search : string = "";

  ngOnInit(): void {

  }

  stringify(object: any) : string {
    const json = JSON.stringify(object)
    console.log(json);
    return json;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public see(id: string, job: Job) : void {
    this.router.navigate(['demo/vagas/' + id]);
  }

  confirmAction(action: 'aprovar' | 'rejeitar', id: string) : void {
    this.confirmationService.confirm({
      header: 'Confirme a ação',
      message: action,
      accept: () => {
        if(action == 'aprovar') return this.accept(id);
        else return this.reject(id);
      },    
    })
  }


  accept(id : string) : void {
    let sub = this.apiService.approveJob([id]).subscribe({
      next: data => {
        this.messageService.add({severity: 'success', detail: 'Vaga aceita', key: 'demo-main'})
    //    this.router.navigate(['demo/moderacao/aprovadas'])
        this.reloadTable()
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
   //     this.router.navigate(['demo/moderacao/rejeitadas'])
      this.reloadTable();
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

  onPage(event: TablePageEvent) : void {
    this.first = event.first
    this.rows = event.rows
    this.reloadTable()
  }

  onLazyLoad(event: TableLazyLoadEvent) : void {
    console.log(JSON.stringify(event));
    
    this.first = event.first ?? 0
    this.rows = event.rows ?? 10
    if("string" == typeof event.globalFilter)
      this.search = event.globalFilter
    else if ("object" == typeof event.globalFilter && event.globalFilter)
      this.search = event.globalFilter.join(" ")
    this.reloadTable();
  }


  reloadTable() : void {
    const page: number = this.first / this.rows;
    this.vagas$ = this.apiService.getAllReceived(this.search, page, this.rows);
  }

  getSeverity(status: string) : Tag["severity"] {
    if(status == 'aprovado') return 'success'
    if(status == 'rejeitado') return 'danger'
    return 'secondary'
  }

  setTotalRecords(total? : number) : void {
    this.totalVagas = total ?? 0
  }
  
}
