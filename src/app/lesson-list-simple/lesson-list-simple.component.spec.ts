import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonListSimpleComponent } from './lesson-list-simple.component';

describe('LessonListSimpleComponent', () => {
  let component: LessonListSimpleComponent;
  let fixture: ComponentFixture<LessonListSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonListSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonListSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
