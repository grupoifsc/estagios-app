import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiResponse } from '../api-response';
import { Page } from '../page';
import { Job } from '../job';

@Component({
  selector: 'app-disponiveis',
  standalone: true,
  imports: [ CommonModule, DatePipe, AsyncPipe, 
    TableModule, ButtonModule, IconFieldModule, ConfirmDialogModule, 
    InputIconModule, InputTextModule, TagModule, SkeletonModule,
   ],
  templateUrl: './disponiveis.component.html',
  styleUrl: './disponiveis.component.css'
})
export class DisponiveisComponent {

  constructor (
    private apiService : ApiService,
//    private messageService : MessageService,
//    private confirmationService : ConfirmationService,
//    private route : ActivatedRoute,
    private router : Router, 
  ) {}

  vagas$ : Observable<ApiResponse<Page<Job> | undefined>> = this.apiService.getAllApproved();

  subscriptions : Subscription[] = []
  title: string = "Vagas Recebidas"

  first: number = 0;
  totalVagas: number = 10;
  rows: number = 10;
  search: string = "";

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
    this.vagas$ = this.apiService.getAllApproved(this.search, page, this.rows);
  }


  setTotalRecords(total? : number) : void {
    this.totalVagas = total ?? 0
  }


}
