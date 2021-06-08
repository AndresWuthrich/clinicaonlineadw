import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Usuario } from 'src/app/clases/usuario';
import { Turno } from 'src/app/clases/turno';


@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})

export class MisTurnosComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;

  public listaTurnos: Turno[] = [];
  // turnoActual: Turno | null = null;

  mensaje: string = '';

  //Pantallas
  verTabla: boolean = true;
  cancelarTurnoPantalla: boolean = false;

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
      console.log(dataUser);
      this.usuarioLogueado = dataUser;

      if(this.usuarioLogueado != null){
        // this.turnoService.traerTurnosPacientePorUid(this.usuarioLogueado.uid).subscribe(data => {
        //   this.listaTurnos = data;
        // });
  
      }
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