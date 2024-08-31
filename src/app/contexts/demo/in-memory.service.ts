import { Injectable } from '@angular/core';
import { DataFetching } from './data-fetching';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';
import { JobEntryData, Job, Area } from './job';
import { Org, Address, Contact } from './organizacao';
import { Page } from './page';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements DataFetching {

  constructor() { }
  
  createOrg(org: Org): Observable<ApiResponse<Org | undefined>> {
    throw new Error('Method not implemented.');
  }
  updateAuthOrg(org: Org): Observable<ApiResponse<Org | undefined>> {
    throw new Error('Method not implemented.');
  }
  getAuthOrg(): Observable<ApiResponse<Org | undefined>> {
    throw new Error('Method not implemented.');
  }
  deleteAuthOrg(): Observable<ApiResponse<undefined | null>> {
    throw new Error('Method not implemented.');
  }
  getAllSchools(): Observable<ApiResponse<Page<Org> | undefined>> {
    throw new Error('Method not implemented.');
  }
  getOrg(id: string): Observable<ApiResponse<Org> | undefined> {
    throw new Error('Method not implemented.');
  }
  getAuthOrgAddresses(): Observable<ApiResponse<Address[]> | undefined> {
    throw new Error('Method not implemented.');
  }
  getAuthOrgContacts(): Observable<ApiResponse<Contact[]> | undefined> {
    throw new Error('Method not implemented.');
  }
  createJob(job: JobEntryData): Observable<ApiResponse<Job | undefined>> {
    throw new Error('Method not implemented.');
  }
  updateJob(id: string, job: JobEntryData): Observable<ApiResponse<Job | undefined>> {
    throw new Error('Method not implemented.');
  }
  deleteJob(id: string): Observable<ApiResponse<undefined | null>> {
    throw new Error('Method not implemented.');
  }
  getJobInfo(id: string): Observable<ApiResponse<Job | undefined>> {
    throw new Error('Method not implemented.');
  }
  getAllCreated(search?: string, page?: number, limit?: number): Observable<ApiResponse<Page<Job | undefined>>> {
    throw new Error('Method not implemented.');
  }
  getAreas(): Observable<ApiResponse<Area[]> | undefined> {
    throw new Error('Method not implemented.');
  }
  approveJob(ids: string[]): Observable<ApiResponse<any>> {
    throw new Error('Method not implemented.');
  }
  rejectJob(ids: string[]): Observable<ApiResponse<any>> {
    throw new Error('Method not implemented.');
  }
  getAllReceived(search?: string, page?: number, limit?: number | null): Observable<ApiResponse<Page<Job> | undefined>> {
    throw new Error('Method not implemented.');
  }
  getAllPending(): Observable<ApiResponse<Page<Job> | undefined>> {
    throw new Error('Method not implemented.');
  }
  getAllApproved(search?: string, page?: number, limit?: number): Observable<ApiResponse<Page<Job> | undefined>> {
    throw new Error('Method not implemented.');
  }
  getAllRejected(): Observable<ApiResponse<Page<Job> | undefined>> {
    throw new Error('Method not implemented.');
  }
}
