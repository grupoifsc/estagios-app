import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoriaisComponent } from './tutoriais.component';

describe('TutoriaisComponent', () => {
  let component: TutoriaisComponent;
  let fixture: ComponentFixture<TutoriaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutoriaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoriaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
