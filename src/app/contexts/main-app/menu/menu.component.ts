import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

interface MenuItem {
  label?: string,
  route: string,
  text: string,
  icon?: string,
  class?: string,
  target?: string,
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
    // {
    //   route: 'recursos',
    //   text: 'Recursos',
    //   label: 'Recursos',
    //   icon: 'pi pi-box'
    // },
    {
      route: 'comece-aqui',
      text: 'Comece Aqui',
      label: 'Comece Aqui',
      icon: 'pi pi-bolt'
    },
    {
      route: 'tutoriais',
      text: 'Para Desenvolvedores',
      label: 'Para Desenvolvedores',
      icon: 'pi pi-code'
    },
    {
      route: 'demo',
      text: 'Demo',
      label: 'Demo',
      icon: 'pi pi-box',
      target: '_blank',
    },
    {
      route: 'sobre',
      text: 'Apoie',
      label: 'Apoie',
      icon: 'pi pi-info-circle'
    }
  ]


}
