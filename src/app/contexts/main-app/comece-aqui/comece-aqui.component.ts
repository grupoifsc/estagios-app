import { Component } from '@angular/core';
import { Features, MAIN_FEATURES } from '../features';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FeaturesComponent } from '../features/features.component';

@Component({
  selector: 'app-comece-aqui',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink, FeaturesComponent, ],
  templateUrl: './comece-aqui.component.html',
  styleUrl: './comece-aqui.component.css'
})
export class ComeceAquiComponent {


  isMenuHidden: boolean = true;

  toogleMenu() : void {
    this.isMenuHidden = !this.isMenuHidden
  }

  verRecursos() : void {

  }

}
