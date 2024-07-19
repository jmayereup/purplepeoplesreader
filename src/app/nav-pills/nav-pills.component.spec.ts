import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPillsComponent } from './nav-pills.component';

describe('NavPillsComponent', () => {
  let component: NavPillsComponent;
  let fixture: ComponentFixture<NavPillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavPillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavPillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
