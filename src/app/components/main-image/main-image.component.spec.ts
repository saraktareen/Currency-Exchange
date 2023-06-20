import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainImageComponent } from './main-image.component';

describe('MainImageComponent', () => {
  let component: MainImageComponent;
  let fixture: ComponentFixture<MainImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainImageComponent]
    });
    fixture = TestBed.createComponent(MainImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
