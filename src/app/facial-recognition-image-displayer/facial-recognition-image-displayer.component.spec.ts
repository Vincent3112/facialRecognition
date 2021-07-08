import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacialRecognitionImageDisplayerComponent } from './facial-recognition-image-displayer.component';

describe('FacialRecognitionImageDisplayerComponent', () => {
  let component: FacialRecognitionImageDisplayerComponent;
  let fixture: ComponentFixture<FacialRecognitionImageDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacialRecognitionImageDisplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacialRecognitionImageDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
