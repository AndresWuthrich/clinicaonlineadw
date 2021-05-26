import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // email: string = '';
  // password: string = '';
  public signup: boolean;
  public registroUp: boolean;
  public condicion: boolean = false;
  public perfil: string = '';
  private imagenPerfil: any;
  private imagenPerfil2: any;

  public usuarioAlta: Usuario = new Usuario();

  private dbpath = '/usuarios';

  usuarioIngresado: any;
  
  public formRegistro: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router, public auth: AuthService) {
    // this.usuarioIngresado = this.authService.usuario;
    this.signup = false;
    this.registroUp = false;

    this.formRegistro = this.fb.group({
      'nombre':['', Validators.required],
      'apellido':['', Validators.required],
      'edad':['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni':['', [Validators.required, Validators.min(1000000)]],
      // 'perfil':['', Validators.required],
      'email':['', Validators.required],
      'password':['', [Validators.required, Validators.minLength(6)]],
      'imagen':['', Validators.required],      

      'imagen2':['', Validators.required],      
      'obraSocial':['', Validators.required],
      'especialidad':['', Validators.required],          
    });
  }

  ngOnInit(): void {
  }

  elegirPerfil(perfil: string){
    this.perfil = perfil;
  }

  registro(){
    console.log(this.formRegistro.getRawValue());

    const { email, password } = this.formRegistro.value;
    
    this.signup = true;
    
    setTimeout(() => {
      this.signup = false;
    }, 3000);

    this.auth.Registro(email, password);

    this.usuarioAlta.nombre = this.formRegistro.controls['nombre'].value;
    this.usuarioAlta.apellido = this.formRegistro.controls['apellido'].value;
    this.usuarioAlta.edad = this.formRegistro.controls['edad'].value;
    this.usuarioAlta.dni = this.formRegistro.controls['dni'].value;
    this.usuarioAlta.perfil = this.perfil;
    this.usuarioAlta.email = this.formRegistro.controls['email'].value;
    this.usuarioAlta.password = this.formRegistro.controls['password'].value;
    this.usuarioAlta.imagenPerfil = this.formRegistro.controls['imagen'].value;

    if(this.perfil=='paciente'){
      // let usuario: Usuario = {
      //   nombre: this.formRegistro.controls['nombre'].value,
      //   apellido: this.formRegistro.controls['apellido'].value,
      //   edad: this.formRegistro.controls['edad'].value,
      //   dni: this.formRegistro.controls['dni'].value,
      //   perfil: this.perfil,
      //   email: this.formRegistro.controls['email'].value,
      //   password: this.formRegistro.controls['password'].value,
      //   imagenPerfil: this.formRegistro.controls['imagen'].value,
      //   imagenPerfil2: this.formRegistro.controls['imagen2'].value,
      //   obraSocial: this.formRegistro.controls['obraSocial'].value,
      // }
      this.usuarioAlta.imagenPerfil2 = this.formRegistro.controls['imagen2'].value;
      this.usuarioAlta.obraSocial = this.formRegistro.controls['obraSocial'].value;
      
      // console.log(this.imagenPerfil);
      // this.usuarioService.agregarUsuario(usuario).finally(()=>{"exito"});
      this.usuarioService.agregarPaciente(this.imagenPerfil, this.imagenPerfil2, this.usuarioAlta);
      // this.email = this.password = '';

    } else {
      this.usuarioAlta.especialidad = this.formRegistro.controls['especialidad'].value;
      
      // console.log(this.imagenPerfil);
      // this.usuarioService.agregarUsuario(usuario).finally(()=>{"exito"});
      this.usuarioService.agregarEspecialista(this.imagenPerfil, this.usuarioAlta);
      // this.email = this.password = '';
    }
    this.router.navigate(['bienvenido']);
  }

  cargarImagen(event: any): void {
    this.imagenPerfil = event.target.files[0];
    console.log(this.imagenPerfil);
  }

  cargarImagen2(event: any): void {
    this.imagenPerfil2 = event.target.files[0];
    console.log(this.imagenPerfil2);
  }
}
