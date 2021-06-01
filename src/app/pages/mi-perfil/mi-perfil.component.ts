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

  public usuario: Usuario | null = null;
  
  constructor(public auth: AuthService, private usuarioService: UsuarioService) {
   }

  async ngOnInit() {
    var usuarioActual = await this.auth.obtenerUsuarioActual();

    console.log(usuarioActual?.email);

    if(usuarioActual?.email != null){
      var datosUsuario: any = await this.usuarioService.obtenerUsuarioPorEmail(usuarioActual?.email);
      console.log(datosUsuario);
      this.usuario = datosUsuario;
    }
  }

}
