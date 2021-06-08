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

  //Pantallas
  verTabla: boolean = true;
  cancelarTurnoPantalla: boolean = false;

  constructor(public auth: AuthService, private usuarioService: UsuarioService, private turnoService: TurnoService) { }

  async ngOnInit() {

    var user = await this.auth.usuario;
    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
      console.log(dataUser);
      this.usuarioLogueado = dataUser;

      // this.turnoService.traerTurnosEspecialistaPorUid(this.usuarioLogueado?.uid).subscribe(data => {
      //   this.listadoTurnos = data;
      // });
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

        // this.turnoActual!.comentarioProfesional = this.mensaje;
        this.turnoActual!.estado = 'CANCELADO';

        // var idTurno = await this._Tservice.obtenerKeyTurno(this.turnoActual!);
        // console.log(this.turnoActual);
        // console.log(idTurno);
        // if (idTurno != null) {
        //   this._Tservice.updateTurnoCancelar(idTurno, this.turnoActual!);
        // }
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


}