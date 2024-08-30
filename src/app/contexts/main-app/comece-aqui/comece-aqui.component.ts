import { Component } from '@angular/core';
import { Features, MAIN_FEATURES } from '../features';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FeaturesComponent } from '../features/features.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comece-aqui',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterOutlet, RouterLink, FeaturesComponent, ],
  templateUrl: './comece-aqui.component.html',
  styleUrl: './comece-aqui.component.css'
})
export class ComeceAquiComponent {

  features = MAIN_FEATURES;

  isMenuHidden: boolean = true;

  toogleMenu() : void {
    this.isMenuHidden = !this.isMenuHidden
  }

  recursos: boolean = false;
  documentacao: boolean = false;
  demo: boolean = false;

  verRecursos() : void {
    this.recursos = true;
    this.documentacao = false;
    this.demo = false;
  }

  verDocumentacao() {
    this.recursos = false;
    this.documentacao = true;
    this.demo = false;
  }

  verDemo() {
    this.recursos = false;
    this.documentacao = false;
    this.demo = true;
  }

}
