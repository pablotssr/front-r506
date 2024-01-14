import { TestBed } from '@angular/core/testing';

import { BiteService } from './bite.service';

describe('BiteService', () => {
  let service: BiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
