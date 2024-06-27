import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main',
  providers: [MessageService],
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

  menu : { label : string, route: string }[] = [
    { label : 'Home', route: '/demo' },
    { label : 'Dashboard', route: 'dashboard' },
    { label: 'Anunciar Vaga', route: 'anuncio' },
    { label : 'Login', route: 'login' },
    { label : 'Cadastro', route: 'cadastro' },
    { label : 'Ajuda', route: '/tutoriais' },
    { label : 'Detalhes', route: 'detalhes' },
  ]

  isMenuHidden : boolean = true;

  toogleMenu() : void {
    this.isMenuHidden = !this.isMenuHidden;
  }

}
