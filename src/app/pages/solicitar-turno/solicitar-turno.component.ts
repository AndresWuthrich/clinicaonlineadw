import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;

  public especialidadSeleccionada: any = null;
  public especialidadDescripcion: string = "";
  public listaEspecialidades!: Especialidad[];

  public especialistaSeleccionado: any = null;
  public listaEspecialistas: Usuario[] = [];
  public listaEspecialistasCalificados: Usuario[] = [];

  public pacienteSeleccionado: any = null;
  public listaPacientes: Usuario[] = [];

  public listaTurnos: Turno[] = [];

  public listaDias: Date[] = [];
  public listaObjetosDias: any[] = [];

  public listaHorariosDisponibles: any[] = [];
  public listaTurnosDisponibles: any[] = [];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private usuarioService: UsuarioService, private especialidadService: EspecialidadService, private turnoService: TurnoService) {
    this.especialidadService.traerTodas().subscribe((especialidades: Especialidad[]) => {
      console.log(especialidades);
      this.listaEspecialidades = especialidades;
    });

    this.usuarioService.traerEspecialistas().subscribe(data => {
      this.listaEspecialistas = data;
    });

    this.usuarioService.traerPacientes().subscribe(data => {
      this.listaPacientes = data;
    });

    this.turnoService.traerTodos().subscribe((turnos: Turno[]) => {
      this.listaTurnos = turnos;
    });

  }

  async ngOnInit() {

    var user = await this.auth.usuario;
    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
      console.log(dataUser);
      this.usuarioLogueado = dataUser;
    }

    // this.ObtenerTurnosDisponibles();
  }

  clickEspecialidad(data: any) {
    this.listaEspecialistasCalificados = [];
    this.especialidadSeleccionada = data;

    this.filtrarListaEspecialistas();
  }

  filtrarListaEspecialistas() {
    console.log(this.especialidadSeleccionada.descripcion);

    this.listaEspecialistas.forEach(especialista => {
      especialista.especialidad?.forEach(especialidad => {
      console.log(especialista.especialidad);
      if (especialidad.descripcion == this.especialidadSeleccionada.descripcion) {
      // if (especialista.especialidad == this.especialidadSeleccionada.descripcion) {
        this.listaEspecialistasCalificados.push(especialista);
      }
      });
    });
    console.log(this.listaEspecialistasCalificados);
  }

  clickEspecialista(data: any) {
    console.log(data);
    this.especialistaSeleccionado = data;
    console.log(this.usuarioLogueado?.perfil);

    this.ArmarListaHorarios();

    if (this.usuarioLogueado?.perfil == 'paciente') {
      if (this.especialidadSeleccionada != null && this.especialistaSeleccionado != null) {
        this.cargarListaDeTurnos();
      }
    }
    if (this.usuarioLogueado?.perfil == 'administrador') {
      console.log("ADMIN");
    }
  }
  clickPaciente(data: any) {
    this.pacienteSeleccionado = data;
    this.cargarListaDeTurnos();
  }

  // reservarTurno(horario: any, dia: any) {
  //   var auxTurno: Turno
  //   // console.log("H", horario);
  //   // console.log("d", dia);
  //   // console.log(this.usuarioRegistrado);
  //   if (this.usuarioRegistrado?.perfil == "paciente") {
  //     auxTurno = {
  //       paciente: this.usuarioRegistrado,
  //       profesional: this.especialistaElejido,
  //       estado: 'PENDIENTE',
  //       hora: horario,
  //       fecha: dia.diaExacto,
  //       especialidad: this.especialidadElejida,
  //       comentarioProfesional: '',
  //       comentarioPaciente: '',
  //       encuesta: {
  //         atencionRecibida: '',
  //         servicioOnline: '',
  //         estadoEstablecimiento: '',
  //         recomiendaClinida: ''
  //       }
  //     }
  //     console.log(auxTurno);
  //     this.turnoService.agregarTurno(auxTurno);
  //     // this._Mservice.mensajeExitoso("Su turno fue cargado de manera exitosa!");
  //     this.router.navigate(['/home']);
  //   }

  //   if (this.usuarioRegistrado?.perfil == "admin") {
  //     auxTurno = {
  //       paciente: this.pacienteElejido,
  //       profesional: this.especialistaElejido,
  //       estado: 'PENDIENTE',
  //       hora: horario,
  //       fecha: dia.diaExacto,
  //       especialidad: this.especialidadElejida,
  //       comentarioProfesional: '',
  //       comentarioPaciente: '',
  //       encuesta: {
  //         atencionRecibida: '',
  //         servicioOnline: '',
  //         estadoEstablecimiento: '',
  //         recomiendaClinida: ''
  //       }
  //     }
  //     console.log(auxTurno);
  //     this.turnoService.agregarTurno(auxTurno);
  //     // this._Mservice.mensajeExitoso("Le cargaste el turno a " + auxTurno.paciente?.nombre + " con exito! (ADMIN)");
  //     this.router.navigate(['/home']);
  //   }


  // }

  cargarListaDeTurnos() {
  //   this.cargar15dias();
  //   this.filtradoDeDias();
  //   // console.log("entra");
  }

  // filtradoDeDias() {
  //   if (this.especialistaElejido == undefined && this.listadoDias != []) {
  //     console.log("test1");
  //   } else {
  //     var aux;
      // console.log(this.especialistaElejido);
      // console.log(this.listadoDias);

      // console.log(this.listadoDias[0].getDate());// 27
      // console.log(this.listadoDias[0].getDay()); // 4 (raro)
      // console.log(this.listadoDias[0].getMonth()); // 4 (raro)
      // console.log(this.listadoDias[0].getFullYear()); // 2021
      // console.log(this.listadoDias[0].toDateString()); // Thu May 27 2021
      // console.log(this.listadoDias[0].toLocaleDateString());// 27/5/2021
      // console.log(this.especialistaElejido.diasDeAtencion[0]);
  //     this.listadoDias.forEach(dia => {
  //       var diaSemana = this.queDiaEs(dia);
  //       // console.log(diaSemana);
  //       var d = this.queDiaDeEspecialistaDevuelvo(diaSemana);

  //       aux = {
  //         dia: dia,
  //         diaExacto: dia.toLocaleDateString(),
  //         diaSemana: diaSemana,
  //         data: d,
  //         turnos: this.calculaTurnos(d),
  //       }
  //       this.listadoDeObjetosDias.push(aux);
  //     });
  //     console.log("inicial", this.listadoDeObjetosDias);

  //     this.listadoDeObjetosDias.forEach(dia => {
  //       if (dia.diaSemana == "DOMINGO" || dia.data == undefined) {
  //         this.listadoDeObjetosDias.splice(this.listadoDeObjetosDias.indexOf(dia), 1);
  //       }
  //     });
  //     this.listadoDeObjetosDias.forEach(dia => {
  //       if (dia.data.trabaja == false) {
  //         this.listadoDeObjetosDias.splice(this.listadoDeObjetosDias.indexOf(dia), 1);
  //       }
  //     });
  //     console.log("viejo", this.listadoDeObjetosDias);

  //     this.listadoTurnos.forEach(turno => {
  //       console.log(turno);
  //       if (turno.profesional?.uid == this.especialistaElejido.uid) {
  //         console.log("Son iguales");
  //         this.listadoDeObjetosDias.forEach(dia => {
  //           if (turno.fecha == dia.diaExacto) {
  //             dia.turnos.forEach((hturno: any) => {
  //               if (hturno == turno.hora) {
  //                 // console.log("aca x3");
  //                 dia.turnos.splice(dia.turnos.indexOf(hturno), 1);
  //               } else {
  //                 // console.log("aca x4");
  //               }
  //             });
  //             // console.log("aca x2");
  //           }
  //         });
  //       }
  //     });
  //     console.log("actual", this.listadoDeObjetosDias);

  //   }
  // }

  // calculaTurnos(data: any) {
  //   if (data != null) {
  //     var arrayTurnosPosibles = [];
  //     var auxMax = data.finaliza;
  //     var auxMin = data.inicia;

  //     // while(auxMax != data.inicia){
  //     while (auxMin != data.finaliza) {
  //       arrayTurnosPosibles.push(auxMin);
  //       auxMin = auxMin + 1;
  //     }
  //     // console.log("turnos posibles", arrayTurnosPosibles);
  //     return arrayTurnosPosibles;
  //   } else {
  //     return null;
  //   }
  // }

  // queDiaDeEspecialistaDevuelvo(diaSemana: string) {
  //   var retorno;
  //   this.especialistaElejido.diasDeAtencion.forEach((d: Dia) => {
  //     if (diaSemana == d.dia) {
  //       retorno = d;
  //     }
  //   });
  //   return retorno;
  // }
  // queDiaEs(dia: Date) {
  //   // console.log("--------");
  //   // console.log(dia.toDateString().split(' ')[0]);
  //   var retorno = "";
  //   switch (dia.toDateString().split(' ')[0]) {
  //     case 'Mon':
  //       retorno = "LUNES";
  //       break;
  //     case 'Tue':
  //       retorno = "MARTES";
  //       break;
  //     case 'Wed':
  //       retorno = "MIERCOLES";
  //       break;
  //     case 'Thu':
  //       retorno = "JUEVES";
  //       break;
  //     case 'Fri':
  //       retorno = "VIERNES";
  //       break;
  //     case 'Sat':
  //       retorno = "SABADO";
  //       break;
  //     case 'Sun':
  //       retorno = "DOMINGO";
  //       break;
  //   }
  //   return retorno;
  // }


  // cargar15dias() {
  //   var fecha1 = new Date(Date.now());
  //   var fecha2 = new Date(Date.now());
  //   var fecha3 = new Date(Date.now());
  //   var fecha4 = new Date(Date.now());
  //   var fecha5 = new Date(Date.now());
  //   var fecha6 = new Date(Date.now());
  //   var fecha7 = new Date(Date.now());
  //   var fecha8 = new Date(Date.now());
  //   var fecha9 = new Date(Date.now());
  //   var fecha10 = new Date(Date.now());
  //   var fecha11 = new Date(Date.now());
  //   var fecha12 = new Date(Date.now());
  //   var fecha13 = new Date(Date.now());
  //   var fecha14 = new Date(Date.now());
  //   var fecha15 = new Date(Date.now());

  //   fecha2.setDate(fecha2.getDate() + 1);
  //   fecha3.setDate(fecha3.getDate() + 2);
  //   fecha4.setDate(fecha4.getDate() + 3);
  //   fecha5.setDate(fecha5.getDate() + 4);
  //   fecha6.setDate(fecha6.getDate() + 5);
  //   fecha7.setDate(fecha7.getDate() + 6);
  //   fecha8.setDate(fecha8.getDate() + 7);
  //   fecha9.setDate(fecha9.getDate() + 8);
  //   fecha10.setDate(fecha10.getDate() + 9);
  //   fecha11.setDate(fecha11.getDate() + 10);
  //   fecha12.setDate(fecha12.getDate() + 11);
  //   fecha13.setDate(fecha13.getDate() + 12);
  //   fecha14.setDate(fecha14.getDate() + 13);
  //   fecha15.setDate(fecha15.getDate() + 14);

  //   this.listadoDias.push(fecha1);
  //   this.listadoDias.push(fecha2);
  //   this.listadoDias.push(fecha3);
  //   this.listadoDias.push(fecha4);
  //   this.listadoDias.push(fecha5);
  //   this.listadoDias.push(fecha6);
  //   this.listadoDias.push(fecha7);
  //   this.listadoDias.push(fecha8);
  //   this.listadoDias.push(fecha9);
  //   this.listadoDias.push(fecha10);
  //   this.listadoDias.push(fecha11);
  //   this.listadoDias.push(fecha12);
  //   this.listadoDias.push(fecha13);
  //   this.listadoDias.push(fecha14);
  //   this.listadoDias.push(fecha15);

  //   // console.log( this.listadoDias);
  // }

  // ObtenerTurnosDisponibles() {
  //   let tLunes: any[] = [];
  //   let tMartes: any[] = [];
  //   let tMiercoles: any[] = [];
  //   let tJueves: any[] = [];
  //   let tViernes: any[] = [];
  //   let tSabado: any[] = [];

  //   this.listaEspecialistas.forEach((especialista) => {
  //     if (especialista.uid == this.especialistaSeleccionado.uid) {
  //       //LUNES
  //       if (especialista.horarioAtencion != null && especialista.horarioAtencion[0].lunes.estado == true) {
  //         let auxInicio: number = parseInt(especialista.horarioAtencion[0].lunes.inicio);
  //         let auxFin: number = parseInt(especialista.horarioAtencion[0].lunes.fin);

  //         for (let index = auxInicio; index <= auxFin; index += 100) {
  //           let auxHora =
  //             index.toString().slice(0, index.toString().length - 2) +
  //             ':' +
  //             index.toString().slice(index.toString().length - 2);
  //           tLunes.push(auxHora);
  //         }
  //         this.listaHorariosDisponibles.push({
  //           dia: 'LUNES',
  //           fecha: '',
  //           horarios: tLunes,
  //           profesion: especialista.horarioAtencion[0].lunes.profesion,
  //         });
  //         }
  //       // this.listaHorariosDisponibles.push({
  //       //   dia: 'LUNES',
  //       //   fecha: '',
  //       //   horarios: tLunes,
  //       //   profesion: especialista.horarioAtencion[0].lunes.profesion,
  //       // });
  //       //MARTES
  //       if (especialista.horarioAtencion != null && especialista.horarioAtencion[0].martes.estado == true) {
  //         let auxInicio: number = parseInt(especialista.horarioAtencion[0].martes.inicio);
  //         let auxFin: number = parseInt(especialista.horarioAtencion[0].martes.fin);

  //         for (let index = auxInicio; index <= auxFin; index += 100) {
  //           let auxHora =
  //             index.toString().slice(0, index.toString().length - 2) +
  //             ':' +
  //             index.toString().slice(index.toString().length - 2);
  //           tMartes.push(auxHora);
  //         }
  //         this.listaHorariosDisponibles.push({
  //           dia: 'MARTES',
  //           fecha: '',
  //           horarios: tMartes,
  //           profesion: especialista.horarioAtencion[0].martes.profesion,
  //         });
  //         }
  //       // this.listaHorariosDisponibles.push({
  //       //   dia: 'MARTES',
  //       //   fecha: '',
  //       //   horarios: tMartes,
  //       //   profesion: especialista.horarioAtencion[0].martes.profesion,
  //       // });
  //       //MIERCOLES
  //       if (especialista.horarioAtencion != null && especialista.horarioAtencion[0].miercoles.estado == true) {
  //         let auxInicio: number = parseInt(especialista.horarioAtencion[0].miercoles.inicio);
  //         let auxFin: number = parseInt(especialista.horarioAtencion[0].miercoles.fin);

  //         for (let index = auxInicio; index <= auxFin; index += 100) {
  //           let auxHora =
  //             index.toString().slice(0, index.toString().length - 2) +
  //             ':' +
  //             index.toString().slice(index.toString().length - 2);
  //           tMiercoles.push(auxHora);
  //         }
  //         this.listaHorariosDisponibles.push({
  //           dia: 'MIERCOLES',
  //           fecha: '',
  //           horarios: tMiercoles,
  //           profesion: especialista.horarioAtencion[0].miercoles.profesion,
  //         });
  
  //       }
  //       // this.listaHorariosDisponibles.push({
  //       //   dia: 'MIERCOLES',
  //       //   fecha: '',
  //       //   horarios: tMiercoles,
  //       //   profesion: especialista.horarioAtencion[0].miercoles.profesion,
  //       // });
  //       //JUEVES
  //       if (especialista.horarioAtencion != null && especialista.horarioAtencion[0].jueves.estado == true) {
  //         let auxInicio: number = parseInt(especialista.horarioAtencion[0].jueves.inicio);
  //         let auxFin: number = parseInt(especialista.horarioAtencion[0].jueves.fin);

  //         for (let index = auxInicio; index <= auxFin; index += 100) {
  //           let auxHora =
  //             index.toString().slice(0, index.toString().length - 2) +
  //             ':' +
  //             index.toString().slice(index.toString().length - 2);
  //           tJueves.push(auxHora);
  //         }
  //         this.listaHorariosDisponibles.push({
  //           dia: 'JUEVES',
  //           fecha: '',
  //           horarios: tJueves,
  //           profesion: especialista.horarioAtencion[0].jueves.profesion,
  //         });
  
  //       }
  //       // this.listaHorariosDisponibles.push({
  //       //   dia: 'JUEVES',
  //       //   fecha: '',
  //       //   horarios: tJueves,
  //       //   profesion: p.atiende[0].jueves.profesion,
  //       // });
  //       //VIERNES
  //       if (especialista.horarioAtencion != null && especialista.horarioAtencion[0].viernes.estado == true) {
  //         let auxInicio: number = parseInt(especialista.horarioAtencion[0].viernes.inicio);
  //         let auxFin: number = parseInt(especialista.horarioAtencion[0].viernes.fin);

  //         for (let index = auxInicio; index <= auxFin; index += 100) {
  //           let auxHora =
  //             index.toString().slice(0, index.toString().length - 2) +
  //             ':' +
  //             index.toString().slice(index.toString().length - 2);
  //           tViernes.push(auxHora);
  //         }
  //         this.listaHorariosDisponibles.push({
  //           dia: 'VIERNES',
  //           fecha: '',
  //           horarios: tViernes,
  //           profesion: especialista.horarioAtencion[0].viernes.profesion,
  //         });
  
  //       }
  //       // this.listaHorariosDisponibles.push({
  //       //   dia: 'VIERNES',
  //       //   fecha: '',
  //       //   horarios: tViernes,
  //       //   profesion: especialista.horarioAtencion[0].viernes.profesion,
  //       // });
  //       //SABADO
  //       if (especialista.horarioAtencion != null && especialista.horarioAtencion[0].sabado.estado == true) {
  //         let auxInicio: number = parseInt(especialista.horarioAtencion[0].sabado.inicio);
  //         let auxFin: number = parseInt(especialista.horarioAtencion[0].sabado.fin);

  //         for (let index = auxInicio; index <= auxFin; index += 100) {
  //           let auxHora =
  //             index.toString().slice(0, index.toString().length - 2) +
  //             ':' +
  //             index.toString().slice(index.toString().length - 2);
  //           tSabado.push(auxHora);
  //         }
  //         this.listaHorariosDisponibles.push({
  //           dia: 'SABADO',
  //           fecha: '',
  //           horarios: tSabado,
  //           profesion: especialista.horarioAtencion[0].sabado.profesion,
  //         });
  
  //       }
  //       // this.listaHorariosDisponibles.push({
  //       //   dia: 'SABADO',
  //       //   fecha: '',
  //       //   horarios: tSabado,
  //       //   profesion: especialista.horarioAtencion[0].sabado.profesion,
  //       // });
  //     }
  //   });
  // }

  ArmarListaHorarios() {
    // this.ObtenerTurnosDisponibles();

    let auxLista: any[] = [...this.listaHorariosDisponibles];
    for (let index = 0; index < this.listaHorariosDisponibles.length; index++) {
      auxLista.push(this.listaHorariosDisponibles[index]);
    }

    let d = new Date();
    let auxCorte: any[];
    let auxCorte2: any[];

    if (d.getDay() != 0) {
      auxCorte = auxLista.slice(d.getDay() - 1, auxLista.length);
      auxCorte2 = auxLista.slice(0, d.getDay() - 1);
      auxLista = [...auxCorte];
      for (let index = 0; index < auxCorte2.length; index++) {
        auxLista.push(auxCorte2[index]);
      }
    }

    this.listaHorariosDisponibles = [...auxLista];

    //Coloco fecha
    let cont: number = 0;
    let auxFecha: string[] = [];

    for (let index = 0; index < this.listaHorariosDisponibles.length; index++) {
      auxFecha.push(this.SumarFecha(cont));
      if (this.listaHorariosDisponibles[index].dia == 'SABADO') {
        cont += 2;
      } else {
        cont++;
      }
    }

    let nuevoArray: any[] = [];
    for (let index = 0; index < this.listaHorariosDisponibles.length; index++) {
      nuevoArray.push({
        dia: this.listaHorariosDisponibles[index].dia,
        fecha: auxFecha[index],
        horarios: this.listaHorariosDisponibles[index].horarios,
        profesion: this.listaHorariosDisponibles[index].profesion
      });
    }
    this.listaHorariosDisponibles = [...nuevoArray];

    // HASTA ACA TENGO LOS HORARIOS DISPONIBLES POR PROFESIONAL
    // ACA FILTRO LOS NO DISPONIBLES

    this.listaTurnosDisponibles.forEach((turno) => {
      if (turno.uidEspecialista == this.especialistaSeleccionado.uid) {
        for (
          let index = 0;
          index < this.listaHorariosDisponibles.length;
          index++
        ) {
          if (this.listaHorariosDisponibles[index].fecha == turno.fecha) {
            // this.listaHorariosDisponibles[index].horarios.forEach((horario) => {
            //   if (horario == turno.hora) {
            //     let indexHorario =
            //       this.listaHorariosDisponibles[index].horarios.indexOf(
            //         horario
            //       );
            //     this.listaHorariosDisponibles[index].horarios.splice(
            //       indexHorario,
            //       1
            //     );
            //  }
            // });
          }
        }
      }
    });

    let aux:any[] = [];
    let flag = 0;
    for (const item of this.listaHorariosDisponibles) {
      if(aux.length < 12 && flag == 1){
        aux.push(item);
      }
      flag = 1;
    }

    this.listaHorariosDisponibles = [];
    this.listaHorariosDisponibles = aux;

    console.log(this.listaHorariosDisponibles);
  }

  SumarFecha(cantDias: number): string {
    var Fecha = new Date();
    var sFecha =
      fecha ||
      Fecha.getDate() +
        '/' +
        (Fecha.getMonth() + 1) +
        '/' +
        Fecha.getFullYear();
    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
    var aFecha = sFecha.split(sep);
    var fecha: any = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + cantDias);
    var anno = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;
    let fechaFinal: string = dia + sep + mes + sep + anno;
    return fechaFinal;
  }


}
