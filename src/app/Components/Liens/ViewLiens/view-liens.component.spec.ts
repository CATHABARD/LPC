import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLiensComponent } from './view-liens.component';

describe('ViewLiensComponent', () => {
  let component: ViewLiensComponent;
  let fixture: ComponentFixture<ViewLiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLiensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
