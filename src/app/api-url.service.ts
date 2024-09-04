import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrowserStorageService } from './contexts/demo/browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  browserStorage = inject(BrowserStorageService)

  public apiUrl = new BehaviorSubject<any>({
    url : 'https://localhost:8080'
  })

  public setUrl(url: string) : void {
    this.apiUrl.value.url = url;
  }

}
