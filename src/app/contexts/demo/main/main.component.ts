import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, ToastModule, ButtonModule, ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(
    public auth : AuthService,
    private router : Router,
  ) { }

  menu : { label : string, route: string, guard?: 'ie' }[] = [
    { label : 'Minhas Vagas', route: 'dashboard' },
    { label: 'Vagas Aprovadas', route: 'moderacao/aprovados', guard: 'ie' },
    { label: 'Vagas Rejeitadas', route: 'moderacao/rejeitados', guard: 'ie' },
    { label: 'Vagas Pendentes', route: 'moderacao/pendentes', guard: 'ie' },
    { label : 'Ajuda', route: '/tutoriais' },
  ]

  isMenuHidden : boolean = true;

  public toogleMenu() : void {
    this.isMenuHidden = !this.isMenuHidden;
  }

  public logout() : void {
    this.auth.logoutAndRedirect();
  }

}
