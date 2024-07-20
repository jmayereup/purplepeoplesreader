import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundChooseComponent } from './not-found-choose.component';

describe('NotFoundChooseComponent', () => {
  let component: NotFoundChooseComponent;
  let fixture: ComponentFixture<NotFoundChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundChooseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
