import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoCancelarComponent } from './turno-cancelar.component';

describe('TurnoCancelarComponent', () => {
  let component: TurnoCancelarComponent;
  let fixture: ComponentFixture<TurnoCancelarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoCancelarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoCancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
