import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittelienComponent } from './edittelien.component';

describe('EdittelienComponent', () => {
  let component: EdittelienComponent;
  let fixture: ComponentFixture<EdittelienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdittelienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittelienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
