import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedJobsComponent } from './rejected-jobs.component';

describe('RejectedJobsComponent', () => {
  let component: RejectedJobsComponent;
  let fixture: ComponentFixture<RejectedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
