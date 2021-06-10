import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { DiasAtencion } from 'src/app/clases/dias-atencion';
import { DiaService } from 'src/app/services/dia.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css']
})
export class MisHorariosComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;
  public diaAlta: DiasAtencion = new DiasAtencion(true,'lunes',8,19);

  sDia: string = 'LUNES';
  profesion: string = '';
  fin: string = '1900';
  inicio: string = '800';
  listaEspecialidades: any = [];
  listaDiasAtencion: Array<DiasAtencion> = new Array<DiasAtencion>(); 
  habDes: string = 'Deshabilitar';
  checked: boolean = true;

  objAux: any = null;

  public listaUsuarios: any = [];
  usuarioAux:any;


  constructor(private router: Router, public auth: AuthService, private usuarioService: UsuarioService, private diaService: DiaService) {}

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
        this.listaEspecialidades === '' ? this.listaEspecialidades = e : this.listaEspecialidades += ', ' + e;
      });

    if (this.usuarioLogueado != undefined) {
      this.usuarioLogueado?.especialidad?.forEach((element) => {
        // this.listaEspecialidades.push(element);
        console.log(element);
      });
      // this.profesion = this.listaEspecialidades[0];
      // this.profesion = this.listaEspecialidades;
    }


    this.usuarioService.traerTodos().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.listaUsuarios = usuarios;
    });

    // this.listaUsuarios = this.context.list('usuarios').valueChanges();
    // this.listaUsuarios.subscribe(
    //   (response) => {
    //     //GUARDO TODOS LOS PACIENTES
    //     this.usuarioAux = response.filter(
    //       (p) => p.id == this.firebase.userData$.id
    //     );
    //   },
    //   (error) => {
    //     console.log(error);
       }
    // );
  }

  habilitarDeshabilitar() {
    !this.checked
      ? (this.habDes = 'Deshabilitar')
      : (this.habDes = 'Habilitar');
  }

  SetHorario(cond: boolean) {

    if (cond) {
      // let auxHora: any = {
      //   estado: this.checked,
      //   inicio: parseInt(this.inicio),
      //   fin: parseInt(this.fin),
      //   literal: this.sDia.toUpperCase(),
      //   profesion: this.profesion.toUpperCase(),
      // };

      // if (
      //   auxHora.inicio < auxHora.fin &&
      //   auxHora.literal != '' &&
      //   auxHora.profesion != '' &&
      //   auxHora.literal != undefined &&
      //   auxHora.profesion != undefined
      // ) {
      //   switch (auxHora.literal) {
      //     case 'Lunes': 
      //       this.usuarioAux[0].atiende[0].lunes = auxHora;
      //       console.log()
      //       break;
      //     case 'MARTES':
      //       this.usuarioAux[0].atiende[0].martes = auxHora;
      //       break;
      //     case 'MIERCOLES':
      //       this.usuarioAux[0].atiende[0].miercoles = auxHora;
      //       break;
      //     case 'JUEVES':
      //       this.usuarioAux[0].atiende[0].jueves = auxHora;
      //       break;
      //     case 'VIERNES':
      //       this.usuarioAux[0].atiende[0].viernes = auxHora;
      //       break;
      //     case 'SABADO':
      //       this.usuarioAux[0].atiende[0].sabado = auxHora;
      //       break;
        // }
        if(this.usuarioLogueado != null){

          // this.diaAlta.estado = true;
          // this.diaAlta.inicio = parseInt(this.inicio);
          // this.diaAlta.fin = parseInt(this.fin);
          // // this.diaAlta.literal = this.sDia.toUpperCase();
          // this.diaAlta.literal = this.sDia;
          // // this.diaService.agregarDia(this.diaAlta);
          // console.log(this.diaAlta);

          // this.listaDiasAtencion.push(this.diaAlta);
          // this.usuarioLogueado.horarioAtencion = this.listaDiasAtencion;

          // this.usuarioService.actualizarDiasAtencion(this.usuarioLogueado);
          console.log(this.usuarioLogueado);
        }
    //   }else{
    //     console.log('error')
    //   }
    // } else {
    //   this.router.navigate(['profesional/mi-perfil']);
    }
  }
}
