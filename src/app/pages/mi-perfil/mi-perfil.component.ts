import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioComponent } from '../usuario/usuario.component';
import { Columns, Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { transition, trigger } from '@angular/animations';
import { heartBeatAnimation, heartBeatOnEnterAnimation } from 'angular-animations';
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
  animations: [ 
    heartBeatOnEnterAnimation()
    ]
})
export class MiPerfilComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;
  listaEspecialidades:string = '';
  horariosProfesional:any = '';
  public listaTurnos: Turno[] = [];
  public listaHCPacienteSel: Turno[] = [];

  constructor(public auth: AuthService, private usuarioService: UsuarioService, private turnoService: TurnoService) {
   }

  async ngOnInit() {
    var usuarioActual = await this.auth.obtenerUsuarioActual();

    console.log('ACTUAL' +usuarioActual?.email);

    if(usuarioActual?.email != null){
      // this.listaHCPacienteSel = [];

      var datosUsuario: any = await this.usuarioService.obtenerUsuarioPorEmail(usuarioActual?.email);
      console.log('DATO USER' + datosUsuario);
      this.usuarioLogueado = datosUsuario;

      this.turnoService.traerTurnosPacientePorUid(datosUsuario.uid).subscribe(data => {
        this.listaTurnos = data;
      });
      console.log('lt', this.listaTurnos);

      this.listaTurnos.forEach(turno => {
        // if(turno.estado == 'Finalizado' && turno.historiaClinica?.altura != ''){
          this.listaHCPacienteSel.push(turno);          
        // }                  
      });
      console.log('hc', this.listaHCPacienteSel);
    }
    // console.log('data' + this.usuarioLogueado?.horarioAtencion);


    // if(this.usuarioLogueado?.perfil == 'especialista'){
    //   this.usuarioLogueado?.especialidad?.forEach(e => {
    //   });

      // this.horariosProfesional = this.usuarioLogueado?.horarioAtencion?[0];
      // if(this.usuarioLogueado != undefined && this.usuarioLogueado?.horarioAtencion[0].lunes.estado)
  //     if(this.horariosProfesional.lunes.estado){
  //       this.horariosProfesional.lunes.inicio = (this.horariosProfesional.lunes.inicio/100).toString() + ':' + '00';
  //       this.horariosProfesional.lunes.fin = (this.horariosProfesional.lunes.fin/100).toString() + ':' + '00';
  //     }
  //     if(this.horariosProfesional.martes.estado){
  //       this.horariosProfesional.martes.inicio = (this.horariosProfesional.martes.inicio/100).toString() + ':' + '00';
  //       this.horariosProfesional.martes.fin = (this.horariosProfesional.martes.fin/100).toString() + ':' + '00';
  //     }
  //     if(this.horariosProfesional.miercoles.estado){
  //       this.horariosProfesional.miercoles.inicio = (this.horariosProfesional.miercoles.inicio/100).toString() + ':' + '00';
  //       this.horariosProfesional.miercoles.fin = (this.horariosProfesional.miercoles.fin/100).toString() + ':' + '00';
  //     }
  //     if(this.horariosProfesional.jueves.estado){
  //       this.horariosProfesional.jueves.inicio = (this.horariosProfesional.jueves.inicio/100).toString() + ':' + '00';
  //       this.horariosProfesional.jueves.fin = (this.horariosProfesional.jueves.fin/100).toString() + ':' + '00';
  //     }
  //     if(this.horariosProfesional.viernes.estado){
  //       this.horariosProfesional.viernes.inicio = (this.horariosProfesional.viernes.inicio/100).toString() + ':' + '00';
  //       this.horariosProfesional.viernes.fin = (this.horariosProfesional.viernes.fin/100).toString() + ':' + '00';
  //     }
  //     if(this.horariosProfesional.sabado.estado){
  //       this.horariosProfesional.sabado.inicio = (this.horariosProfesional.sabado.inicio/100).toString() + ':' + '00';
  //       this.horariosProfesional.sabado.fin = (this.horariosProfesional.sabado.fin/100).toString() + ':' + '00';
  //     }
  //   }

  }

  async generatePDF(){
    const pdf = new PdfMakeWrapper();

    pdf.info({
      title: 'Historia clínica',
      author: 'pdfmake-wrapper',
      subject: 'Historia clínica',
     });

    var dia = new Date().toDateString();
    var fecha = new Date().toTimeString();

    // Header
    pdf.header(dia + ' ' + fecha);

    // pdf.watermark('Simple watermark');
    // pdf.add( await new Img('src/../../assets/imagenes/AJW.jpg').alignment('right').build());
    pdf.add( await new Img('src/../../assets/imagenes/logo.png').alignment('right').height(50).width(50).build());

    pdf.add(      
      new Txt('Historia Clínica').bold().alignment('center').fontSize(25).end
    );

    // Detalle
    pdf.add(      
      new Txt('Paciente: ' + this.usuarioLogueado?.apellido + ' ' + this.usuarioLogueado?.nombre).end
    );
    pdf.add(
      new Columns(['DNI: '+ this.usuarioLogueado?.dni, ' Edad: '+ this.usuarioLogueado?.edad]).end
    )
    // pdf.add(      
    //   new Txt('DNI: ' + this.usuarioLogueado?.dni + ' Edad: ' + this.usuarioLogueado?.edad).end
    // );
    pdf.add(      
      new Txt(' ').end
    );

    // pdf.add( await new Img('' + this.usuarioLogueado?.imagenPerfil).alignment('right').build());

    this.listaTurnos.forEach(turno => {
      pdf.add(      
        new Txt('Día turno: ' + turno.diaTurno).end
      );
      pdf.add(      
        new Txt('Especialidad: ' + turno.especialidad?.descripcion).end
      );
      // pdf.add(      
      //   new Columns(['Día turno: ' + turno.diaTurno, 'Especialidad: ' + turno.especialidad?.descripcion]).end
      // );
      // if(turno.historiaClinica?.altura != ''){
      //   pdf.add(      
      //     new Txt('Altura: ' + turno.historiaClinica?.altura).end
      //   );
      // }
      // if(turno.historiaClinica?.peso != ''){
      //   pdf.add(      
      //     new Txt('Peso: ' + turno.historiaClinica?.peso).end
      //   );
      // }
      // if(turno.historiaClinica?.temperatura != ''){
      //   pdf.add(      
      //     new Txt('Temperatura: ' + turno.historiaClinica?.temperatura).end
      //   );
      // }
      // if(turno.historiaClinica?.presion != ''){
      //   pdf.add(      
      //     new Txt('Presión: ' + turno.historiaClinica?.presion).end
      //   );
      // }

      if(turno.historiaClinica?.altura != ''){
        pdf.add(      
          new Columns(['Altura: ' + turno.historiaClinica?.altura, 'Peso: ' + turno.historiaClinica?.peso, 
          'Temperatura: ' + turno.historiaClinica?.temperatura, 'Presión: ' + turno.historiaClinica?.presion]).end
        );
      }

      if(turno.historiaClinica?.valor1 != ''){
        pdf.add(      
          new Txt(turno.historiaClinica?.clave1 + ': ' + turno.historiaClinica?.valor1).end
        );
      }
      if(turno.historiaClinica?.valor2 != ''){
        pdf.add(      
          new Txt(turno.historiaClinica?.clave2 + ': ' + turno.historiaClinica?.valor2).end
        );
      }
      if(turno.historiaClinica?.valor3 != ''){
        pdf.add(      
          new Txt(turno.historiaClinica?.clave3 + ': ' + turno.historiaClinica?.valor3).end
        );
      }
      if(turno.historiaClinica?.valor4 != ''){
        pdf.add(      
          new Txt(turno.historiaClinica?.clave4 + ': ' + turno.historiaClinica?.valor4).end
        );
      }
      if(turno.historiaClinica?.valor5 != ''){
        pdf.add(      
          new Txt(turno.historiaClinica?.clave5 + ': ' + turno.historiaClinica?.valor5).end
        );
      }
      pdf.add(      
        new Txt(' ').end
      );
      
    });

    // pdf.add(      
    //   new Txt('Altura: ' + this.usuarioLogueado?.historiaClinica.altura).end
    // );
    // pdf.add(      
    //   new Txt('Peso: ' + this.usuarioLogueado?.historiaClinica.peso).end
    // );
    // pdf.add(      
    //   new Txt('Temperatura: ' + this.usuarioLogueado?.historiaClinica.temperatura).end
    // );
    // pdf.add(      
    //   new Txt('Presión: ' + this.usuarioLogueado?.historiaClinica.presion).end
    // );
    // if(this.usuarioLogueado?.historiaClinica.valor1 != ''){
    //   pdf.add(      
    //     new Txt(this.usuarioLogueado?.historiaClinica.clave1 + ': ' + this.usuarioLogueado?.historiaClinica.valor1).end
    //   );
    // }
    // if(this.usuarioLogueado?.historiaClinica.valor2 != ''){
    //   pdf.add(      
    //     new Txt(this.usuarioLogueado?.historiaClinica.clave2 + ': ' + this.usuarioLogueado?.historiaClinica.valor2).end
    //   );
    // }
    // if(this.usuarioLogueado?.historiaClinica.valor3 != ''){
    //   pdf.add(      
    //     new Txt(this.usuarioLogueado?.historiaClinica.clave3 + ': ' + this.usuarioLogueado?.historiaClinica.valor3).end
    //   );
    // }
    // if(this.usuarioLogueado?.historiaClinica.valor4 != ''){
    //   pdf.add(      
    //     new Txt(this.usuarioLogueado?.historiaClinica.clave4 + ': ' + this.usuarioLogueado?.historiaClinica.valor4).end
    //   );
    // }
    // if(this.usuarioLogueado?.historiaClinica.valor5 != ''){
    //   pdf.add(      
    //     new Txt(this.usuarioLogueado?.historiaClinica.clave5 + ': ' + this.usuarioLogueado?.historiaClinica.valor5).end
    //   );
    // }

    
// pdf.add(
//   new Columns(['Altura: ', 'Peso: ', 'Temperatura: ']).end
// )
// pdf.add(
//   new Columns([this.usuarioLogueado?.historiaClinica.altura, this.usuarioLogueado?.historiaClinica.peso, this.usuarioLogueado?.historiaClinica.temperatura]).end
// )


      
    pdf.create().open();
    pdf.create().download();
  }
  // async guardar() {
  //   console.log(this.usuarioLogueado);
  //   if (this.usuarioLogueado != null) {
  //     var uidUser = await this.usuarioService.obtenerDocumentoUsuario(this.usuarioLogueado);
  //     if (uidUser != null) {
  //       this.usuarioService.actualizarDiasAtencion(uidUser, this.usuarioLogueado);
  //     }
  //   }
  // }
}
