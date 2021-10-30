import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
// import { Chart } from 'chart.js';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/clases/log';
import { fadeInDownAnimation, fadeInDownOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
  animations: [
    fadeInDownOnEnterAnimation()
  ]
})
export class InformesComponent implements OnInit {

  public listaTurnos: Turno[] = [];
  public listaEspecialidades: Especialidad[] = [];
  public listaEspecialistas: Usuario[] = [];
  public listaLogs: Log[] = [];

  public cantidadTurnoDia: any | null;
  public cantidadTurnoEspecialidad: any | null;
  public cantidadTurnoEspecialista: any | null;
  public cantidadPacienteEspecialidad: any | null;
  public cantidadMedicoEspecialidad: any | null;
  public arrayCantidadTurnoEspecialidad: any[] = [];
  public arrayCantidadTurnoDia: any[] = [];
  public arrayCantidadTurnoEspecialista: any[] = [];
  public arrayCantidadPacienteEspecialidad: any[] = [];
  public arrayCantidadMedicoEspecialidad: any[] = [];
  public arrayLogSistema: any[] = [];

  public info1: boolean = false;
  public info2: boolean = false;
  public info3: boolean = false;
  public info4: boolean = false;
  public info5: boolean = false;
  public info7: boolean = false;
  public info8: boolean = false;
  public flag: boolean = false;

  chart2 = [];
  // @ViewChild('myChart') canvasRef: ElementRef | undefined;
  
  
  constructor(private turnoService: TurnoService, private usuarioService: UsuarioService, private especialidadService: EspecialidadService, private logService: LogService) {
    this.turnoService.traerTodos().subscribe((turnos: Turno[]) => {
      this.listaTurnos = turnos;
      console.log('1',this.listaTurnos);
    });

    this.especialidadService.traerTodas().subscribe((especialidades: Especialidad[]) => {
      this.listaEspecialidades = especialidades;
      console.log('2',this.listaEspecialidades);
    });

    this.usuarioService.traerEspecialistas().subscribe((especialistas: Usuario[]) => {
      this.listaEspecialistas = especialistas;
      console.log('3',this.listaEspecialistas);
    });

    this.logService.traerTodos().subscribe((logs: Log[]) => {
      this.listaLogs = logs;
      console.log('4',this.listaLogs);
    });
   }

  ngOnInit(): void {
    // new Chart ('myChart', {
    //   type: 'pie',
    //   data: { 
    //     datasets:[{
    //       label: 'Voto',
    //       data: [101,102,103],
    //       backgroundColor: [
    //         'rgba(40,23,244,0.9)',
    //         'rgba(192,255,0,0.9)',
    //         'rgba(239,23,244,0.9)',
    //       ]
    //     }],
    //     labels: ['Blue', 'Green', 'Pink']
    //   }
      // options:{
      //   title:{
      //     Text: "PIIIIIE Chart",
      //     display: true
      //   },
      //   scales:{
      //   //   yAxes:[{
      //   //     display: true,
      //   //     ticks:{
      //   //       display: true,
      //   //       beginAtZero: true,
      //   //     }
      //   //   }],
      //   }
      // }
    // })
  }

  informe1(){
    this.info1 = true;
    this.info2 = false;
    this.info3 = false;
    this.info4 = false;
    this.info5 = false;
    this.info7 = false;
    this.info8 = false;

    this.arrayLogSistema = [] //blanqueo array

    // var arrayEspecialidad: string[] = [];
    this.listaLogs.forEach(log => {
      this.arrayLogSistema.push(log);
    });

    // arrayEspecialidad.forEach(descripcion => {

    //   this.cantidadTurnoEspecialidad = {
    //     descripcion: descripcion,
    //     cantidad: 0,
    //   }
    //   this.listaTurnos.forEach(turno => {
    //     if (turno.especialidad!.descripcion == descripcion) {
    //       this.cantidadTurnoEspecialidad.cantidad++;
    //     }
    //   });
    //   this.arrayCantidadTurnoEspecialidad.push(this.cantidadTurnoEspecialidad);
    //   console.log('2',this.cantidadTurnoEspecialidad);

    // });
  }

  informe2(){
    this.info1 = false;
    this.info2 = true;
    this.info3 = false;
    this.info4 = false;
    this.info5 = false;
    this.info7 = false;
    this.info8 = false;

    this.arrayCantidadTurnoEspecialidad = [] //blanqueo array

    var arrayEspecialidad: string[] = [];
    this.listaEspecialidades.forEach(especialidad => {
      arrayEspecialidad.push(especialidad.descripcion);
    });

    arrayEspecialidad.forEach(descripcion => {

      this.cantidadTurnoEspecialidad = {
        descripcion: descripcion,
        cantidad: 0,
      }
      this.listaTurnos.forEach(turno => {
        if (turno.especialidad!.descripcion == descripcion) {
          this.cantidadTurnoEspecialidad.cantidad++;
        }
      });
      this.arrayCantidadTurnoEspecialidad.push(this.cantidadTurnoEspecialidad);
      console.log('2',this.cantidadTurnoEspecialidad);

    });

    
    // new Chart ('myChart', {
    //   type: 'pie',
    //   data: { 
    //     datasets:[{
    //       label: 'Voto',
    //       data: [101,102,103],
    //       backgroundColor: [
    //         'rgba(40,23,244,0.9)',
    //         'rgba(192,255,0,0.9)',
    //         'rgba(239,23,244,0.9)',
    //       ]
    //     }],
    //     labels: ['Blue', 'Green', 'Pink']
    //   }
      // options:{
      //   title:{
      //     Text: "PIIIIIE Chart",
      //     display: true
      //   },
      //   scales:{
      //   //   yAxes:[{
      //   //     display: true,
      //   //     ticks:{
      //   //       display: true,
      //   //       beginAtZero: true,
      //   //     }
      //   //   }],
      //   }
      // }
    // })

  }

  informe3(){
    this.info1 = false;
    this.info2 = false;
    this.info3 = true;
    this.info4 = false;
    this.info5 = false;
    this.info7 = false;
    this.info8 = false;

    this.arrayCantidadTurnoDia = [] //blanqueo array

    var arrayDias: string[] = [];
    this.listaTurnos.forEach(turno => {
      console.log('lista',turno.diaTurno);

      this.flag = false;
      arrayDias.forEach(dia =>{
        if (turno.diaTurno == dia) {
          this.flag = true;
        }
      })
      if (this.flag == false){
        arrayDias.push(turno.diaTurno);
      }
    });

    arrayDias.forEach(dia => {

      this.cantidadTurnoDia = {
        dia: dia,
        cantidad: 0,
      }

      this.listaTurnos.forEach(turno => {
        if (turno.diaTurno == dia) {
          this.cantidadTurnoDia.cantidad++;
        }
      })
      this.arrayCantidadTurnoDia.push(this.cantidadTurnoDia);
      console.log('3',this.arrayCantidadTurnoDia);
      console.log('3',arrayDias);

    });
  }

  informe4(){
    this.info1 = false;
    this.info2 = false;
    this.info3 = false;
    this.info4 = true;
    this.info5 = false;
    this.info7 = false;
    this.info8 = false;

    this.arrayCantidadTurnoEspecialista = [] //blanqueo array

    var arrayEspecialista: string[] = [];
    this.listaEspecialistas.forEach(especialista => {
      arrayEspecialista.push(especialista.apellido);
    });

    arrayEspecialista.forEach(apellido => {

      this.cantidadTurnoEspecialista = {
        apellido: apellido,
        cantidad: 0,
      }
      this.listaTurnos.forEach(turno => {
        if (turno.especialista!.apellido == apellido) {
          this.cantidadTurnoEspecialista.cantidad++;
        }
      });
      this.arrayCantidadTurnoEspecialista.push(this.cantidadTurnoEspecialista);
      console.log('4',this.cantidadTurnoEspecialista);

    });
  }

  informe5(){
    this.info1 = false;
    this.info2 = false;
    this.info3 = false;
    this.info4 = false;
    this.info5 = true;
    this.info7 = false;
    this.info8 = false;

    this.arrayCantidadTurnoEspecialista = [] //blanqueo array

    var arrayEspecialista: string[] = [];
    this.listaEspecialistas.forEach(especialista => {
      arrayEspecialista.push(especialista.apellido);
    });

    arrayEspecialista.forEach(apellido => {

      this.cantidadTurnoEspecialista = {
        apellido: apellido,
        cantidad: 0,
      }
      this.listaTurnos.forEach(turno => {
        if (turno.especialista!.apellido == apellido && turno.estado == 'Finalizado') {
          this.cantidadTurnoEspecialista.cantidad++;
        }
      });
      this.arrayCantidadTurnoEspecialista.push(this.cantidadTurnoEspecialista);
      console.log('4',this.cantidadTurnoEspecialista);

    });
  }

  informe7(){ //no anda
    this.info1 = false;
    this.info2 = false;
    this.info3 = false;
    this.info4 = false;
    this.info5 = false;
    this.info7 = true;
    this.info8 = false;

    this.arrayCantidadPacienteEspecialidad = [] //blanqueo array

    var arrayEspecialidad: string[] = [];
    this.listaEspecialidades.forEach(especialidad => {
      arrayEspecialidad.push(especialidad.descripcion);
    });

    arrayEspecialidad.forEach(descripcion => {

      this.cantidadPacienteEspecialidad = {
        descripcion: descripcion,
        cantidad: 0
      }
      this.listaTurnos.forEach(turno => {
        if (turno.especialidad!.descripcion == descripcion) {
          this.cantidadPacienteEspecialidad.cantidad++;
        }
      });
      this.arrayCantidadPacienteEspecialidad.push(this.cantidadPacienteEspecialidad);
      console.log('2',this.cantidadPacienteEspecialidad);

    });
  }

  informe8(){
    this.info1 = false;
    this.info2 = false;
    this.info3 = false;
    this.info4 = false;
    this.info5 = false;
    this.info7 = false;
    this.info8 = true;

    this.arrayCantidadMedicoEspecialidad = [] //blanqueo array

    var arrayEspecialidad: string[] = [];
    this.listaEspecialidades.forEach(especialidad => {
      arrayEspecialidad.push(especialidad.descripcion);
    });

    arrayEspecialidad.forEach(descripcion => {

      this.cantidadMedicoEspecialidad = {
        descripcion: descripcion,
        cantidad: 0,
      }
      this.listaEspecialistas.forEach(especialista => {
        especialista.especialidad?.forEach(especialidad => {
          if (especialidad.descripcion == descripcion) {
            this.cantidadMedicoEspecialidad.cantidad++;
          }
        })
      });
      this.arrayCantidadMedicoEspecialidad.push(this.cantidadMedicoEspecialidad);
      console.log('2',this.cantidadMedicoEspecialidad);
    });
  }

}
