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

@Component({
  selector: 'app-moderation',
  providers: [ConfirmationService], 
  standalone: true,
  imports: [ CommonModule, DatePipe, AsyncPipe, 
    TableModule, ButtonModule, IconFieldModule, ConfirmDialogModule, 
    InputIconModule, 
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

  vagas$! : Observable<ApiResponse<Page<Job | undefined>>>

  action! : string
  subscriptions : Subscription[] = []

  ngOnInit(): void {
    let sub = this.route.data.subscribe({
      next: data => {
        this.action = data.action;
        if(this.action == "accepted") {
          this.vagas$ = this.apiService.getAllApproved();
        } 
        else if (this.action == "rejected") {
          this.vagas$ = this.apiService.getAllRejected();
        }
        else {
          this.vagas$ = this.apiService.getAllPending();
        }
      },
      error: err => console.log(err)      
    })
    this.subscriptions.push(sub);    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  accept(id : string) : void {
    let sub = this.apiService.approveJob([id]).subscribe({
      next: data => {
        console.log("job accepted"); 
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });
    this.subscriptions.push(sub);
    this.reloadPage();
  }

  reject(id: string) : void {
    let sub = this.apiService.rejectJob([id]).subscribe({
      next: data => {
        console.log("job rejected"); 
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
    this.subscriptions.push(sub);
    this.reloadPage();
  }

  reloadPage() : void {
    this.router.navigate([this.router.url], {skipLocationChange: true})
  }



  
}
