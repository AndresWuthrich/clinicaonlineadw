import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoRechazarComponent } from './turno-rechazar.component';

describe('TurnoRechazarComponent', () => {
  let component: TurnoRechazarComponent;
  let fixture: ComponentFixture<TurnoRechazarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoRechazarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoRechazarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
