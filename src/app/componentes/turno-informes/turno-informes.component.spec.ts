import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoInformesComponent } from './turno-informes.component';

describe('TurnoInformesComponent', () => {
  let component: TurnoInformesComponent;
  let fixture: ComponentFixture<TurnoInformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoInformesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
