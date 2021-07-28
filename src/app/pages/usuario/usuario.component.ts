import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';
import { ExcelService } from 'src/app/services/excel.service';
import { Especialidad } from 'src/app/clases/especialidad';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  title = 'exportExcelInAngular';
  dataOfFootballers: any = [{
    playerName: 'Cristiano Ronaldo',
    playerCountry: 'Pourtgal',
    playerClub: 'Juventus'
  },
  {
    playerName: 'Lionel Messi',
    playerCountry: 'Argentina',
    playerClub: 'Barcelona'
  },
  {
    playerName: 'Neymar Junior',
    playerCountry: 'Brazil',
    playerClub: 'PSG'
  },
  {
  playerName: 'Tonni Kroos',
  playerCountry: 'Germany',
  playerClub: 'Real Madrid'
  },
  {
    playerName: 'Paul Pogba',
    playerCountry: 'France',
    playerClub: 'Manchester United'
  }];


  // email: string = '';
  // password: string = '';
  public signup: boolean;
  public registroUp: boolean;
  public condicion: boolean = false;
  public perfil: string = '';
  private imagenPerfil: any;
  
  private dbpath = '/usuarios';

  usuarioIngresado: any;
  
  public formAdmin: FormGroup;
  public listaUsuariosEspecialistas: Usuario[] = [];
  public listaUsuariosPacientes: Usuario[] = [];
  public listaUsuarios: Usuario[] = [];
  public listaEspecialidadesUsuario: Especialidad[] = [];
  public usuarioAlta: Usuario = new Usuario();
  usuarioActual: Usuario | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private excelService: ExcelService, private router: Router, public auth: AuthService) {
    // this.usuarioIngresado = this.authService.usuario;
    this.signup = false;
    this.registroUp = false;

    this.formAdmin = this.fb.group({
      'nombre':['', Validators.required],
      'apellido':['', Validators.required],
      'edad':['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'dni':['', [Validators.required, Validators.min(1000000)]],
      // 'perfil':['', Validators.required],
      'email':['', Validators.required],
      'password':['', [Validators.required, Validators.minLength(6)]],
      'imagen':['', Validators.required],      

      // 'imagen2':['', Validators.required],      
      // 'obraSocial':['', Validators.required],
      // 'especialidad':['', Validators.required],          
    });

    this.usuarioService.traerEspecialistas().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.listaUsuariosEspecialistas = usuarios;
    });

    this.usuarioService.traerTodos().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.listaUsuarios = usuarios;
    });

    this.usuarioService.traerPacientes().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.listaUsuariosPacientes = usuarios;
    });  }

  ngOnInit(): void {
  }

  elegirPerfil(perfil: string){
    this.perfil = perfil;
  }

  async registro(){
    console.log(this.formAdmin.getRawValue());

    const { email, password } = this.formAdmin.value;
    
    this.signup = true;
    
    setTimeout(() => {
      this.signup = false;
    }, 3000);


    this.auth.Registro(email, password).then(value => { 
      console.log(value?.user?.uid);
    // console.log(this.auth.usuario.uid);
    
      // try{  
        this.usuarioAlta.nombre = this.formAdmin.controls['nombre'].value;
        this.usuarioAlta.apellido = this.formAdmin.controls['apellido'].value;
        this.usuarioAlta.edad = this.formAdmin.controls['edad'].value;
        this.usuarioAlta.dni = this.formAdmin.controls['dni'].value;
        this.usuarioAlta.perfil = "administrador";// this.perfil;
        this.usuarioAlta.email = this.formAdmin.controls['email'].value;
        this.usuarioAlta.password = this.formAdmin.controls['password'].value;
        this.usuarioAlta.imagenPerfil = this.formAdmin.controls['imagen'].value;
        // this.usuarioAlta.uid = this.auth.usuario.uid;
        this.usuarioAlta.uid = value?.user?.uid;
        this.usuarioAlta.cuentaAprobada = true;
    
          // console.log(this.imagenPerfil);
        this.usuarioService.agregarEspecialista(this.imagenPerfil, this.usuarioAlta);
          // this.email = this.password = '';
        // this.router.navigate(['verificacion-email']);
        // this.router.navigate(['bienvenido']);
        Swal.fire({
          title: 'Alta exitosa de administrador'
        });
      // }
      // catch(error){
      //   Swal.fire({
      //     title: error.code,
      //     text: error.message
      //   });
      // }
 
    });
  }

  cargarImagen(event: any): void {
    this.imagenPerfil = event.target.files[0];
    console.log(this.imagenPerfil);
  }

  async aprobarUsuario(usuario: Usuario, aprobar: boolean){
    usuario.cuentaAprobada = aprobar;
    console.log(aprobar);
    var documentoUsuario = await this.usuarioService.obtenerDocumentoUsuario(usuario);
    console.log(documentoUsuario);
    if (documentoUsuario != null) {
        this.usuarioService.actualizarCuentaAprobada(documentoUsuario, usuario.cuentaAprobada);
    }
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dataOfFootballers, 'footballer_data');
  }

  exportAsXLSXEspecialistas():void {
    // this.excelService.exportAsExcelFile(this.listaUsuariosEspecialistas, 'especialistas_data');
    this.excelService.exportAsExcelFile(this.listaUsuarios, 'usuarios_data');
  }

  historiaClinica(usuario: Usuario){
    this.usuarioActual = usuario;
  }
}
