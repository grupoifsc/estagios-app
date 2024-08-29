import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComeceAquiComponent } from './comece-aqui.component';

describe('ComeceAquiComponent', () => {
  let component: ComeceAquiComponent;
  let fixture: ComponentFixture<ComeceAquiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComeceAquiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComeceAquiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
