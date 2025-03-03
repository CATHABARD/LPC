import { TestBed } from '@angular/core/testing';

import { VisiteursService } from './visiteurs.service';

describe('VisiteursService', () => {
  let service: VisiteursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisiteursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
