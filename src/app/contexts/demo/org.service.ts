import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organizacao } from './organizacao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(
    private http : HttpClient,
  ) { }


  saveOrg(org: Organizacao) : Observable<Organizacao> {
    return this.http.get<Organizacao>('');
  } 

  getAuthOrg() : Observable<Organizacao | undefined> {
    return this.http.get<Organizacao>('');
  } 


  // saveOrg(org: Organizacao) : Observable<Organizacao> | undefined {
  //   return this.http.get<Organizacao>('');
  // } 


}
