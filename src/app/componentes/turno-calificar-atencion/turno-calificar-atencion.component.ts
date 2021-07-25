import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-turno-calificar-atencion',
  templateUrl: './turno-calificar-atencion.component.html',
  styleUrls: ['./turno-calificar-atencion.component.css']
})
export class TurnoCalificarAtencionComponent implements OnInit {

  @Output() calificacionEvent = new EventEmitter<any>();
  mensaje: string = '';
  error: string = "";
  calificacion: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  Confirmar(opcion: boolean) {
    console.log(opcion);
    var aux = {
      mensajeCalificacionAtencion: this.mensaje,
      calificacionAtencion: this.calificacion
      // opcion: opcion
    }
    
    if (this.calificacion) {
    // if (opcion) {
      // if (this.mensaje != '') {
      if (this.calificacion != '') {
        this.calificacionEvent.emit(aux);
      }
      else {
        console.log("error");
        this.error = "6";
      }
    }
    else {
      this.calificacionEvent.emit(aux);
    }

  }
}
