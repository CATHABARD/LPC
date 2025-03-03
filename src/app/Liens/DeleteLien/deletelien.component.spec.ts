import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletelienComponent } from './deletelien.component';

describe('DeletelienComponent', () => {
  let component: DeletelienComponent;
  let fixture: ComponentFixture<DeletelienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletelienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletelienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
