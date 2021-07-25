import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoCalificarAtencionComponent } from './turno-calificar-atencion.component';

describe('TurnoCalificarAtencionComponent', () => {
  let component: TurnoCalificarAtencionComponent;
  let fixture: ComponentFixture<TurnoCalificarAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoCalificarAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoCalificarAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
