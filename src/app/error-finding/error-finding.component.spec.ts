import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFindingComponent } from './error-finding.component';

describe('ErrorFindingComponent', () => {
  let component: ErrorFindingComponent;
  let fixture: ComponentFixture<ErrorFindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorFindingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
