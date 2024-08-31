import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tutoriais',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink, CommonModule,
   ],
  templateUrl: './tutoriais.component.html',
  styleUrl: './tutoriais.component.css'
})
export class TutoriaisComponent {

  isMenuHidden : boolean = true;

  toogleMenu() : void {
    this.isMenuHidden = !this.isMenuHidden
  }

  menu: {link: string, label: string}[] = [
    {link: "cadastro", label: "Cadastro"},
    {link: "auth", label: "Autenticação"},
    {link: "criar-anuncio", label: "Criar Anúncios de Vagas"},
    {link: "moderacao", label: "Moderação"}
  ]

}
