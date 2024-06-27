import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private loading : boolean = false;

  public isLoading() : boolean {
    return this.loading;
   }

  public showLoading() : void {
    this.loading = true;
   }

  public hideLoading() : void { 
    this.loading = false
  }

}
