import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayButtonTtsComponent } from './play-button-tts.component';

describe('PlayButtonTtsComponent', () => {
  let component: PlayButtonTtsComponent;
  let fixture: ComponentFixture<PlayButtonTtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayButtonTtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayButtonTtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
