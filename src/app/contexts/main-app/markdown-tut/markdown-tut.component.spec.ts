import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownTutComponent } from './markdown-tut.component';

describe('MarkdownTutComponent', () => {
  let component: MarkdownTutComponent;
  let fixture: ComponentFixture<MarkdownTutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownTutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkdownTutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
