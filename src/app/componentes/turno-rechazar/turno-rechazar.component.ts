import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-turno-rechazar',
  templateUrl: './turno-rechazar.component.html',
  styleUrls: ['./turno-rechazar.component.css']
})
export class TurnoRechazarComponent implements OnInit {

  @Output() OpcionEvent = new EventEmitter<boolean>();
  @Output() mensajeEvent = new EventEmitter<string>();
  mensaje: string = '';
  error: string = "";

  constructor() { }

  async ngOnInit() {
  }

  Confirmar(opcion: boolean) {
    console.log(opcion);
    if (opcion) {
      if (this.mensaje != '') {
        this.OpcionEvent.emit(opcion);
        this.mensajeEvent.emit(this.mensaje);
      }
      else {
        console.log("error");
        this.error = "1";
      }
    }
    else {
      this.OpcionEvent.emit(opcion);
      this.mensajeEvent.emit(this.mensaje);
    }
  }
}
