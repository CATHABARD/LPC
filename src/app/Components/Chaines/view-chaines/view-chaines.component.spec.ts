import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChainesComponent } from './view-chaines.component';

describe('ViewChainesComponent', () => {
  let component: ViewChainesComponent;
  let fixture: ComponentFixture<ViewChainesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChainesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
