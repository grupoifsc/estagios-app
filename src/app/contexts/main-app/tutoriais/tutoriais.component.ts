import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-tutoriais',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, RouterLink, ],
  templateUrl: './tutoriais.component.html',
  styleUrl: './tutoriais.component.css'
})
export class TutoriaisComponent {

  isMenuHidden : boolean = true;

  toogleMenu() : void {
    this.isMenuHidden = !this.isMenuHidden
  }

}
