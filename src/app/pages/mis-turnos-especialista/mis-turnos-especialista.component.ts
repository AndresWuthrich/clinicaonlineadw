import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Usuario } from 'src/app/clases/usuario';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.css']
})

export class MisTurnosEspecialistaComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;

  public listadoTurnos: Turno[] = [];
  turnoActual: Turno | null = null;

  mensaje: string = '';
  filterPost = '';

  //Pantallas
  verTabla: boolean = true;
  cancelarTurnoPantalla: boolean = false;
  finalizarTurnoPantalla: boolean = false;
  historiaClinicaPantalla: boolean = false;
  rechazarTurnoPantalla: boolean = false;
  verReseniaTurnoPantalla: boolean = false;

  constructor(public auth: AuthService, private usuarioService: UsuarioService, private turnoService: TurnoService) { }

  async ngOnInit() {

    var user = await this.auth.usuario;
    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
      console.log(dataUser);
      this.usuarioLogueado = dataUser;

      this.turnoService.traerTurnosEspecialistaPorUid(dataUser.uid).subscribe(data => {
        this.listadoTurnos = data;
      });

      if(this.usuarioLogueado?.perfil == 'administrador'){
        this.turnoService.traerTurnosAdmin().subscribe(data => {
          this.listadoTurnos = data;
        });
      }
    }
  }

  cancelarTurno(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.cancelarTurnoPantalla = true;
  }

  eventoCancelarTurno(event$: any) {
    setTimeout(async () => {
      console.log(event$);
      console.log(this.mensaje);
      if (event$) {

        this.turnoActual!.comentarioEspecialista = this.mensaje;
        this.turnoActual!.estado = 'Cancelado';

        var idTurno = await this.turnoService.obtenerDocumentoTurno(this.turnoActual!);
        console.log(this.turnoActual);
        console.log(idTurno);
        if (idTurno != null) {
          this.turnoService.updateComentario(idTurno, this.turnoActual!);
        }
      }
      this.cancelarTurnoPantalla = false;
      this.verTabla = true;

      this.turnoActual = null;
      this.mensaje = '';
    }, 100);
  }

  async aceptarTurno(turno: Turno) {
    this.turnoActual = turno;
    this.turnoActual!.estado = 'Aceptado';

    var idTurno = await this.turnoService.obtenerDocumentoTurno(this.turnoActual!);
    console.log(this.turnoActual);
    console.log(idTurno);
    if (idTurno != null) {
      this.turnoService.updateComentario(idTurno, this.turnoActual!);
    }
    console.log("entro");
  }
  
  finalizarTurno(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.finalizarTurnoPantalla = true;
  }

  eventoFinalizarTurno($event: any) {
    setTimeout(async () => {
      console.log($event);
      console.log(this.mensaje);
      if ($event) {

        this.turnoActual!.comentarioEspecialista = this.mensaje;
        this.turnoActual!.estado = 'Finalizado';

        var idTurno = await this.turnoService.obtenerDocumentoTurno(this.turnoActual!);
        console.log(this.turnoActual);
        console.log(idTurno);
        if (idTurno != null) {
          this.turnoService.updateComentario(idTurno, this.turnoActual!);
        }
      }
      this.finalizarTurnoPantalla = false;
      this.verTabla = true;

      this.turnoActual = null;
      this.mensaje = '';
    }, 100);
  }

  eventoMensaje(event$: any) {
    this.mensaje = event$;
  }

  rechazarTurno(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.rechazarTurnoPantalla = true;
  }

  eventoRechazarTurno(event$: any) {
    setTimeout(async () => {
      console.log(event$);
      console.log(this.mensaje);
      if (event$) {

        this.turnoActual!.comentarioEspecialista = this.mensaje;
        this.turnoActual!.estado = 'Rechazado';

        var idTurno = await this.turnoService.obtenerDocumentoTurno(this.turnoActual!);
        console.log(this.turnoActual);
        console.log(idTurno);
        if (idTurno != null) {
          this.turnoService.updateComentario(idTurno, this.turnoActual!);
        }
      }
      this.rechazarTurnoPantalla = false;
      this.verTabla = true;

      this.turnoActual = null;
      this.mensaje = '';
    }, 100);
  }

  historiaClinica(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.historiaClinicaPantalla = true;
    this.verReseniaTurnoPantalla = false;
  }

  eventoHistoriaClinica($event: any) {
    setTimeout(async () => {
      console.log('2',$event);
      // console.log(this.mensaje);
      if ($event) {
        console.log('2.1',this.turnoActual);
        console.log('2.3',$event.altura);
        console.log('2.3',this.turnoActual?.paciente);
        // this.turnoActual!.comentarioEspecialista = this.mensaje;
        this.turnoActual!.paciente!.historiaClinica!.altura = $event.altura;
        this.turnoActual!.paciente!.historiaClinica!.peso = $event.peso;
        this.turnoActual!.paciente!.historiaClinica!.temperatura = $event.temperatura;
        this.turnoActual!.paciente!.historiaClinica!.presion = $event.presion;
        this.turnoActual!.paciente!.historiaClinica!.clave1 = $event.clave1;
        this.turnoActual!.paciente!.historiaClinica!.valor1 = $event.valor1;
        this.turnoActual!.paciente!.historiaClinica!.clave2 = $event.clave2;
        this.turnoActual!.paciente!.historiaClinica!.valor2 = $event.valor2;
        this.turnoActual!.paciente!.historiaClinica!.clave3 = $event.clave3;
        this.turnoActual!.paciente!.historiaClinica!.valor3 = $event.valor3;
        this.turnoActual!.paciente!.historiaClinica!.clave4 = $event.clave4;
        this.turnoActual!.paciente!.historiaClinica!.valor4 = $event.valor4;
        this.turnoActual!.paciente!.historiaClinica!.clave5 = $event.clave5;
        this.turnoActual!.paciente!.historiaClinica!.valor5 = $event.valor5;

        // this.turnoActual!.estado = 'Finalizado';

        var idUsuario = await this.usuarioService.obtenerDocumentoUsuario(this.turnoActual!.paciente!);
        console.log('3',this.turnoActual!.paciente);
        console.log('4',idUsuario);
        if (idUsuario != null) {
          this.usuarioService.actualizarHistoriaClinica(idUsuario, this.turnoActual!.paciente!);
        }





        // this.turnoActual!.comentarioEspecialista = this.mensaje;
        this.turnoActual!.historiaClinica!.altura = $event.altura;
        this.turnoActual!.historiaClinica!.peso = $event.peso;
        this.turnoActual!.historiaClinica!.temperatura = $event.temperatura;
        this.turnoActual!.historiaClinica!.presion = $event.presion;
        this.turnoActual!.historiaClinica!.clave1 = $event.clave1;
        this.turnoActual!.historiaClinica!.valor1 = $event.valor1;
        this.turnoActual!.historiaClinica!.clave2 = $event.clave2;
        this.turnoActual!.historiaClinica!.valor2 = $event.valor2;
        this.turnoActual!.historiaClinica!.clave3 = $event.clave3;
        this.turnoActual!.historiaClinica!.valor3 = $event.valor3;
        this.turnoActual!.historiaClinica!.clave4 = $event.clave4;
        this.turnoActual!.historiaClinica!.valor4 = $event.valor4;
        this.turnoActual!.historiaClinica!.clave5 = $event.clave5;
        this.turnoActual!.historiaClinica!.valor5 = $event.valor5;

        // this.turnoActual!.estado = 'Finalizado';

        var idTurno = await this.turnoService.obtenerDocumentoTurno(this.turnoActual!);
        console.log('5',this.turnoActual);
        console.log('6',idTurno);
        if (idTurno != null) {
          this.turnoService.updateComentario(idTurno, this.turnoActual!);
        }
      }

      this.historiaClinicaPantalla = false;
      this.verTabla = true;

      this.turnoActual = null;
      this.mensaje = '';
    }, 100);
  }

  verResenia(turno: Turno) {
    this.turnoActual = turno;
    this.verTabla = false;
    this.verReseniaTurnoPantalla = true;
    this.historiaClinicaPantalla = false;
    // this.verMiHCPantalla = false;
  }
}