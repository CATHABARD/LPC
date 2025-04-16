import { TestBed } from '@angular/core/testing';

import { MotoGPService } from './moto-gp.service';

describe('MotoGPService', () => {
  let service: MotoGPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotoGPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
