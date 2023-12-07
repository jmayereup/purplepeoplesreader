import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagChooserComponent } from './tag-chooser.component';

describe('TagChooserComponent', () => {
  let component: TagChooserComponent;
  let fixture: ComponentFixture<TagChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagChooserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
