import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address, Contact, Org } from './organizacao';
import { Observable } from 'rxjs';
import { Area, Job, JobEntryData } from './job';
import { ApiResponse } from './api-response';
import { Page } from './page';
import { NEED_AUTH } from '../../interceptors/contexts';
import { DataFetching } from './data-fetching';

@Injectable({
  providedIn: 'root'
})

export class ApiService implements DataFetching {

  constructor(
    private http : HttpClient,
  ) { }
  
  orgBaseUrl = '/org';
  jobBaseUrl = '/vagas';


  createOrg(org: Org) : Observable<ApiResponse<Org | undefined>> {
    return this.http.post<ApiResponse<Org>>('/orgs', org, 
      { context: new HttpContext().set(NEED_AUTH, false) });
  } 

  updateAuthOrg(org: Org) : Observable<ApiResponse<Org | undefined>> {
    return this.http.put<ApiResponse<Org>>(this.orgBaseUrl, org);
  } 

  getAuthOrg() : Observable<ApiResponse<Org | undefined>> {
    return this.http.get<ApiResponse<Org>>(this.orgBaseUrl);
  } 

  deleteAuthOrg() : Observable<ApiResponse<undefined | null>> {
    return this.http.delete<ApiResponse<undefined | null>>(this.orgBaseUrl);
  } 

  getAllSchools() : Observable<ApiResponse<Page<Org> | undefined>> {
    return this.http.get<ApiResponse<Page<Org> | undefined>>('/orgs/schools');
  } 

  getOrg(id: string) : Observable<ApiResponse<Org> | undefined> {
    return this.http.get<ApiResponse<Org>>('/orgs/' + id);
  } 

  getAuthOrgAddresses() : Observable<ApiResponse<Address[]> | undefined> {
    return this.http.get<ApiResponse<Address[]>>(this.orgBaseUrl + '/addresses');
  } 

  getAuthOrgContacts() : Observable<ApiResponse<Contact[]> | undefined> {
    return this.http.get<ApiResponse<Contact[]>>(this.orgBaseUrl + '/contacts');
  } 

  createJob(job: JobEntryData) : Observable<ApiResponse<Job | undefined>> {
    return this.http.post<ApiResponse<Job>>(this.jobBaseUrl, job);
  } 

  updateJob(id : string, job: JobEntryData) : Observable<ApiResponse<Job | undefined>> {
    return this.http.put<ApiResponse<Job>>(this.jobBaseUrl + '/' + id, job);
  } 

  deleteJob(id: string) : Observable<ApiResponse<undefined | null>> {
    return this.http.delete<ApiResponse<undefined | null>>(this.jobBaseUrl + '/' + id);
  } 

  
  getJobInfo(id: string) : Observable<ApiResponse<Job | undefined>> {
    return this.http.get<ApiResponse<Job>>(this.jobBaseUrl + '/' + id);
  } 


  getAllCreated(search?: string, page?: number, limit?: number) : Observable<ApiResponse<Page<Job | undefined>>> {
    let url = this.orgBaseUrl + this.jobBaseUrl + '/owned';
    if(search || page || limit) {
      console.log("Search = " + search);
      console.log("Page = " + page);
      console.log("Limit = " + limit);      
      url += '?search=' + (search ?? '') + '&page=' + (page ?? 0) + '&limit=' + (limit ?? 10) 
      console.log(url);
      
    } 
    return this.http.get<ApiResponse<Page<Job>>>(url);
  } 

  getAreas() : Observable<ApiResponse<Area[]> | undefined> {
    return this.http.get<ApiResponse<Area[]>>('/areas');
  } 

  approveJob(ids: string[]) : Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(this.orgBaseUrl + this.jobBaseUrl + '/disponiveis', ids);
  } 

  rejectJob(ids: string[]) : Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(this.orgBaseUrl + this.jobBaseUrl + '/rejeitadas', ids);
  } 

  getAllReceived(search? : string, page?: number, limit?: number | null) : Observable<ApiResponse<Page<Job> | undefined>> {
    let url = this.orgBaseUrl + this.jobBaseUrl + '/recebidas';
    if(search || page || limit) {
      url += '?search=' + (search ?? '') + '&page=' + (page ?? 0) + '&limit=' + (limit ?? 10) 
    } 
    return this.http.get<ApiResponse<Page<Job>>>(url);
  } 


  getAllPending() : Observable<ApiResponse<Page<Job> | undefined>> {
    return this.http.get<ApiResponse<Page<Job>>>(this.orgBaseUrl + this.jobBaseUrl + '/pendentes');
  } 

  getAllApproved(search? : string, page? : number, limit? : number) : Observable<ApiResponse<Page<Job> | undefined>> {
    let url = this.orgBaseUrl + this.jobBaseUrl + '/disponiveis';
    if(search || page || limit) {
      url += '?search=' + (search ?? '') + '&page=' + (page ?? 0) + '&limit=' + (limit ?? 10) 
    } 
    return this.http.get<ApiResponse<Page<Job>>>(url);
  } 

  getAllRejected() : Observable<ApiResponse<Page<Job> | undefined>> {
    return this.http.get<ApiResponse<Page<Job>>>(this.orgBaseUrl + this.jobBaseUrl + '/rejeitadas');
  } 

}
