import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLblComponent } from './lesson-lbl.component';

describe('LessonLblComponent', () => {
  let component: LessonLblComponent;
  let fixture: ComponentFixture<LessonLblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonLblComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonLblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
