import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-turno-encuesta',
  templateUrl: './turno-encuesta.component.html',
  styleUrls: ['./turno-encuesta.component.css']
})
export class TurnoEncuestaComponent implements OnInit {

  @Output() encuestaEvent = new EventEmitter<any>();
  mensaje: string = '';
  recomendar: string = 'SI';
  error: string = "";
  prestaciones: string = '';
  canal: string = '';

  constructor() { }

  ngOnInit(): void {
  }


  Confirmar(opcion: boolean) {
    var aux = {
      prestaciones: this.prestaciones,
      recomendar: this.recomendar,
      sugerencia: this.mensaje,
      canal: this.canal
    }
    console.log(aux);

    if (opcion) {
      if (this.recomendar != 'SI' && this.recomendar != 'NO') {
        this.error = "4"
      } else {
        if(this.mensaje == '' || this.prestaciones == '' || this.canal == ''){
          this.error = "5";
        }
        else{
          this.encuestaEvent.emit(aux);
        }
      }
    }
    else{
      this.encuestaEvent.emit(aux);
    }
  }
}
