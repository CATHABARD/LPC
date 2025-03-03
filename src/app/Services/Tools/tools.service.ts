import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  ongletSubject = new Subject<number>();

  constructor() { }

  public emitOngletChanged(index: number) {
    this.ongletSubject.next(index);
  }
}
