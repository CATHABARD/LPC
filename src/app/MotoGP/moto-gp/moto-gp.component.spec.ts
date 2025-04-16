import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoGPComponent } from './moto-gp.component';

describe('MotoGPComponent', () => {
  let component: MotoGPComponent;
  let fixture: ComponentFixture<MotoGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoGPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotoGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
