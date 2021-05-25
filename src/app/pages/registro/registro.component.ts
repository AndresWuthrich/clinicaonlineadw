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

  // public aceptar(): void {
  //   console.log(this.formGroup.getRawValue());
  // }
  // Registro(){
  //   this.signup = true;

  //   setTimeout(() => {
  //     this.signup = false;
  //   }, 3000);

  //   this.auth.Registro(this.email, this.password);
  //   this.email = this.password = '';
  // }

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

    // var nombre = this.formRegistro.controls['nombre'].value;
    // var apellido = this.formRegistro.controls['apellido'].value;
    // var edad = this.formRegistro.controls['edad'].value;
    // var dni = this.formRegistro.controls['dni'].value;
    // // var perfil = this.formRegistro.controls['perfil'].value;
    // var email2 = this.formRegistro.controls['email'].value;
    // var password2 = this.formRegistro.controls['password'].value;
    // var imagen = this.formRegistro.controls['imagen'].value;
    // var imagen2 = this.formRegistro.controls['imagen2'].value;
    // var obraSocial = this.formRegistro.controls['obraSocial'].value;
    // var especialidad = this.formRegistro.controls['especialidad'].value;

    // this.auth.Registro(this.email, this.password);
    this.auth.Registro(email, password);

    if(this.perfil=='paciente'){
      let usuario: Usuario = {
        nombre: this.formRegistro.controls['nombre'].value,
        apellido: this.formRegistro.controls['apellido'].value,
        edad: this.formRegistro.controls['edad'].value,
        dni: this.formRegistro.controls['dni'].value,
        perfil: this.perfil,
        email: this.formRegistro.controls['email'].value,
        password: this.formRegistro.controls['password'].value,
        imagenPerfil: this.formRegistro.controls['imagen'].value,
        imagenPerfil2: this.formRegistro.controls['imagen2'].value,
        obraSocial: this.formRegistro.controls['obraSocial'].value,
      }

      this.imagenPerfil = this.formRegistro.controls['imagen'].value;
      // this.usuarioService.agregarUsuario(nombre, apellido, edad, dni, this.perfil, email2, password2, imagen, imagen2, obraSocial, especialidad)
      // this.usuarioService.agregarUsuario(usuario).finally(()=>{"exito"});
      // this.email = this.password = '';
    } else {
      let usuario: Usuario = {
        nombre: this.formRegistro.controls['nombre'].value,
        apellido: this.formRegistro.controls['apellido'].value,
        edad: this.formRegistro.controls['edad'].value,
        dni: this.formRegistro.controls['dni'].value,
        perfil: this.perfil,
        email: this.formRegistro.controls['email'].value,
        password: this.formRegistro.controls['password'].value,
        imagenPerfil: this.formRegistro.controls['imagen'].value,
        especialidad: this.formRegistro.controls['especialidad'].value,
      }
      this.imagenPerfil = this.formRegistro.controls['imagen'].value;

      console.log(this.imagenPerfil);
      // this.usuarioService.agregarUsuario(usuario).finally(()=>{"exito"});
      this.usuarioService.agregarEspecialista(this.imagenPerfil, usuario);
      // this.email = this.password = '';
    }
    this.router.navigate(['bienvenido']);
  }
}
