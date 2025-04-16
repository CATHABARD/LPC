import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiensService } from '../Services/Liens/liens-service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { FrameComponent } from './frame.component';
import { BreakpointObserver } from '@angular/cdk/layout';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FrameComponent
      ],
      providers: [
        LiensService,
        BreakpointObserver
     ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
