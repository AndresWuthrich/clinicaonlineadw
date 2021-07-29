import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Especialidad } from 'src/app/clases/especialidad';
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;
  public listadoTurnos: Turno[] = [];

  // email: string = '';
  // password: string = '';
  public signup: boolean;
  public registroUp: boolean;
  public condicion: boolean = false;
  public perfil: string = '';

  usuarioIngresado: any;
  
  public listaUsuariosEspecialistas: Usuario[] = [];
  public listaUsuariosPacientes: Usuario[] = [];
  public listaUsuariosPacientesSel: Usuario[] = [];
  public listaUsuarios: Usuario[] = [];
  public listaEspecialidadesUsuario: Especialidad[] = [];
  public usuarioAlta: Usuario = new Usuario();
  usuarioActual: Usuario | null = null;

  constructor(private usuarioService: UsuarioService, public auth: AuthService, private turnoService: TurnoService) {
    // this.usuarioIngresado = this.authService.usuario;
    this.signup = false;
    this.registroUp = false;

    this.usuarioService.traerPacientes().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.listaUsuariosPacientes = usuarios;
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

      this.turnoService.traerTurnosEspecialistaPorUid(dataUser.uid).subscribe(data => {
        this.listadoTurnos = data;
      });

      this.listaUsuariosPacientes.forEach(element => {
        this.listadoTurnos.forEach(turno => {
          if(element.uid == turno.paciente?.uid){
            this.listaUsuariosPacientesSel.push(element);
          }          
        });        
      });
    }
  }

  elegirPerfil(perfil: string){
    this.perfil = perfil;
  }

  historiaClinica(usuario: Usuario){
    this.usuarioActual = usuario;
  }
}
