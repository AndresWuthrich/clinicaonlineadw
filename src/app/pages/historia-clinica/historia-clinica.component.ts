import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;

  public listaTurnos: Turno[] = [];
  // turnoActual: Turno | null = null;

  mensaje: string = '';

  //Pantallas
  verTabla: boolean = true;
  cancelarTurnoPantalla: boolean = false;

  constructor(public auth: AuthService, private usuarioService: UsuarioService, private turnoService: TurnoService) {
    // this._Tservice.traerTodos().subscribe((turnos: Turno[]) => {
    //   this.listadoTurnos = turnos;
    //   console.log(this.listadoTurnos);
    // });


  }

  async ngOnInit() {

    var user = await this.auth.usuario;
    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
      console.log(dataUser);
      this.usuarioLogueado = dataUser;

      // this.turnoService.obtenerTurnoDe(this.usuarioLogueado?.uid).subscribe(data => {
      //   this.listaTurnos = data;
      // });
    }
  }

  cancelarTurno(turno: Turno) {
    // console.log(turno);

    // this.turnoActual = turno;
    this.verTabla = false;
    this.cancelarTurnoPantalla = true;
    // this.router.navigate(['/cancelarTurno', [turno]]);
    // this.router.navigate(['/cancelarTurno']);
  }

  eventoCancelarTurno(event$: any) {
    setTimeout(() => {
      console.log(event$);
      console.log(this.mensaje);
      if (event$) {

        // this.turnoActual.comentarioPaciente = this.mensaje;
        // this.itemActual.estado = 'CANCELADO';
        // ACTUALIZAR EN FIREBASE
      }
      this.cancelarTurnoPantalla = false;
      this.verTabla = true;

      // this.turnoActual = null;
      this.mensaje = '';
    }, 100);
  }

  eventoMensaje(event$: any) {
    this.mensaje = event$;
  }
}