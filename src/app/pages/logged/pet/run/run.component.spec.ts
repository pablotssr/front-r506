import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunComponent } from './run.component';

describe('RunComponent', () => {
  let component: RunComponent;
  let fixture: ComponentFixture<RunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunComponent]
    });
    fixture = TestBed.createComponent(RunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
