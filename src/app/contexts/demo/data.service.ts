import { inject, Injectable } from '@angular/core';
import { Address, Contact, Org } from './organizacao';
import { Observable } from 'rxjs';
import { Area, Job, JobEntryData } from './job';
import { ApiResponse } from './api-response';
import { Page } from './page';
import { DataFetching } from './data-fetching';
import { environment } from '../../../environments/environment';
import { InMemoryService } from './in-memory.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class DataService implements DataFetching {

  service!: DataFetching;

  constructor() {
    if(environment.inMemoryDatabase)
      this.service = inject(InMemoryService)
    else
      this.service = inject(ApiService) 
   }


  createOrg(org: Org) : Observable<ApiResponse<Org | undefined>> {
    return this.service.createOrg(org);
  } 

  updateAuthOrg(org: Org) : Observable<ApiResponse<Org | undefined>> {
    return this.service.updateAuthOrg(org);
  } 

  getAuthOrg() : Observable<ApiResponse<Org | undefined>> {
    return this.service.getAuthOrg();
  } 

  deleteAuthOrg() : Observable<ApiResponse<undefined | null>> {
    return this.service.deleteAuthOrg();
  } 

  getAllSchools() : Observable<ApiResponse<Page<Org> | undefined>> {
    return this.service.getAllSchools();
  } 

  getOrg(id: string) : Observable<ApiResponse<Org> | undefined> {
    return this.service.getOrg(id);
  } 

  getAuthOrgAddresses() : Observable<ApiResponse<Address[]> | undefined> {
    return this.service.getAuthOrgAddresses();
  } 

  getAuthOrgContacts() : Observable<ApiResponse<Contact[]> | undefined> {
    return this.service.getAuthOrgContacts()
  } 

  createJob(job: JobEntryData) : Observable<ApiResponse<Job | undefined>> {
    return this.service.createJob(job)
  } 

  updateJob(id : string, job: JobEntryData) : Observable<ApiResponse<Job | undefined>> {
    return this.service.updateJob(id, job)
  } 

  deleteJob(id: string) : Observable<ApiResponse<undefined | null>> {
    return this.service.deleteJob(id)
  } 

  getJobInfo(id: string) : Observable<ApiResponse<Job | undefined>> {
    return this.service.getJobInfo(id)
  } 

  getAllCreated(search?: string, page?: number, limit?: number) : Observable<ApiResponse<Page<Job | undefined>>> {
    return this.service.getAllCreated(search, page, limit);
  } 

  getAreas() : Observable<ApiResponse<Area[]> | undefined> {
    return this.service.getAreas()
  } 

  approveJob(ids: string[]) : Observable<ApiResponse<any>> {
    return this.service.approveJob(ids)
  } 

  rejectJob(ids: string[]) : Observable<ApiResponse<any>> {
    return this.service.rejectJob(ids)
  } 

  getAllReceived(search? : string, page?: number, limit?: number | null) : Observable<ApiResponse<Page<Job> | undefined>> {
    return this.service.getAllReceived(search, page, limit)
  } 

  getAllPending() : Observable<ApiResponse<Page<Job> | undefined>> {
    return this.service.getAllPending()
  } 

  getAllApproved(search? : string, page? : number, limit? : number) : Observable<ApiResponse<Page<Job> | undefined>> {
    return this.service.getAllApproved(search, page, limit)
  } 

  getAllRejected() : Observable<ApiResponse<Page<Job> | undefined>> {
    return this.service.getAllRejected()
  } 


}
