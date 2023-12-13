import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangChooserComponent } from './lang-chooser.component';

describe('LangChooserComponent', () => {
  let component: LangChooserComponent;
  let fixture: ComponentFixture<LangChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangChooserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LangChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
