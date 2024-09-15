import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserLessonsComponent } from './form-user-lessons.component';

describe('FormUserLessonsComponent', () => {
  let component: FormUserLessonsComponent;
  let fixture: ComponentFixture<FormUserLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUserLessonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUserLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
