import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting} from '@angular/common/http/testing'
import { provideHttpClient } from '@angular/common/http';
import { AuthentificationsService } from '../../Services/Authentifications/authentifications.service';

describe('AuthentificationsService', () => {
  let service: AuthentificationsService;
  let httpTestingController: any;
  let apiPath = 'http://api.path;'

  httpTestingController = beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(AuthentificationsService);
    service.apiUrl = apiPath;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Doit faire une requète http utilisant GET')

  });
 