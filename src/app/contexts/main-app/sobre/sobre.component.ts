import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { PrivacidadeComponent } from './privacidade/privacidade.component';
import { TermoComponent } from './termo/termo.component';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [TabViewModule, PrivacidadeComponent, TermoComponent, ],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {

}
