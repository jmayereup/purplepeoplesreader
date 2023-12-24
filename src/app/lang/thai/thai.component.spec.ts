import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThaiComponent } from './thai.component';

describe('ThaiComponent', () => {
  let component: ThaiComponent;
  let fixture: ComponentFixture<ThaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
