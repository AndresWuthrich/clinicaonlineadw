import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Usuario } from 'src/app/clases/usuario';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-turno-informes',
  templateUrl: './turno-informes.component.html',
  styleUrls: ['./turno-informes.component.css']
})
export class TurnoInformesComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;

  public listaTurnos: Turno[] = [];
  turnoActual: Turno | null = null;

  mensaje: string = '';

  //Pantallas
  verTabla: boolean = true;
  cancelarTurnoPantalla: boolean = false;
  encuestaTurnoPantalla: boolean = false;
  calificarAtencionTurnoPantalla: boolean = false;

  constructor(public auth: AuthService, private usuarioService: UsuarioService, private turnoService: TurnoService) {
    this.turnoService.traerTodos().subscribe((turnos: Turno[]) => {
      this.listaTurnos = turnos;
      console.log(this.listaTurnos);
    });

  }

  async ngOnInit() {

    var user = await this.auth.usuario;
    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
      console.log("dataUser",dataUser);
      this.usuarioLogueado = dataUser;

      // if(this.usuarioLogueado != null){
      //   this.turnoService.traerTurnosPacientePorUid(dataUser.uid).subscribe(data => {
      //     this.listaTurnos = data;
      //   });
  
      // }
    }
  }

  cancelarTurno(turno: Turno) {
    console.log(turno);

    this.turnoActual = turno;
    this.verTabla = false;
    this.cancelarTurnoPantalla = true;
  }

  eventoCancelarTurno(event$: any) {
    setTimeout(async () => {
      console.log(event$);
      console.log(this.mensaje);
      if (event$) {

        this.turnoActual!.comentarioPaciente = this.mensaje;
        this.turnoActual!.estado = 'Cancelado';

        var idTurno = await this.turnoService.obtenerDocumentoTurno(this.turnoActual!);
        console.log(this.turnoActual);
        console.log(idTurno);
        if (idTurno != null) {
          this.turnoService.updateComentario(idTurno, this.turnoActual!);

        }
        console.log(this.turnoActual);
      }
      this.cancelarTurnoPantalla = false;
      this.verTabla = true;

      this.turnoActual = null;
      this.mensaje = '';
    }, 100);
  }

  eventoMensaje(event$: any) {
    this.mensaje = event$;
  }

  completarEncuesta(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.encuestaTurnoPantalla = true;
    // this.verMiHCPantalla = false;
  }

  async eventoEncuesta($event: any){
    console.log("----------");
    console.log($event);
    if($event.recomendar){
    // if($event.opcion){
      console.log(this.turnoActual);
      this.turnoActual!.encuesta = $event;

      var idTurno = await this.turnoService.obtenerDocumentoTurno(this.turnoActual!);
      console.log(this.turnoActual);
      console.log(idTurno);
      if (idTurno != null) {
        this.turnoService.updateEncuesta(idTurno, this.turnoActual!);
      }
    }
    // this.verMiHCPantalla = false;
    this.encuestaTurnoPantalla = false;
    this.verTabla = true;

    this.turnoActual = null;
  }

  calificarAtencion(turno: Turno){
    this.turnoActual = turno;
    this.verTabla = false;
    // this.verMiHCPantalla = false;
    this.encuestaTurnoPantalla = false;
    this.calificarAtencionTurnoPantalla = true;    
  }

  async eventoCalificarAtencion($event: any){
    console.log("----------");
    console.log($event);
    if($event.calificacionAtencion){
    // if($event.opcion){
      console.log(this.turnoActual);
      this.turnoActual!.calificacionAtencion = $event.calificacionAtencion;
      this.turnoActual!.mensajeCalificacionAtencion = $event.mensajeCalificacionAtencion;

      var idTurno = await this.turnoService.obtenerDocumentoTurno(this.turnoActual!);
      console.log(this.turnoActual);
      console.log(idTurno);
      if (idTurno != null) {
        this.turnoService.updateAtencion(idTurno, this.turnoActual!);
      }
    }
    // this.verMiHCPantalla = false;
    this.encuestaTurnoPantalla = false;
    this.calificarAtencionTurnoPantalla = false; 
    this.verTabla = true;

    this.turnoActual = null;

  }
}