import { TestBed } from '@angular/core/testing';

import { ChainesService } from './chaines.service';

describe('ChainesService', () => {
  let service: ChainesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
