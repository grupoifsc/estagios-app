import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { jwtDecode } from 'jwt-decode';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, ToastModule, ButtonModule, PanelMenuModule, ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(
    public auth : AuthService,
    private router : Router,
  ) { }

  menu : MenuItem[] = [
    { label : 'Minhas Vagas', routerLink: 'vagas/criadas' },
    { label: 'Vagas Recebidas', routerLink: 'vagas/recebidas', state: {guard: 'ie'} },
    { label : 'API', routerLink: '/' },
  ]



  isMenuHidden : boolean = true;

  public toogleMenu() : void {
    this.isMenuHidden = !this.isMenuHidden;
  }

  public logout() : void {
    this.auth.logoutAndRedirect();
  }

}
