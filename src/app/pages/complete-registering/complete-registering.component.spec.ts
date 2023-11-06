import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRegisteringComponent } from './complete-registering.component';

describe('CompleteRegisteringComponent', () => {
  let component: CompleteRegisteringComponent;
  let fixture: ComponentFixture<CompleteRegisteringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteRegisteringComponent]
    });
    fixture = TestBed.createComponent(CompleteRegisteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
