import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location } from '@angular/common';
import { Features, MAIN_FEATURES } from '../features';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, RouterLink, 
    ButtonModule,
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  constructor (
    private location: Location
  ) {}

  features: Features[] = MAIN_FEATURES

  voltar() {
    this.location.back();
  }

}
