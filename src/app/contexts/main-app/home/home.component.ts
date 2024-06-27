import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';


interface Features {
  title: string,
  items: string[],
  imageUrl?: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, AccordionModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {
 
  features : Features[] = [
    {
      title: 'Open Source',
      items: ['descrição'],
      imageUrl: ''
    },
    {
      title: 'Integração e Automação',
      items: [ 'REST API: integre os recursos ao seu sistema', 
        'Intergração com o seu sistema, permitindo automatizar o envio e recebimento de anúncios de novas vagas',
        'Independente de plataforma',
      ],
      imageUrl: ''
    },
    {
      title: 'Moderação',
      items: ['descrição'],
      imageUrl: ''
    },
    {
      title: 'Escolha do Público Alvo',
      items: ['Escolher se deixa a vaga disponível a todas as IEs cadastradas ou escolher destinatários específicos da vaga', 'bbb', 'ccc'],
      imageUrl: ''
    },
    {
      title: 'Demo',
      items: ['Versão Demo disponível com a maioria dos recursos, para quem não quer integrar com o sistema'],
      imageUrl: ''
    },
  ]



}
