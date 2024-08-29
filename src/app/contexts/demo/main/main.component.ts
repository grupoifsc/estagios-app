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
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, ToastModule, ButtonModule, PanelMenuModule, DividerModule ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(
    public auth : AuthService,
    private router : Router,
  ) { }

  menu : MenuItem[] = [
    { label: 'Suas Vagas', routerLink: 'vagas/criadas' },
    { label: 'Vagas Recebidas', routerLink: 'vagas/recebidas', state: {guard: 'ie'} },
    { label: 'Vagas Disponibilizadas', routerLink: 'vagas/aprovadas', state: {guard: 'ie'} },
  ]

  go(route: string) {
    this.router.navigate([route])
  }

  isMenuHidden : boolean = true;

  public toogleMenu() : void {
    this.isMenuHidden = !this.isMenuHidden;
  }

  public logout() : void {
    this.auth.logoutAndRedirect();
  }

}
