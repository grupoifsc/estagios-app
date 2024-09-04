import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ApiUrlService } from '../api-url.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonModule, InputTextModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(
    public apiUrlService : ApiUrlService
  ) {}


  changeApiUrl(url : string) : void {
    console.log(url);
    
    this.apiUrlService.setUrl(url);
  }

  getUrl() : string {
    let url : string = '';
    this.apiUrlService.apiUrl.subscribe({next: n => url = n.url})
    return url;
  }


}
