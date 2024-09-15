import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonListUserComponent } from './lesson-list-user.component';

describe('LessonListUserComponent', () => {
  let component: LessonListUserComponent;
  let fixture: ComponentFixture<LessonListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonListUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
