import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLevelChooserComponent } from './lesson-level-chooser.component';

describe('LessonLevelChooserComponent', () => {
  let component: LessonLevelChooserComponent;
  let fixture: ComponentFixture<LessonLevelChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonLevelChooserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonLevelChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
