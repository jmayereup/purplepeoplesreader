import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonFullTextComponent } from './lesson-full-text.component';

describe('LessonFullTextComponent', () => {
  let component: LessonFullTextComponent;
  let fixture: ComponentFixture<LessonFullTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonFullTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonFullTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
