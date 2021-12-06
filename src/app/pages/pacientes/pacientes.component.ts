import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Especialidad } from 'src/app/clases/especialidad';
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/clases/turno';
import { Columns, Img, PdfMakeWrapper, Txt } from 'pdfmake-wrapper';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public usuarioLogueado: Usuario | null = null;
  public listadoTurnos: Turno[] = [];

  // email: string = '';
  // password: string = '';
  public signup: boolean;
  public registroUp: boolean;
  public condicion: boolean = false;
  public perfil: string = '';
  public dia: any;

  usuarioIngresado: any;
  
  public listaUsuariosEspecialistas: Usuario[] = [];
  public listaUsuariosPacientes: Usuario[] = [];
  public listaUsuariosPacientesSel: Usuario[] = [];
  public listaUsuarios: Usuario[] = [];
  public listaEspecialidadesUsuario: Especialidad[] = [];
  public listaHCPacienteSel: Turno[] = [];
  public usuarioAlta: Usuario = new Usuario();
  usuarioActual: Usuario | null = null;

  constructor(private usuarioService: UsuarioService, public auth: AuthService, private turnoService: TurnoService) {
    // this.usuarioIngresado = this.authService.usuario;
    this.signup = false;
    this.registroUp = false;

    this.usuarioService.traerPacientes().subscribe((usuarios: Usuario[]) => {
      console.log('u+',usuarios);
      this.listaUsuariosPacientes = usuarios;
      console.log('u++',this.listaUsuariosPacientes);
    });  
  }

  async ngOnInit() {
    
    var user = await this.auth.usuario;
    console.log('u', user);

    // var user = await this.auth.getCurrentUser();
    if (user?.email != null && user) {
      console.log(user.email);
      var dataUser: any = await this.usuarioService.obtenerUsuarioPorEmail(user.email);
      console.log('d', dataUser);
      this.usuarioLogueado = dataUser;

      this.turnoService.traerTurnosEspecialistaPorUid(dataUser.uid).subscribe(data => {
        this.listadoTurnos = data;
      });
      console.log('l', this.listadoTurnos);

      this.listaUsuariosPacientes.forEach(element => {
        this.listadoTurnos.forEach(turno => {
          if(element.uid == turno.paciente?.uid){
            this.listaUsuariosPacientesSel.push(element);
          }          
        });        
      });
    }
  
    this.dia = new Date().toDateString();
  }

  elegirPerfil(perfil: string){
    this.perfil = perfil;
  }

  historiaClinica(usuario: Usuario){
    this.usuarioActual = usuario;
    this.listaHCPacienteSel = [];

    this.listadoTurnos.forEach(turno => {
      if(this.usuarioActual?.uid == turno.paciente?.uid && turno.estado == 'Finalizado' && turno.historiaClinica?.altura != ''){
        this.listaHCPacienteSel.push(turno);
      }          
    });              

    console.log('1+', this.listaHCPacienteSel);
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

    this.listaHCPacienteSel.forEach(turno => {
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

}
