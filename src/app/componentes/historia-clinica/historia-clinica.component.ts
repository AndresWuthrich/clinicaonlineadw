import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  @Output() historiaEvent = new EventEmitter<any>();
  altura: string = '';
  peso: string = '';
  temperatura: string = "";
  presion: string = "";
  clave1: string = "";
  valor1: string = "";
  clave2: string = "";
  valor2: string = "";
  error: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  Confirmar(opcion: boolean) {
    var aux = {
      altura: this.altura,
      peso: this.peso,
      temperatura: this.temperatura,
      presion: this.presion,
      clave1: this.clave1,
      valor1: this.valor1,
      clave2: this.clave2,
      valor2: this.valor2
    }
    console.log('1',aux);

    if (opcion) {
      if (this.altura == '' && this.peso == '' && this.temperatura == '') {
        this.error = "4"
      } else {
        if(this.presion == ''){
          this.error = "5";
        }
        else{
          this.historiaEvent.emit(aux);
        }
      }
    }
    else{
      this.historiaEvent.emit(aux);
    }
  }
}
