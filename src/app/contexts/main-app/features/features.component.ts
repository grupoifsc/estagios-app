import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location } from '@angular/common';
import { Features, MAIN_FEATURES } from '../features';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, TabViewModule, 
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
