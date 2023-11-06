import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathsComponent } from './maths.component';

describe('MathsComponent', () => {
  let component: MathsComponent;
  let fixture: ComponentFixture<MathsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MathsComponent]
    });
    fixture = TestBed.createComponent(MathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
