import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiasAtencion } from 'src/app/clases/dias-atencion';
import { Especialidad } from 'src/app/clases/especialidad';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { flipAnimation, flipOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css'],
  animations: [
    flipOnEnterAnimation()
  ]
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

    if (this.usuarioLogueado?.perfil == 'paciente') {
      if (this.especialidadSeleccionada != null && this.especialistaSeleccionado != null) {
        this.cargarListaDeTurnos();
        console.log('lista turnos');
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

  reservarTurno(horario: any, dia: any) {
    var auxTurno: Turno

    console.log("H", horario);
    console.log("d", dia);
    console.log(this.usuarioLogueado);

    if (this.usuarioLogueado?.perfil == "paciente") {

      // var dataUser: any = this.usuarioService.obtenerUsuarioPorEmail(user.email);
      // console.log(dataUser);
      // this.usuarioLogueado = dataUser;

      auxTurno = {
        id: uuidv4(),
        paciente: this.usuarioLogueado,
        especialista: this.especialistaSeleccionado,
        estado: 'Pendiente',
        horarioTurno: horario,
        diaTurno : dia.diaExacto,
        especialidad: this.especialidadSeleccionada,
        comentarioEspecialista: '',
        comentarioPaciente: '',
        encuesta: {
          //atencionRecibida: 'Prueba',
          recomendar: '',
          sugerencia: ''
        },
        mensajeCalificacionAtencion: '',
        calificacionAtencion: ''
      }
      console.log(auxTurno);
      this.turnoService.agregarTurno(auxTurno)
      .then(() => {
        Swal.fire({
          title: 'Turno solicitado con éxito'
        });
      }).catch((error) => {
        Swal.fire({
          title: error.code,
          text: error.message
        });
      });
      ;

      this.router.navigate(['/bienvenido']);
    }

    if (this.usuarioLogueado?.perfil == "administrador") {
      auxTurno = {
        id: uuidv4(),
        paciente: this.pacienteSeleccionado,
        especialista: this.especialistaSeleccionado,
        estado: 'Pendiente',
        horarioTurno: horario,
        diaTurno : dia.diaExacto,
        especialidad: this.especialidadSeleccionada,
        comentarioEspecialista: '',
        comentarioPaciente: '',
        encuesta: {
          atencionRecibida: 'Prueba',
          // servicioOnline: '',
          // estadoEstablecimiento: '',
          // recomiendaClinida: ''
        }
      }
      console.log(auxTurno);
      this.turnoService.agregarTurno(auxTurno);
      // this._Mservice.mensajeExitoso("Le cargaste el turno a " + auxTurno.paciente?.nombre + " con exito! (ADMIN)");
      this.router.navigate(['/home']);
    }
  }

  cargarListaDeTurnos() {
    this.cargar15dias();
    this.filtradoDeDias();
    // console.log("entra");
  }

  filtradoDeDias() {
    if (this.especialistaSeleccionado == undefined && this.listaDias != []) {
      console.log("test1");
    } else {
      var aux;
      console.log('1', this.especialistaSeleccionado);
      console.log('2', this.listaDias);

      // console.log(this.listaDias[0].getDate());// 27
      // console.log(this.listaDias[0].getDay()); // 4 (raro)
      // console.log(this.listaDias[0].getMonth()); // 4 (raro)
      // console.log(this.listaDias[0].getFullYear()); // 2021
      // console.log(this.listaDias[0].toDateString()); // Thu May 27 2021
      console.log('3', this.listaDias[0].toLocaleDateString());// 27/5/2021
      // console.log('4', this.especialistaSeleccionado.diasAtencion[0]);
      console.log('4', this.especialistaSeleccionado.horarioAtencion[0]);
      this.listaDias.forEach(dia => {
        var diaSemana = this.queDiaEs(dia);
        console.log('5', diaSemana);
        var d = this.queDiaDeEspecialistaDevuelvo(diaSemana);
        console.log('6', d);

        aux = {
          dia: dia,
          diaExacto: dia.toLocaleDateString(),
          diaSemana: diaSemana,
          data: d,
          turnos: this.calculaTurnos(d),
        }
        this.listaObjetosDias.push(aux);
      }); 
      console.log("inicial", this.listaObjetosDias);

      this.listaObjetosDias.forEach(dia => {
        console.log("dia", dia);
        if (dia.diaSemana == "DOMINGO" || dia.data == undefined) {
          this.listaObjetosDias.splice(this.listaObjetosDias.indexOf(dia), 1);
        }
      });
      this.listaObjetosDias.forEach(dia => {
        if (dia.data.trabaja == false) {
          this.listaObjetosDias.splice(this.listaObjetosDias.indexOf(dia), 1);
        }
      });
      console.log("viejo", this.listaObjetosDias);

      this.listaTurnos.forEach(turno => {
        console.log(turno);
        if (turno.especialista?.uid == this.especialistaSeleccionado.uid) {
          console.log("Son iguales");
          this.listaObjetosDias.forEach(dia => {
            if (turno.diaTurno == dia.diaExacto) {
              dia.turnos.forEach((hturno: any) => {
                if (hturno == turno.horarioTurno) {
                  console.log("aca x3");
                  dia.turnos.splice(dia.turnos.indexOf(hturno), 1);
                } else {
                  console.log("aca x4");
                }
              });
              console.log("aca x2");
            }
          });
        }
      });
      console.log("actual", this.listaObjetosDias);

    }
  }

  calculaTurnos(data: any) {
    console.log("data",data);
    if (data != null) {
      var arrayTurnosPosibles = [];
      var auxMax = data.fin;
      var auxMin = data.inicio;

      // while(auxMax != data.inicia){
        console.log("dataFIN",data.fin);
        console.log("dataMIN",auxMin);

      while (auxMin != data.fin) {
        arrayTurnosPosibles.push(auxMin);
        auxMin = auxMin + 1;
      }
      console.log("turnos posibles", arrayTurnosPosibles);
      return arrayTurnosPosibles;
    } else {
      return null;
    }
  }

  queDiaDeEspecialistaDevuelvo(diaSemana: string) {
    var retorno;
    console.log("ret",retorno);

    // this.especialistaSeleccionado.diasAtencion.forEach((d: DiasAtencion) => {
    this.especialistaSeleccionado.horarioAtencion.forEach((d: DiasAtencion) => {
      console.log("diaSemana",diaSemana);
      console.log("literal",d.literal);
      if (diaSemana == d.literal) {
        retorno = d;
      }
    });
    return retorno;
  }
  queDiaEs(dia: Date) {
    // console.log("--------");
    console.log(dia.toDateString().split(' ')[0]);
    var retorno = "";
    switch (dia.toDateString().split(' ')[0]) {
      case 'Mon':
        retorno = "LUNES";
        break;
      case 'Tue':
        retorno = "MARTES";
        break;
      case 'Wed':
        retorno = "MIERCOLES";
        break;
      case 'Thu':
        retorno = "JUEVES";
        break;
      case 'Fri':
        retorno = "VIERNES";
        break;
      case 'Sat':
        retorno = "SABADO";
        break;
      case 'Sun':
        retorno = "DOMINGO";
        break;
    }
    return retorno;
  }

  cargar15dias() {
    var fecha1 = new Date(Date.now());
    var fecha2 = new Date(Date.now());
    var fecha3 = new Date(Date.now());
    var fecha4 = new Date(Date.now());
    var fecha5 = new Date(Date.now());
    var fecha6 = new Date(Date.now());
    var fecha7 = new Date(Date.now());
    var fecha8 = new Date(Date.now());
    var fecha9 = new Date(Date.now());
    var fecha10 = new Date(Date.now());
    var fecha11 = new Date(Date.now());
    var fecha12 = new Date(Date.now());
    var fecha13 = new Date(Date.now());
    var fecha14 = new Date(Date.now());
    var fecha15 = new Date(Date.now());

    fecha2.setDate(fecha2.getDate() + 1);
    fecha3.setDate(fecha3.getDate() + 2);
    fecha4.setDate(fecha4.getDate() + 3);
    fecha5.setDate(fecha5.getDate() + 4);
    fecha6.setDate(fecha6.getDate() + 5);
    fecha7.setDate(fecha7.getDate() + 6);
    fecha8.setDate(fecha8.getDate() + 7);
    fecha9.setDate(fecha9.getDate() + 8);
    fecha10.setDate(fecha10.getDate() + 9);
    fecha11.setDate(fecha11.getDate() + 10);
    fecha12.setDate(fecha12.getDate() + 11);
    fecha13.setDate(fecha13.getDate() + 12);
    fecha14.setDate(fecha14.getDate() + 13);
    fecha15.setDate(fecha15.getDate() + 14);

    this.listaDias.push(fecha1);
    this.listaDias.push(fecha2);
    this.listaDias.push(fecha3);
    this.listaDias.push(fecha4);
    this.listaDias.push(fecha5);
    this.listaDias.push(fecha6);
    this.listaDias.push(fecha7);
    this.listaDias.push(fecha8);
    this.listaDias.push(fecha9);
    this.listaDias.push(fecha10);
    this.listaDias.push(fecha11);
    this.listaDias.push(fecha12);
    this.listaDias.push(fecha13);
    this.listaDias.push(fecha14);
    this.listaDias.push(fecha15);

    console.log('lista dias', this.listaDias);
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
