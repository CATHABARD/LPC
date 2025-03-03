import { Injectable } from '@angular/core';
import { environment} from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  urlAddress: string = environment.urlAddress;

  constructor() { }
}
