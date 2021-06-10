import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;
  listaEspecialidades:string = '';
  horariosProfesional:any = '';

  constructor(public auth: AuthService, private usuarioService: UsuarioService) {
   }

  async ngOnInit() {
    var usuarioActual = await this.auth.obtenerUsuarioActual();

    console.log('ACTUAL' +usuarioActual?.email);

    if(usuarioActual?.email != null){
      var datosUsuario: any = await this.usuarioService.obtenerUsuarioPorEmail(usuarioActual?.email);
      console.log('DATO USER' + datosUsuario);
      this.usuarioLogueado = datosUsuario;
    }
    console.log('data' + this.usuarioLogueado?.horarioAtencion);


    if(this.usuarioLogueado?.perfil == 'especialista'){
      this.usuarioLogueado?.especialidad?.forEach(e => {
        // this.listaEspecialidades === '' ? this.listaEspecialidades = e : this.listaEspecialidades += ', ' + e;
      });

      // this.horariosProfesional = this.usuarioLogueado?.horarioAtencion?[0];
      // if(this.usuarioLogueado != undefined && this.usuarioLogueado?.horarioAtencion[0].lunes.estado)
      if(this.horariosProfesional.lunes.estado){
        this.horariosProfesional.lunes.inicio = (this.horariosProfesional.lunes.inicio/100).toString() + ':' + '00';
        this.horariosProfesional.lunes.fin = (this.horariosProfesional.lunes.fin/100).toString() + ':' + '00';
      }
      if(this.horariosProfesional.martes.estado){
        this.horariosProfesional.martes.inicio = (this.horariosProfesional.martes.inicio/100).toString() + ':' + '00';
        this.horariosProfesional.martes.fin = (this.horariosProfesional.martes.fin/100).toString() + ':' + '00';
      }
      if(this.horariosProfesional.miercoles.estado){
        this.horariosProfesional.miercoles.inicio = (this.horariosProfesional.miercoles.inicio/100).toString() + ':' + '00';
        this.horariosProfesional.miercoles.fin = (this.horariosProfesional.miercoles.fin/100).toString() + ':' + '00';
      }
      if(this.horariosProfesional.jueves.estado){
        this.horariosProfesional.jueves.inicio = (this.horariosProfesional.jueves.inicio/100).toString() + ':' + '00';
        this.horariosProfesional.jueves.fin = (this.horariosProfesional.jueves.fin/100).toString() + ':' + '00';
      }
      if(this.horariosProfesional.viernes.estado){
        this.horariosProfesional.viernes.inicio = (this.horariosProfesional.viernes.inicio/100).toString() + ':' + '00';
        this.horariosProfesional.viernes.fin = (this.horariosProfesional.viernes.fin/100).toString() + ':' + '00';
      }
      if(this.horariosProfesional.sabado.estado){
        this.horariosProfesional.sabado.inicio = (this.horariosProfesional.sabado.inicio/100).toString() + ':' + '00';
        this.horariosProfesional.sabado.fin = (this.horariosProfesional.sabado.fin/100).toString() + ':' + '00';
      }
    }

  }

  async guardar() {
    console.log(this.usuarioLogueado);
    if (this.usuarioLogueado != null) {
      var uidUser = await this.usuarioService.obtenerDocumentoUsuario(this.usuarioLogueado);
      if (uidUser != null) {
        this.usuarioService.actualizarDiasAtencion(this.usuarioLogueado);
      }
    }
  }
}
