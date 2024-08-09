import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

interface MenuItem {
  label?: string,
  route: string,
  text: string,
  icon?: string,
  class?: string
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, MenubarModule ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
  menu : MenuItem[] = [
    {
      route: 'tutoriais',
      text: 'Tutoriais',
      label: 'Tutoriais',
      icon: 'pi pi-book'
    },
    {
      route: 'demo',
      text: 'Demo',
      label: 'Demo',
      icon: 'pi pi-play'
    },
    {
      route: 'api',
      text: 'API',
      label: 'API',
      icon: 'pi pi-code'
    },
    {
      route: 'sobre',
      text: 'Sobre o Projeto',
      label: 'Sobre',
      icon: 'pi pi-info-circle'
    }
  ]


}
