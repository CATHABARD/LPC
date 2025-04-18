import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpilotesComponent } from './viewpilotes.component';

describe('ViewpilotesComponent', () => {
  let component: ViewpilotesComponent;
  let fixture: ComponentFixture<ViewpilotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewpilotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpilotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
