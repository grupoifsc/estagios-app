import { Address, Contact, Org } from './organizacao';
import { Observable } from 'rxjs';
import { Area, Job, JobEntryData } from './job';
import { ApiResponse } from './api-response';
import { Page } from './page';

export interface DataFetching {

  createOrg(org: Org) : Observable<ApiResponse<Org | undefined>>  
  updateAuthOrg(org: Org) : Observable<ApiResponse<Org | undefined>> 
  getAuthOrg() : Observable<ApiResponse<Org | undefined>> 
  deleteAuthOrg() : Observable<ApiResponse<undefined | null>> 
  getAllSchools() : Observable<ApiResponse<Page<Org> | undefined>>
  getOrg(id: string) : Observable<ApiResponse<Org> | undefined> 
  getAuthOrgAddresses() : Observable<ApiResponse<Address[]> | undefined> 
  getAuthOrgContacts() : Observable<ApiResponse<Contact[]> | undefined> 
  createJob(job: JobEntryData) : Observable<ApiResponse<Job | undefined>> 
  updateJob(id : string, job: JobEntryData) : Observable<ApiResponse<Job | undefined>>
  deleteJob(id: string) : Observable<ApiResponse<undefined | null>>
  getJobInfo(id: string) : Observable<ApiResponse<Job | undefined>>
  getAllCreated(search?: string, page?: number, limit?: number) : Observable<ApiResponse<Page<Job | undefined>>>
  getAreas() : Observable<ApiResponse<Area[]> | undefined> 
  approveJob(ids: string[]) : Observable<ApiResponse<any>> 
  rejectJob(ids: string[]) : Observable<ApiResponse<any>> 
  getAllReceived(search? : string, page?: number, limit?: number | null) : Observable<ApiResponse<Page<Job> | undefined>> 
  getAllPending() : Observable<ApiResponse<Page<Job> | undefined>> 
  getAllApproved(search? : string, page? : number, limit? : number) : Observable<ApiResponse<Page<Job> | undefined>> 
  getAllRejected() : Observable<ApiResponse<Page<Job> | undefined>>

}
