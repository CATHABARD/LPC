import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting} from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AgendasService } from '../../Services/Agendas/agendas.service';

describe('AgendasServiceService', () => {
  let service: AgendasService;
  let httpTestingController: any;
  let apiPath = 'http://api.path;'

  httpTestingController = beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        HttpClient
      ]
    });
    service = TestBed.inject(AgendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Doit faire une requète http utilisant GET')

  });
