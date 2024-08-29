import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TermoComponent } from '../sobre/termo/termo.component';
import { PrivacidadeComponent } from '../sobre/privacidade/privacidade.component';

@Component({
  selector: 'app-politica',
  standalone: true,
  imports: [TabViewModule, TermoComponent, PrivacidadeComponent],
  templateUrl: './politica.component.html',
  styleUrl: './politica.component.css'
})
export class PoliticaComponent {

}
