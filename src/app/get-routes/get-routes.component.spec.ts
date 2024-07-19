import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRoutesComponent } from './get-routes.component';

describe('GetRoutesComponent', () => {
  let component: GetRoutesComponent;
  let fixture: ComponentFixture<GetRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetRoutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
