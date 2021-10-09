import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Log } from 'src/app/clases/log';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { LogService } from 'src/app/services/log.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

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
  public logUsuario: Log = new Log();

  constructor(private usuarioService: UsuarioService, public auth: AuthService, public logService: LogService, private router: Router) {
    this.loading = false;
   }

  ngOnInit(): void {
  }

  async Ingresar(){
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 3000);

    // try{
      const usuarioLogin = await this.auth.Ingresar(this.email, this.password);
      console.log('IN!!!', usuarioLogin);


      if (usuarioLogin && usuarioLogin.user?.emailVerified){
        console.log('USER', usuarioLogin);

        this.usuarioService.traerTodos().subscribe((usuarios: Usuario[]) => {
          // console.log(usuarios);
          usuarios.forEach(usuario => {
            if(usuario.uid == usuarioLogin.user.uid){
              if(usuario.perfil == 'especialista' && usuario.cuentaAprobada == false ){

                console.log('HOLA', usuarioLogin);
                console.log('HOLA2', usuario);

                this.auth.Logout();

                Swal.fire({
                  title: 'Cuenta de usuario especialista debe ser aprobada por administrador'
                });

                this.router.navigate(['bienvenido']);
              } else {

                console.log('UUIDV4');
                
                this.logUsuario = {
                  id: uuidv4(),
                  diaHorario: new Date(),
                  usuarioLog: this.email,
                }
                this.logService.agregarLog(this.logUsuario);
                
                this.router.navigate(['bienvenido']);
              }
            }
          })
        });
        // this.router.navigate(['bienvenido']);
      }else if (usuarioLogin && usuarioLogin.user?.emailVerified==false){
        this.router.navigate(['verificacion-email']);
      } else {
        this.router.navigate(['registro']);    
      } 
    // }catch (error){
    // console.log('error');
    // }

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
