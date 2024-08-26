import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTermoComponent } from './confirm-termo.component';

describe('TermoComponent', () => {
  let component: ConfirmTermoComponent;
  let fixture: ComponentFixture<ConfirmTermoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmTermoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmTermoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
