import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoReseniaComponent } from './turno-resenia.component';

describe('TurnoReseniaComponent', () => {
  let component: TurnoReseniaComponent;
  let fixture: ComponentFixture<TurnoReseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoReseniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
