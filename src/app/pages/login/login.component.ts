import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading: boolean;
  email: string = '';
  password: string = '';
  public listaUsuariosAccesoRapido: Usuario[] = [];
  public autocompletar: string = '';

  constructor(private usuarioService: UsuarioService, public auth: AuthService) {
    this.loading = false;
   }

  ngOnInit(): void {
  }

  Ingresar(){
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 3000);

    this.auth.Ingresar(this.email, this.password);
    // this.email=this.password="";

    // if(this.auth.errorLogin){
    //   Swal.fire({
    //     title: this.auth.errorLogin
    //   });
    //   }
  }

  Autocompletar(){
    this.autocompletar='si';

    this.usuarioService.traerTodos().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.listaUsuariosAccesoRapido = usuarios;
    });

    // this.email="andreswuthrich82@gmail.com";
    // this.password="adw1982";
  }

  cargarUsuariosAccesoRapido(email: string){
    this.listaUsuariosAccesoRapido.forEach(usuario => {
      if(usuario.email == email){
        this.email=usuario.email;
        this.password=usuario.password;
      }
    });
  }
}
