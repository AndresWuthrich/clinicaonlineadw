import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiasAtencion } from 'src/app/clases/dias-atencion';
import { Especialidad } from 'src/app/clases/especialidad';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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
  public deshabilitaCaptcha: boolean = true;

  public usuarioAlta: Usuario = new Usuario();
  public especialidadAlta: Especialidad = new Especialidad();
  public listaEspecialidades: Especialidad[] = [];
  public banderaEspecialidadSeleccionada = true;
  public listaEspecialidadesSeleccionadas: Array<Especialidad> = new Array<Especialidad>();
  public descripcionEspecialidad: string = '';
  public listaDiasSeleccionadas: Array<DiasAtencion> = new Array<DiasAtencion>();  

  private dbpath = '/usuarios';

  usuarioIngresado: any;
  
  public formRegistro: FormGroup;
  public captcha: any;
  public captchaFlag: boolean = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private especialidadService: EspecialidadService, private router: Router, public auth: AuthService) {
    // this.usuarioIngresado = this.authService.usuario;
    this.signup = false;
    this.registroUp = false;

        console.log('constructor:',this.perfil);
    
      this.formRegistro = this.fb.group({
        'nombre':['', Validators.required],
        'apellido':['', Validators.required],
        'edad':['', [Validators.required, Validators.min(18), Validators.max(99)]],
        'dni':['', [Validators.required, Validators.min(1000000)]],
        // 'perfil':['', Validators.required],
        'email':['', Validators.required],
        'password':['', [Validators.required, Validators.minLength(6)]],
        'imagen':['', Validators.required] 
  
      }); 
  
    this.especialidadService.traerTodas().subscribe((especialidades: Especialidad[]) => {
      console.log(especialidades);
      this.listaEspecialidades = especialidades;
    });
  }

  ngOnInit(): void {
    this.agregarDias();
    console.log(this.formRegistro);
  }

  resolved2(captchaResponse: any) {
    console.log(`Resolved response token: ${captchaResponse}`);
    this.captcha = captchaResponse;
    //res.getResponse(captchaResponse);
    this.captchaFlag = true;
    this.signup = true;

  }
  resolved(captchaResponse: any, res: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    this.captcha = captchaResponse;
    //res.getResponse(captchaResponse);
    this.captchaFlag = true;
    this.signup = true;
  }
  deshabilitarCaptcha(){
    // this.captchaResuelto=true;
    // this.captchaResuelto2=true;
    this.deshabilitaCaptcha = false;
    console.log(this.formRegistro);
    this.signup = true;
  }
  agregarDias() {

    this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'LUNES', 8, 19));
    this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'MARTES', 8, 19));
    this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'MIERCOLES', 8, 19));
    this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'JUEVES', 8, 19));
    this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'VIERNES', 8, 19));
    this.listaDiasSeleccionadas.push(new DiasAtencion(true, 'SABADO', 8, 14));

  }

  elegirPerfil(perfil: string){
    this.perfil = perfil;
    console.log(this.perfil);

    console.log('constructor:',this.perfil);
    if(this.perfil == 'paciente'){
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
        'obra':['', Validators.required]
      }); 
    } else{
      this.formRegistro = this.fb.group({
        'nombre':['', Validators.required],
        'apellido':['', Validators.required],
        'edad':['', [Validators.required, Validators.min(18), Validators.max(99)]],
        'dni':['', [Validators.required, Validators.min(1000000)]],
        // 'perfil':['', Validators.required],
        'email':['', Validators.required],
        'password':['', [Validators.required, Validators.minLength(6)]],
        'imagen':['', Validators.required],  
        'especialidad':['', Validators.required]          
      });
    }

  }

  async registro(){
    console.log(this.formRegistro.getRawValue());

    const { email, password } = this.formRegistro.value;
    
    console.log('desa',this.deshabilitaCaptcha);
    console.log('cap',this.captcha);
    console.log('signup',this.signup);

    // var swal=0;
    // while(this.deshabilitaCaptcha == true && this.captchaFlag == false){
    // if(this.deshabilitaCaptcha == true && this.captchaFlag == false){
    //   swal++;
    //   console.log('swal', swal);
    //   Swal.fire({
    //     title: 'Complete captcha'
    //   });  
    // }
    

    // this.signup = true;
    
    setTimeout(() => {
      this.signup = false;
    }, 3000);

    this.auth.Registro(email, password).then(value => { 
      console.log(value?.user?.uid);

      this.usuarioAlta.nombre = this.formRegistro.controls['nombre'].value;
      this.usuarioAlta.apellido = this.formRegistro.controls['apellido'].value;
      this.usuarioAlta.edad = this.formRegistro.controls['edad'].value;
      this.usuarioAlta.dni = this.formRegistro.controls['dni'].value;
      this.usuarioAlta.perfil = this.perfil;
      this.usuarioAlta.email = this.formRegistro.controls['email'].value;
      this.usuarioAlta.password = this.formRegistro.controls['password'].value;
      this.usuarioAlta.imagenPerfil = this.formRegistro.controls['imagen'].value;
      // this.usuarioAlta.uid = this.auth.usuario.uid;
      this.usuarioAlta.uid = value?.user?.uid;
 
      if(this.perfil=='paciente'){
        this.usuarioAlta.imagenPerfil2 = this.formRegistro.controls['imagen2'].value;
        this.usuarioAlta.obraSocial = this.formRegistro.controls['obra'].value;
        this.usuarioAlta.cuentaAprobada = true;
        
        console.log(this.imagenPerfil);
        console.log(this.imagenPerfil2);
        this.usuarioService.agregarPaciente(this.imagenPerfil, this.imagenPerfil2, this.usuarioAlta);
        // this.email = this.password = '';
  
      } else {
        // this.usuarioAlta.especialidad = this.formRegistro.controls['especialidad'].value;
        this.usuarioAlta.especialidad = this.listaEspecialidadesSeleccionadas;

        this.usuarioAlta.horarioAtencion = this.listaDiasSeleccionadas;

        // console.log(this.imagenPerfil);
        this.usuarioService.agregarEspecialista(this.imagenPerfil, this.usuarioAlta);
        // this.email = this.password = '';
      }
      this.router.navigate(['verificacion-email']);
      // this.router.navigate(['bienvenido']);
      });
    // console.log(this.auth.usuario.uid);
  }

  cargarImagen(event: any): void {
    this.imagenPerfil = event.target.files[0];
    console.log(this.imagenPerfil);
  }

  cargarImagen2(event: any): void {
    this.imagenPerfil2 = event.target.files[0];
    console.log(this.imagenPerfil2);
  }

  agregarEspecialidad(especialidad: Especialidad){
    this.banderaEspecialidadSeleccionada = false;
    if(this.listaEspecialidadesSeleccionadas.includes(especialidad)){

    } else{
      this.listaEspecialidadesSeleccionadas.push(especialidad);
      this.formRegistro.controls['especialidad'].setValue(this.listaEspecialidadesSeleccionadas);
    }
  }

  agregarNuevaEspecialidad(){
    console.log();
    if(this.descripcionEspecialidad != ''){
      this.especialidadAlta.descripcion = this.descripcionEspecialidad;

      this.especialidadService.agregarEspecialidad(this.especialidadAlta);
    }
  }
}
