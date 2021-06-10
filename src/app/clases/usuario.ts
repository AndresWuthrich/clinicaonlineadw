import { DiasAtencion } from "./dias-atencion";
import { Especialidad } from "./especialidad";

export class Usuario {
    nombre: string = '';
    apellido: string = '';
    edad: number = 0;
    dni: number = 0;
    perfil: string = '';
    email: string = '';
    password: string = '';
    imagenPerfil?: string;
    imagenPerfil2?: string;
    uid?: string = '';
    obraSocial?: string = '';
    // especialidad?: string = '';
    especialidad?: Array<Especialidad>;
    cuentaAprobada?: boolean = false;

    horarioAtencion?: Array<DiasAtencion>;

    // horarioAtencion?: any[];

    // constructor() {
    //   this.perfil = 'especialista';
    //   this.especialidad = [];
    //   this.horarioAtencion = [
    //     {
    //       lunes: {
    //         estado: true,
    //         inicio: 800,
    //         fin: 1900,
    //         literal: 'Lunes',
    //         profesion: ''
    //       },
    //       martes: {
    //         estado: true,
    //         inicio: 800,
    //         fin: 1900,
    //         literal: 'Martes',
    //         profesion: ''
    //       },
    //       miercoles: {
    //         estado: true,
    //         inicio: 800,
    //         fin: 1900,
    //         literal: 'Miercoles',
    //         profesion: ''
    //       },
    //       jueves: {
    //         estado: true,
    //         inicio: 800,
    //         fin: 1900,
    //         literal: 'Jueves',
    //         profesion: ''
    //       },
    //       viernes: {
    //         estado: true,
    //         inicio: 800,
    //         fin: 1900,
    //         literal: 'Viernes',
    //         profesion: ''
    //       },
    //       sabado: {
    //         estado: true,
    //         inicio: 800,
    //         fin: 1400,
    //         literal: 'Sabado',
    //         profesion: ''
    //       },
    //     },
    //   ];
    // }
  
}
