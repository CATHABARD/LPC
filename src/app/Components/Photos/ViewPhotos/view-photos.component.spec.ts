import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhotosComponent } from './view-photos.component';

describe('ViewPhotosComponent', () => {
  let component: ViewPhotosComponent;
  let fixture: ComponentFixture<ViewPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
