import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoFinalizarComponent } from './turno-finalizar.component';

describe('TurnoFinalizarComponent', () => {
  let component: TurnoFinalizarComponent;
  let fixture: ComponentFixture<TurnoFinalizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoFinalizarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoFinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
