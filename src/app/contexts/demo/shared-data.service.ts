import { Injectable } from '@angular/core';
import { Job } from './job';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  createdJobs: Map<string, Job> = new Map();
  selectedJob: Job | undefined;

  public setCreatedJobs(jobs: Job[]) : void {
    this.createdJobs = new Map(jobs.map(job => [job.id!, job]));
  }

  public getCreatedJobs() : Job[] {
    return [... this.createdJobs.values()];
  }


  public getSelectedJob() : Job | undefined {
    return this.selectedJob;
  }

  public setSelectedJob(job: Job) : void {
    this.selectedJob = job;
  }


}
