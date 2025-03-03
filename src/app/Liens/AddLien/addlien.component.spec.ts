import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlienComponent } from './addlien.component';

describe('AddlienComponent', () => {
  let component: AddlienComponent;
  let fixture: ComponentFixture<AddlienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddlienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
